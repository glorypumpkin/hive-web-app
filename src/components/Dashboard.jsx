'use client'
import { Weather } from "./Weather"
import { SmallGraph } from './SmallGraph'
import { DataPrediction } from './DataPrediction'

export default function Dashboard() {
    return (
        <div className=" flex flex-col gap-16 w-full px-6 pt-16 lg:pb-4">
            <div className="flex flex-row lg:flex-col mr-1 gap-12 items-start">
                <Weather> </Weather>
                <DataPrediction> </DataPrediction>
            </div>
            <div className="flex flex-row lg:flex-col mr-1 gap-12 items-start">
                <SmallGraph graphType="weight"> </SmallGraph>
                <SmallGraph graphType="temperature"> </SmallGraph>
            </div>
        </div>
    )
}



