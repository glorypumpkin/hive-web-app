import DetailedGraph from "@/components/DetailedGraph"
import { getBeeData } from '@/lib/dataFetching.js'


export default async function DetailedGraphPage() {
    const data = await getBeeData();
    return (
        <div>
            <DetailedGraph data={data}></DetailedGraph>
        </div>
    )
}