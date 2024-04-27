'use client'
import { Weather } from "./Weather"
import { SmallGraph } from './SmallGraph'
import { DataPrediction } from './DataPrediction'

export default function Dashboard() {
    return (
        <div className=" grid grid-cols-1 grid-rows-2 gap-10 w-full px-6 pt-10 lg:pb-4 flex-grow">
            <div className="flex flex-row lg:flex-col mr-1 gap-12 ">
                <Weather> </Weather>
                <DataPrediction> </DataPrediction>
            </div>
            <div className="flex flex-row lg:flex-col mr-1 gap-12">
                <SmallGraph graphType="weight"> </SmallGraph>
                <SmallGraph graphType="temperature"> </SmallGraph>
            </div>
        </div>
    )
}



