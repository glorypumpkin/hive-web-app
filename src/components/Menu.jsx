'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Menu() {
  const { data: session, status } = useSession()

  const loggedIn = session ? true : false



  return (

    <div
      id="MenuRoot"
      className="overflow-hidden bg-[rgba(224,_187,_55,_0.24)] flex flex-row justify-end gap-2 w-full h-[5vh] items-center px-6"
    >
      {loggedIn && (
        <button
          className="bg-[#fce07c] w-16 p-1 rounded-[50px]"
          onClick={() => {
            signOut()
          }}
        >Logout</button>

      )}
      {!loggedIn && (
        <button
          className="bg-[#fce07c] w-16 p-1 rounded-[50px]"
          onClick={() => {
            signIn('google')
          }}
        >Login</button>
      )}
      <button
        id="Profile"
        className="bg-[#FCE07C] overflow-hidden rounded-[50px] flex flex-col w-8 h-8 justify-center items-center"
      >
        <img
          src={loggedIn ? session.user.image : "https://file.rendit.io/n/ZjMaQphCBoK5MreYxpgu.svg"}
          id="Bee"
        />
      </button>
    </div>
  )
}