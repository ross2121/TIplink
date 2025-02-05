"use client"
import Image from "next/image"
import { ReactNode } from "react"
export const GoogleButton=({children,onClick}:{children:ReactNode,onClick:(()=>void)})=>{
    return(
        <div className="flex">
     <button onClick={onClick} className="flex justify-center h-9 items-center rounded-lg bg-blue-500 py-0 pl-1 pr-2.5 text-xs font-semibold text-white shadow-[0px_0px_40px_rgba(0,0,0,0.06)] hover:bg-blue-600 active:bg-blue-700 mobile:h-11 sm:text-base ">
        <Image alt="google sign in" src="https://tiplink.io/logos/google.svg" height={20} width={20}/>
    {/* <p className="w-full text-center font-bold ml-1.5"></p> */}
        {children}
     </button>
     </div>
    )
}