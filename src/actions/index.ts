"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id: id },
    data: { code: code },
  });

  // console.log(id, code);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id: id },
  });
  redirect(`/`);
}

export async function createSnippet(stateAction: {message: string}, formData: FormData) {

  try{
    console.log(stateAction);
    console.log("formData: ", formData);

  // Check the user's inputs and make sure they are valid
  const title = formData.get("title");
  const code = formData.get("code");

  if(typeof title !== "string" || title.length < 3){
    return {message: "Title must be longer"};
  }

  if(typeof code !== "string" || code.length < 10){
    return {message: "Code must be longer"};
  }

  // Create a new record in the database
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  }catch(err: unknown){
    if(err instanceof Error){
      return {message: err.message};
    }else {
      return {message: "Error saving it to database"};
    }
  }
  
  redirect("/");
}
