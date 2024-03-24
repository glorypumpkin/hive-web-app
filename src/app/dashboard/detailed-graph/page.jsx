import DetailedGraph from "@/components/DetailedGraph"
import AccessHandler from '@/components/AccessHandler';
import { NotesProvider } from "@/lib/useUserNotes";
// import { createContext } from "react";

// const DetailedGraphContext = createContext();

export default async function DetailedGraphPage() {
    return (
        <>
            <AccessHandler />
            <NotesProvider>
                <DetailedGraph />
            </NotesProvider>
            {/* <Menu /> */}
        </>
    )
}