'use client'

import PeriodGraph from '@/components/PeriodGraph.jsx'
import Bee from '@/components/Bee.jsx'
import { signIn } from 'next-auth/react'

const Hexagon = ({ text }) => {
  return (
    <div className="hexagon text-center text-lg font-medium p-2">
      {text}
    </div>
  )
}

export default function MainPage() {
  return (
    <div
      id="FrontPageRoot"
      className=""
    >
      <div className='overflow-hidden flex flex-col gap-5 w-full  justify-center items-center'>
        {/* <Bee></Bee> */}
        <div className='text-center'>
          <h1 className="text-7xl font-black mb-3 ">Check Your Bees
          </h1>
        </div>
        <div className='flex flex-row lg:flex-col lg:gap-10'>
          <div className='flex flex-col lg:items-center '>
            <h2 className='text-4xl font-extrabold'>What can you do?</h2>
            <div className='lg:flex lg:pl-10'>
              <div className='hex-container pt-12'>
                <div className='hex-row'>
                  <Hexagon text="Add notes"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Get predictions"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Monitor your bees"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Get weather forecast"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Compare your data"></Hexagon>
                </div>
              </div>
            </div>
          </div>
          <div className='grid'>
            <div className=' justify-self-end w-[750px] lg:w-full '>
              <h2 className='text-4xl font-extrabold text-center pb-4'>Take a look inside</h2>
              <div className='relative lg:items-center'>
                <img src="/bubles.svg"
                  className=' w-full lg:pl-24'
                />
                <div className='absolute inset-0'>
                  <div className='p-24 pt-16 pb-32 pl-40 pr-4 w-[90%] h-full lg:pl-36 lg:pb-12 lg:pr-2 lg:pt-10'>
                    <PeriodGraph>
                    </PeriodGraph>
                  </div>
                </div>
              </div>
            </div>
            <div className=' items-center justify-around  flex lg:flex-col pl-20 lg:pl-0 lg:items-baseline lg:gap-3'>
              <img src="/beehive.png"
                className=' w-64 h-64 md:w-40 md:h-40'
              />
              <div className='lg:flex lg:justify-center lg:w-full'>
                <button
                  id="SignUpButtonRoot"
                  className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] bg-[#fce07c] h-16 rounded-[50px] w-[600px] lg:w-64"
                  onClick={() => {
                    signIn('google')
                  }}
                >
                  <div className="text-center text-3xl font-semibold ">
                    Start beeing
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
