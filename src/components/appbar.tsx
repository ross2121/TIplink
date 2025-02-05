"use client"
import { signIn, signOut } from "next-auth/react"
import { Button } from "./button"
import { useSession } from "next-auth/react"


export const Appbar=()=>{
   const session=useSession();
    return <div>
        <div className="text-6xl color-blue">
            TIPLINK
        </div>
        <div >
        {session.data?.user ? <Button onClick={() => {
                signOut()
            }}>Logout</Button> : <Button onClick={() => {
                signIn()
            }}>Signin</Button>}
        </div>
    </div>
}