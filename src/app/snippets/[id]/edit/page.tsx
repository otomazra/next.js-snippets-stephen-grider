import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditPage from "@/components/snippet-edit-forms";

interface ShowEditSnippetProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShowSnippetEdit(props: ShowEditSnippetProps) {
  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });
  if(!snippet) notFound();

  return (
  <div>
    <div>A snippet with the id: {snippet.id}</div>
        <SnippetEditPage snippet={snippet} />
      </div>
    
  );
}
