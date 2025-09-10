import Link from "next/link";
import { db } from "@/db";
import { notFound } from "next/navigation";
import * as actions from "@/actions/index";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });
  if (!snippet) {
    return notFound();
  }
  const deleteSnippetAction = actions.deleteSnippet.bind(null, parseInt(id));

  // console.log(props);
  // console.log(props.params);
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex w-xl m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button type="submit" className="p-2 border rounded cursor-pointer">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 m-4 w-xl border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
