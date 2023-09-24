export default function FrontPage() {
    return (
        <div
        id="FrontPageRoot"
        className="overflow-hidden bg-[rgba(224,_187,_55,_0.1)] flex flex-row gap-5 w-full items-center pt-12 px-16"
      >
        <img
          src="https://file.rendit.io/n/pATthcwzrnHECNN5jeJw.png"
          id="Image1"
          className="mb-12"
        />
        <div className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] overflow-hidden bg-[rgba(240,_189,_7,_0.21)] self-start flex flex-col mt-24 gap-3 items-start pt-10 pb-16 px-4 rounded-[25px]">
          <div className="text-6xl font-['Inter'] font-bold ml-3">Bees</div>
          <div className="text-lg font-['Inter'] font-extralight self-end ml-3 w-full">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque
            sapien. Ut tempus purus at lorem. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
            qui ratione voluptatem sequi nesciunt. Aliquam ante. Mauris suscipit,
            ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis
            velit mauris vel metus. In rutrum. Maecenas libero.{" "}
          </div>
        </div>
      </div>
    )
}