"use client"
import { ReactNode } from "react"

export const Button=({children,onClick}:{children:ReactNode,onClick:()=>void})=>{
    return <div>
    <button onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {children}
    </button>
    </div>
}
export const SecondaryButton=({children,onClick}:{children:ReactNode,onClick:()=>void})=>{
  return <div>
    <button onClick={onClick} type="button" className="text-white bg-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2 flex">{children}</button>
  </div>
}
export const Tabbutton=({children,onclick,active,key}:{children:ReactNode,onclick:(()=>void),active:boolean,key:string})=>{
return<div>
     <button type="button" key={key} className={`w-full text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${active ? "bg-blue-500" : "bg-blue-300"}`} onClick={onclick}>{children}</button>
</div> 
}