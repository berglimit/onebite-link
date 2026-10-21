import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const folder = folders.find((f) => String(f.id) === id);
  if (!folder) notFound();

  const folderLinks = links.filter((link) => link.folderId === folder.id);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 p-6">
          <LinkGrid links={folderLinks} />
        </main>
      </div>
    </div>
  );
}
