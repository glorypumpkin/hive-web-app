import PeriodGraph from '@/components/PeriodGraph.jsx'
import Bee from '@/components/Bee.jsx'

export default function MainPage({ data }) {

  return (
    <div
      id="FrontPageRoot"
      className=" bg-gradient-to-b from-[#fffae7] via-[#fffae7] via-100% to-[rgba(255, 224, 205, 0)]"
    >
      {/* <img
        src="main-page-pic.png"
        id="Image1"
        className="mb-12"
        alt="main-page-pic"
      /> */}
      <div className='main-page items-center justify-between'>
        <PeriodGraph data={data}>
        </PeriodGraph>
        <div className=" flex flex-col gap-3 ">
          <Bee></Bee>
          <div className="m-3 shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] overflow-hidden bg-[rgba(240,_189,_7,_0.21)] pt-10 pb-16 px-4 rounded-[25px] w-[30vw]">
            <h2 className="text-6xl font-bold mb-3">Bees</h2>
            <p className="text-lg font-extralight self-end w-full">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque
              sapien. Ut tempus purus at lorem. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
              qui ratione voluptatem sequi nesciunt. Aliquam ante. Mauris suscipit,
              ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis
              velit mauris vel metus. In rutrum. Maecenas libero.
            </p>
          </div>
          <button
            // onClick={(e) => SignUpButtonRootFunction(e, "SignUpButtonRoot")}
            id="SignUpButtonRoot"
            className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] overflow-hidden bg-[#fce07c] justify-center h-16 items-center rounded-[50px] mt-7"
          >
            <div className="text-center text-3xl font-semibold tracking-[1.26]">
              Start beeing
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
