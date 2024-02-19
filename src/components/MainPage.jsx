import PeriodGraph from '@/components/PeriodGraph.jsx'
import Bee from '@/components/Bee.jsx'

const Hexagon = ({ text }) => {
  return (
    <div className="hexagon">
      {text}
    </div>
  )
}

export default function MainPage({ data }) {
  return (
    <div
      id="FrontPageRoot"
      className=" bg-gradient-to-b from-[#d2dce2] via-[#fffae7] via-100% to-[rgba(255, 224, 205, 0)]"
    >
      <div className='overflow-hidden flex flex-col gap-5 w-full  justify-center h-[95vh] items-center'>
        <div className=' w-[100vw] text-center'>
          <h1 className="text-7xl font-black mb-3 h-[10vh]">Check Your Bees</h1>
        </div>
        <div className='flex flex-row'>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-extrabold'>What can you do?</h2>
            <div className='hex-container pt-12'>
              <div className='hex-row'>
                <Hexagon text="1"></Hexagon>
              </div>
              <div className='hex-row'>
                <Hexagon text="2"></Hexagon>
              </div>
              <div className='hex-row'>
                <Hexagon text="3"></Hexagon>
              </div>
              <div className='hex-row'>
                <Hexagon text="4"></Hexagon>
              </div>
              <div className='hex-row'>
                <Hexagon text="5"></Hexagon>
              </div>
            </div>
          </div>
          <div className='grid w-[60vw]'>
            <div className=' justify-self-end w-[750px] '>
              <h2 className='text-4xl font-extrabold text-center pb-4'>Take a look inside</h2>
              <div className='relative'>
                <img src="/bubles.svg"
                  className=' w-full'
                />
                <div className='absolute inset-0'>
                  <div className='p-24 pt-16 pb-32 pl-40 pr-4 w-[90%] h-full'>
                    <PeriodGraph data={data}>
                    </PeriodGraph>
                  </div>
                </div>
              </div>
            </div>
            <div className=' items-center justify-around  flex pl-20'>
              <img src="/beehive.png"
                className=' w-64 h-64 '
              />

              <button
                // onClick={(e) => SignUpButtonRootFunction(e, "SignUpButtonRoot")}
                id="SignUpButtonRoot"
                className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] bg-[#fce07c] h-16 rounded-[50px] w-[600px]"
              >
                <div className="text-center text-3xl font-semibold tracking-[1.26]">
                  Start beeing
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* <PeriodGraph data={data}>
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
        </div> */}
      </div>
    </div>
  )
}
