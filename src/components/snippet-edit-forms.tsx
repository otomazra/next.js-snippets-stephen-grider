"use client";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions/index";

interface SnippetEditPageProps {
  snippet: Snippet;
}

export default function SnippetEditPage({ snippet }: SnippetEditPageProps) {
  const [code, setCode] = useState(snippet.code);
  // console.log(code);
  function handleEditorChange(value: string = "") {
    setCode(value);
    // console.log(code);
  }
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <div>A client Component has a snippet with title {snippet.title}</div>
      <Editor
        theme="vs-dark"
        height="40vh"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        onChange={handleEditorChange}
        options={{ minimap: { enabled: false } }}
      />
      <div className="flex justify-center items-center">
        <form action={editSnippetAction}>
          <button type="submit" className="border border-blue-300 cursor-pointer mt-10 rounded p-2 px-10 bg-blue-200 text-xl font-bold text-blue-500">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
