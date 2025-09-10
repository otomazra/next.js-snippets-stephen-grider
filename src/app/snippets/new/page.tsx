'use client';
import React, {useActionState, startTransition} from "react";
import {createSnippet} from "@/actions";

export default function SnippetCreatePage() {
  const [actionState, action] = useActionState(createSnippet, {message: ""});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition( ()=>{
      action(formData);
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
          {actionState.message ? <div className="my-2 p-2 border rounded bg-red-200" >{actionState.message}</div> : null}
        <button
          type="submit"
          className="cursor-pointer rounded p-2 bg-blue-200 hover:bg-blue-500 hover:text-white "
          >
          Create
        </button>
      </div>
    </form>
  );
}
