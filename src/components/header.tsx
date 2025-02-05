"use client"
import { signIn,signOut,useSession } from "next-auth/react"
import { GoogleButton } from "./googlebutton"
import { WalletButton } from "./wallet"


export const Header=()=>{
    const session=useSession();
    return(
<div className="flex justify-between">
    <div className="flex  gap-10 ml-10 p-5">
        <div>
            Tplink
        </div>
        <div>
            1
        </div>
        <div>2</div>
    </div>
    <div className="mr-10 p-5  flex gap-5 ">
        <div className="flex text-center items-center text-white  justify-center gap-2 bg-blue-500 p-2 rounded-lg text-xl">
        {session ? (
            <GoogleButton onClick={() => signOut()}>Sign Out</GoogleButton>
          ) : (
            <GoogleButton onClick={() => signIn("google")}>Login with Google</GoogleButton>
          )}
       
        {/* <h1>Login With google</h1> */}
            
      </div> 
        <div>

        <WalletButton>Wallet</WalletButton></div></div>

</div>
    )
}