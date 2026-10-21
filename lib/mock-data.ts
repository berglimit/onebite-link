export type Folder = { id: number; name: string };
export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  folderId: number;
};

export const folders: Folder[] = [
  { id: 1, name: "개발" },
  { id: 2, name: "디자인" },
  { id: 3, name: "읽을거리" },
];

export const links: LinkItem[] = [
  { id: 1, title: "Next.js 문서", url: "https://nextjs.org/docs", description: "Next.js 공식 문서", folderId: 1 },
  { id: 2, title: "React 공식 문서", url: "https://react.dev", description: "React 학습과 레퍼런스", folderId: 1 },
  { id: 3, title: "Tailwind CSS", url: "https://tailwindcss.com", description: "유틸리티 기반 CSS 프레임워크", folderId: 2 },
  { id: 4, title: "Figma", url: "https://figma.com", description: "협업 디자인 도구", folderId: 2 },
  { id: 5, title: "MDN Web Docs", url: "https://developer.mozilla.org", description: "웹 기술 레퍼런스", folderId: 3 },
  { id: 6, title: "web.dev", url: "https://web.dev", description: "웹 성능과 모범 사례", folderId: 3 },
];
