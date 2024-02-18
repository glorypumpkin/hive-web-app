'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Menu() {
  const { data: session, status } = useSession()

  const loggedIn = session ? true : false

  return (

    <div
      id="MenuRoot"
      className="overflow-hidden bg-[#d2dce2] flex flex-row justify-end gap-2 w-full h-[6vh] items-center px-6"
    >
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
      <button
        id="Profile"
        className="bg-[#FCE07C] overflow-hidden rounded-[50px] flex flex-col w-10 h-10 justify-center items-center shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.12)]"
      >
        <img
          src={loggedIn ? session.user.image : "https://file.rendit.io/n/ZjMaQphCBoK5MreYxpgu.svg"}
          className='w-8 h-8'
          id="Bee"
        />
      </button>
    </div>
  )
}