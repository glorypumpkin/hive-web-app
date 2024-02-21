'use client'

import PeriodGraph from '@/components/PeriodGraph.jsx'
import Bee from '@/components/Bee.jsx'
import { signIn } from 'next-auth/react'

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
                id="SignUpButtonRoot"
                className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] bg-[#fce07c] h-16 rounded-[50px] w-[600px]"
                onClick={() => {
                  signIn('google')
                }}
              >
                <div className="text-center text-3xl font-semibold tracking-[1.26]">
                  Start beeing
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
