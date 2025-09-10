import {db} from "@/db";
import { notFound } from "next/navigation";

interface ShowCatsPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ShowCatsPage(props: ShowCatsPageProps){
    const {id} = await props.params;

    const cat = await db.cat.findFirst({
        where: {id: parseInt(id)},
    });

    if(!cat) return notFound();

    return (
        <div>
            <p>Cat name: {cat.name}</p>
            <p>Cat color: {cat.color}</p>
        </div>
    );
}