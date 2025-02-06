"use client"
import { signIn,signOut,useSession } from "next-auth/react"
import { Button } from "./button";

export const Header=()=>{
    const session=useSession();
    return(
<div className="flex justify-between">
    <div className="flex  gap-10 ml-10 p-5">
        <div className="text-4xl font-bold">
            Web based exchange
        </div>
       
    </div>
    <div className="mr-10 p-5  flex gap-5 ">
        <div className="flex text-center items-center text-white  justify-center gap-2  p-2 rounded-lg text-xl">
        {session.data?.user ? <Button onClick={() => {
                       signOut()
                   }}>Logout</Button> : <Button onClick={() => {
                       signIn()
                   }}>Signin</Button>}
       
        {/* <h1>Login With google</h1> */}
            
      </div> 
        <div>

       </div></div>

</div>
    )
}