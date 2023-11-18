import DetailedGraph from "@/components/DetailedGraph"
import { getBeeData } from '@/lib/dataFetching.js'
// import { createContext } from "react";

// const DetailedGraphContext = createContext();

export default async function DetailedGraphPage() {
    const data = await getBeeData();
    return (
        <DetailedGraph data={data} />
    )
}