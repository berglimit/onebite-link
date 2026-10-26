import { type NextRequest } from "next/server";

const MAX_HTML_BYTES = 1024 * 1024;
const FETCH_TIMEOUT_MS = 8000;

function isBlockedHost(hostname: string) {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host === "[::1]" || host.startsWith("[fc") || host.startsWith("[fd") || host.startsWith("[fe80")) return true;
  const m = host.match(/^(\d+)\.(\d+)\.\d+\.\d+$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .trim();
}

function getAttr(tag: string, name: string) {
  const m = tag.match(new RegExp(`${name}\s*=\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return m ? (m[1] ?? m[2]) : undefined;
}

function parseMeta(html: string) {
  const meta = new Map<string, string>();
  for (const tag of html.match(/<meta\s[^>]*>/gi) ?? []) {
    const key = (getAttr(tag, "property") ?? getAttr(tag, "name"))?.toLowerCase();
    const content = getAttr(tag, "content");
    if (key && content && !meta.has(key)) meta.set(key, decodeEntities(content));
  }
  return meta;
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url");
  let target: URL;
  try {
    target = new URL(raw ?? "");
  } catch {
    return Response.json({ error: "올바른 URL이 아닙니다." }, { status: 400 });
  }
  if (!["http:", "https:"].includes(target.protocol) || isBlockedHost(target.hostname)) {
    return Response.json({ error: "허용되지 않는 URL입니다." }, { status: 400 });
  }

  let html = "";
  let finalUrl = target;
  try {
    const res = await fetch(target, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)", accept: "text/html" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      return Response.json({ error: "페이지를 불러오지 못했습니다." }, { status: 502 });
    }
    if (res.url) finalUrl = new URL(res.url);
    if (isBlockedHost(finalUrl.hostname)) {
      return Response.json({ error: "허용되지 않는 URL입니다." }, { status: 400 });
    }
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let received = 0;
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      html += decoder.decode(value, { stream: true });
      if (received >= MAX_HTML_BYTES || /<\/head>/i.test(html)) {
        await reader.cancel();
        break;
      }
    }
  } catch {
    return Response.json({ error: "페이지를 불러오지 못했습니다." }, { status: 502 });
  }

  const meta = parseMeta(html);
  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const title =
    meta.get("og:title") ?? meta.get("twitter:title") ?? (titleTag ? decodeEntities(titleTag) : "") ?? "";
  const description =
    meta.get("og:description") ?? meta.get("twitter:description") ?? meta.get("description") ?? "";
  const image = meta.get("og:image") ?? meta.get("twitter:image");

  let thumbnail = "";
  if (image) {
    try {
      thumbnail = new URL(image, finalUrl).toString();
    } catch {}
  }

  return Response.json({
    title: title || target.hostname,
    description,
    thumbnail,
    url: target.toString(),
  });
}
