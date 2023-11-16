import DetailedGraph from "@/components/DetailedGraph"
import { getBeeData } from '@/lib/dataFetching.js'
// import { createContext } from "react";

// const DetailedGraphContext = createContext();

export default async function DetailedGraphPage() {
    const data = await getBeeData();
    return (
        // <DetailedGraphContext.Provider value={data}>
        //     <DetailedGraph />
        // </DetailedGraphContext.Provider>
        <DetailedGraph data={data} />
    )
}