import type { LinkItem } from "@/lib/mock-data";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-3 rounded-2xl bg-[var(--surface)] p-5"
    >
      {link.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element -- 외부 도메인이 임의라 next/image 대신 사용
        <img
          src={link.thumbnail}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="aspect-[1.91/1] w-full rounded-xl bg-[var(--accent-soft)] object-cover"
        />
      )}
      <h3 className="text-lg font-bold leading-snug text-[var(--text)]">
        {link.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--text-sub)]">
        {link.description}
      </p>
      <span className="w-fit max-w-full truncate rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 text-sm text-[var(--accent)]">
        {link.url}
      </span>
    </a>
  );
}
