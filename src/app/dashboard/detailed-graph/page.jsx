import DetailedGraph from "@/components/DetailedGraph"
import Menu from "@/components/Menu";
import { getBeeData } from '@/lib/dataFetching.js'
import AccessHandler from '@/components/AccessHandler';
import { NotesProvider } from "@/lib/useUserNotes";
// import { createContext } from "react";

// const DetailedGraphContext = createContext();

export default async function DetailedGraphPage() {
    const data = await getBeeData();
    return (
        <>
            <AccessHandler />
            <NotesProvider>
                <DetailedGraph data={data} />
            </NotesProvider>
            {/* <Menu /> */}
        </>
    )
}