export default function MainPage() {
  return (
    <div
      id="FrontPageRoot"
      className="main-page bg-gradient-to-b from-[#fffae7] via-[#fffae7] via-60% to-[rgba(255, 224, 205, 0)]"
    >
      <img
        src="https://file.rendit.io/n/pATthcwzrnHECNN5jeJw.png" //problem with pic
        id="Image1"
        className="mb-12"
      />
      <div>

        <div className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] overflow-hidden bg-[rgba(240,_189,_7,_0.21)] self-start flex flex-col gap-3 items-start pt-10 pb-16 px-4 rounded-[25px] min-w-[400px] w-[500px] ">
          <div className="m-3">
            <h2 className="text-6xl font-['Inter'] font-bold mb-3">Bees</h2>
            <p className="text-lg font-['Inter'] font-extralight self-end w-full">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque
              sapien. Ut tempus purus at lorem. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
              qui ratione voluptatem sequi nesciunt. Aliquam ante. Mauris suscipit,
              ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis
              velit mauris vel metus. In rutrum. Maecenas libero.
            </p>
          </div>
        </div>
        <button
          // onClick={(e) => SignUpButtonRootFunction(e, "SignUpButtonRoot")}
          id="SignUpButtonRoot"
          className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] overflow-hidden bg-[#fce07c] flex flex-col justify-center w-full h-16 items-center rounded-[50px] mt-7"
        >
          <div className="text-center text-3xl font-['Inter'] font-semibold tracking-[1.26]">
            Start beeing
          </div>
        </button>
      </div>
    </div>
  )
}