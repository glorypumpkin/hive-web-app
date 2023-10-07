import Image from "next/image"

export default function GraphExample() {
    return (
        <div
            id="GraphExampleRoot"
            className="main-page bg-gradient-to-t from-[#e7ecff] via-[#e7ecff] via-60% to-[rgba(255, 224, 205, 0)]"
        >
            <Image
                src="/Group6.png"
                width={760}
                height={600}
            />
            <div className="flex flex-col gap-12 items-start">
                <h2 className="text-5xl font-bold">
                    Try different stuff!
                </h2>
                <div className="flex flex-col ml-2 gap-3 w-[534px]">
                    <div className="flex flex-col">
                        <div
                            id="PropertyDefault"
                            className="idea-bubble mb-[-13px]"
                        >
                            <p className="container-text">
                                Add your notes!
                            </p>
                        </div>
                        <div
                            id="PropertyVariant"
                            className="idea-bubble self-end mr-5"
                        >
                            <p className="container-text">
                                Other stuff!
                            </p>
                        </div>
                        <div
                            id="PropertyVariant1"
                            className="idea-bubble ml-5"
                        >
                            <p className="container-text">
                                More other stuff!
                            </p>
                        </div>
                        <div
                            id="PropertyVariant2"
                            className="idea-bubble self-end"
                        >
                            <div className="container-text">
                                Even more other stuff!
                            </div>
                        </div>
                    </div>
                    <div
                        id="PropertyVariant3"
                        className="idea-bubble ml-3"
                    >
                        <div className="container-text">
                            All kinds of different stuff!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}