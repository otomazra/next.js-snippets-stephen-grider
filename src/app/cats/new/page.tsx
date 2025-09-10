import { db } from "@/db";
import { redirect } from "next/navigation";

export default function NewCat() {
  async function addCat(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const color = formData.get("color") as string;

    const cat = await db.cat.create({
      data: {
        name,
        color,
      },
    });
    redirect("/");
  }

  return (
    <form action={addCat}>
      <h3 className="font-bold m-3">New Cat</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Name
          </label>
          <input
            name="name"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Color
          </label>
          <textarea
            name="color"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded p-2 bg-blue-200 hover:bg-blue-500 hover:text-white "
        >
          Add
        </button>
      </div>
    </form>
  );
}
