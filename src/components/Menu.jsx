'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Menu({ pageName }) {
  const { data: session, status } = useSession()

  const loggedIn = session ? true : false

  return (

    <div
      id="MenuRoot"
      className="overflow-hidden flex flex-row justify-between w-full items-center px-6 py-3 gap-1"
    >
      <div className='flex justify-start'>
        <h1 className="text-4xl font-extrabold">{pageName}</h1>
      </div>
      <div className='justify-end flex gap-2'>
        {loggedIn && (
          <button
            className="bg-[#fce07c] w-16 p-1 rounded-[50px] shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.12)]"
            onClick={() => {
              signOut()
            }}
          >Logout</button>

        )}
        {!loggedIn && (
          <button
            className="bg-[#fce07c] w-20 p-1 h-10 rounded-[50px] shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.12)] text-lg font-semibold tracking-[1.26]"
            onClick={() => {
              signIn('google')
            }}
          >Login</button>
        )}
        {loggedIn && (
          <Link href="/dashboard" className='rounded-[50px] flex flex-col w-10 h-10 justify-center items-center hover:-bg--hover-color '>
            <img src="/dashboard-icon.png"
              className='w-8 h-8 shrink-0'
            />
          </Link>
        )}
        {loggedIn && (
          <Link href='/dashboard/detailed-graph' className='rounded-[50px] flex flex-col w-10 h-10 justify-center items-center hover:-bg--hover-color '>
            <img src="/line-chart.svg"
              className='w-8 h-8 shrink-0' />
          </Link>
        )}
        <div
          id="Profile"
          className="bg-[#FCE07C] overflow-hidden rounded-[50px] flex flex-col w-10 h-10 justify-center items-center shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.12)]"
        >
          <img
            src={loggedIn ? session.user.image : "https://file.rendit.io/n/ZjMaQphCBoK5MreYxpgu.svg"}
            className='w-10 h-10'
            id="Bee"
          />
        </div>
      </div>
    </div>
  )
}