"use client"
import { GoogleButton } from "./googlebutton"
import { signIn } from "next-auth/react"


export const Hero=()=>{
    return(
        <div className="flex-col justify-center align-middle items-center mt-14">
        <div className="items-center">  
        <h1 className="chakra-text text-center text-[30px] font-bold tracking-[-0.02em] text-neutral-primary mobile:text-[42px] sm:text-[48px] md:text-[60px] css-0 line-height:1.2">The crypto of tomorrow, <span className="font-bold text-primaryBlue">today</span></h1>
      </div>
        <div className="items-center"> 
        <p className="chakra-text text-center text-base leading-normal text-grey-700 mobile:text-[18px] sm:text-2xl css-0">Create a frictionless wallet with just a Google Account.</p>
        </div>
        {/* <div className="items-center align-middle"> */}
        <div className="flex items-center justify-center mt-10">
        <div className="flex text-center items-center text-white  w-72 justify-center gap-2 bg-blue-500 p-2 rounded-lg text-xl">
     
        {/* <GoogleButton onClick={signIn("google")} >login WITH GOOGLE</GoogleButton> */}
      
        </div>
            
      {/* </div> */}    
        </div>
        </div>
    )

}