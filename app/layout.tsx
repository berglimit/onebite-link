import type { Metadata } from "next";
import "./globals.css";
import FolderProvider from "@/components/FolderProvider";
import LinkProvider from "@/components/LinkProvider";
import { folders, links } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "링크를 폴더별로 모아두는 곳",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FolderProvider initialFolders={folders}>
          <LinkProvider initialLinks={links}>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
