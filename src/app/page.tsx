import { db } from "@/db";

import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippet = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className=" mx-2 flex justify-between items-center p-2 border border-gray-300 rounded"
      >
        <div className="rounded p-2 text-xl">{snippet.title}</div>
        <div className="bg-gray-200 rounded p-2 text-xl">view</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 mx-6 justify-between items-center">
        <h1 className="text-2xl font-bold ">Snippets</h1>
        <Link
          href={"/snippets/new"}
          className="border bg-gray-200 rounded-xl p-2"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col">{renderedSnippet}</div>
    </div>
  );
}
