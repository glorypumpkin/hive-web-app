'use client'

import PeriodGraph from '@/app/PeriodGraph.jsx'
import { signIn, useSession } from 'next-auth/react'

const Hexagon = ({ text }) => {
  return (
    <div className="hexagon text-center text-lg font-medium p-2">
      {text}
    </div>
  )
}

export default function MainPage() {
  const { data: session, status } = useSession()

  const loggedIn = session ? true : false

  const onSighUpClick = () => {
    if (!loggedIn) {
      signIn('google')
    } else {
      window.location.href = '/dashboard'
    }
  }
  return (
    <div
      id="FrontPageRoot"
      className=""
    >
      <div className='overflow-hidden flex flex-col gap-5 w-full  justify-center items-center'>
        {/* <Bee></Bee> */}
        <div className='text-center'>
          <h1 className="text-7xl font-black mb-3 ">Zkontroluj své včely
          </h1>
        </div>
        <div className='flex flex-row lg:flex-col lg:gap-10'>
          <div className='flex flex-col lg:items-center '>
            <h2 className='text-4xl font-extrabold'>Co můžeš udělat?</h2>
            <div className='lg:flex lg:pl-10'>
              <div className='hex-container pt-12'>
                <div className='hex-row'>
                  <Hexagon text="Přidavat poznámky"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Získat predikce"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Monitorovat stav úlu"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Získat předpověď počasí"></Hexagon>
                </div>
                <div className='hex-row'>
                  <Hexagon text="Porovnovat svá data"></Hexagon>
                </div>
              </div>
            </div>
          </div>
          <div className='grid'>
            <div className=' justify-self-end w-[750px] lg:w-full '>
              <h2 className='text-4xl font-extrabold text-center pl-8 pb-4'>Podívej se dovnitř</h2>
              <div className='relative lg:items-center'>
                <img src="/bubles.svg"
                  className=' w-full lg:pl-24 pl-20'
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
                className=' w-52 md:w-40 md:h-40'
              />
              <div className='lg:flex lg:justify-center lg:w-full'>
                <button
                  id="SignUpButtonRoot"
                  className="shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.12)] bg-[#fce07c] h-16 rounded-[50px] w-[600px] lg:w-64"
                  onClick={onSighUpClick}
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
