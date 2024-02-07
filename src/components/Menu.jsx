
export default function Menu() {
  return (

    <div
      id="MenuRoot"
      className="overflow-hidden bg-[rgba(224,_187,_55,_0.24)] flex flex-row justify-end gap-2 w-full h-[5vh] items-center px-6"
    >
      <button className="bg-[#fce07c] w-16 p-1 rounded-[50px] font-['Inter']">Login</button>
      <button
        id="Profile"
        className="bg-[#FCE07C] rounded-[50px] flex flex-col w-10 h-10 justify-center items-center"
      >
        <img
          src="https://file.rendit.io/n/ZjMaQphCBoK5MreYxpgu.svg"
          id="Bee"
          className="w-5"
        />
      </button>
    </div>
  )
}