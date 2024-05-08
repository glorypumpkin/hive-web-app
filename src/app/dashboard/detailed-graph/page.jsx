import DetailedGraph from "@/app/dashboard/detailed-graph/DetailedGraph"
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