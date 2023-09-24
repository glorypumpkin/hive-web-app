
export default function Menu() {
    return (
        <div><div
        id="MenuRoot"
        className="overflow-hidden bg-[rgba(224,_187,_55,_0.24)] flex flex-row justify-end gap-2 w-full h-12 items-center px-6"
      >
        <div className="bg-[#fce07c] flex flex-col w-12 shrink-0 items-start pt-px pb-1 px-2 rounded-lg">
          <div className="text-xs font-['Inter'] ml-1">Login</div>
        </div>
        <div
          id="Ellipse"
          className="bg-[url(https://file.rendit.io/n/eDuqMIrzDcPpGmUl7rR7.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col w-8 shrink-0 h-8 items-center py-2"
        >
          <img
            src="https://file.rendit.io/n/ZjMaQphCBoK5MreYxpgu.svg"
            id="Bee"
            className="w-4"
          />
        </div>
      </div></div>
    )
}