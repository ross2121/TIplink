"use client"
import { Hero } from "@/components/hero";
import { signIn } from "next-auth/react";


export default function Home() {
  return <div>
  <div>
  <button onClick={()=>signIn("google")}>Sign in</button>
    <Hero>  
     
    </Hero>

 </div>
</div>  
  
}
