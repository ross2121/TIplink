"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image"
import {useRouter} from "next/navigation"
import { Balance, tokenwithdetails } from "@/app/api/hooks/usetoken";
import { Tabbutton,Button } from "./button";
import { TokenList } from "./tokenlist";
import { Swap } from "./wallet";
type Tab = "tokens" | "send" | "add_funds" | "swap" | "withdraw"
const tabs: {id: Tab; name: string}[] = [
    {id: "tokens", name: "Tokens"}, 
    {id: "send", name: "Send"}, 
    {id: "add_funds", name: "Add funds"},
    {id: "withdraw", name: "Withdraw"},
    {id: "swap", name: "Swap"},
];

export  const Profile=(publiclkey:string)=>{
    const router=useRouter();
   const session=useSession();
    const [selecttab,setselecttab]=useState<Tab>("tokens");  
    // const sessions=getServerSession(AUTH);
    const{loading,tokenBalances}=Balance(publiclkey) 
    if(session.status==="loading"){
        return <div>
            Loadiggg.....
        </div>
    }
   if(!session.data?.user){
    router.push("/");
   } 
   return  <div className="pt-8 flex justify-center">
    <div className="max-w-4xl bg-white rounded shadow w-full">
        <Greeting name={session.data?.user?.name||""} image={session.data?.user?.image||""}/>
             
     
        <div className="w-full flex px-10 gap-5">
                {tabs.map(tab => <Tabbutton key={tab.id} active={tab.id === selecttab} onclick={()=>{setselecttab(tab.id)}}>{tab.name}</Tabbutton>)}
            </div>
            
            <div className={`${selecttab === "tokens" ? "visible" : "hidden"}`}><Assets tokenBalances={tokenBalances} loading={loading} publicKey={publiclkey} /> </div>
            <div className={`${selecttab === "swap" ? "visible" : "hidden"}`}><Swap tokenBalances={tokenBalances} publicKey={publiclkey} /> </div>
            <div className={`${(selecttab !== "swap" && selecttab !== "tokens") ? "visible" : "hidden"}`}>Not available </div>

    </div>

   </div>

}
function Assets({publicKey, tokenBalances, loading}: {
    publicKey: string;
    tokenBalances: {
        totalBalance: number,
        tokens: tokenwithdetails[]
    } | null;
    loading: boolean;
}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    if (loading) {
        return "Loading..."
    }

    return <div className="text-slate-500">
        <div className="mx-12 py-2">
            Account assets
        </div>
        <div className="flex justify-between mx-12">
            <div className="flex">
                <div className="text-5xl font-bold text-black">
                    ${tokenBalances?.totalBalance}
                </div>
                <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-0 pl-2">
                    USD
                </div>
            </div>

            <div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(publicKey)
                    setCopied(true)
                }}>{copied ? "Copied" : "Your wallet address"}</Button>
            </div>
        </div>

        <div className="pt-4 bg-slate-50 p-12 mt-4">
            <TokenList tokens={tokenBalances?.tokens || []} />
        </div>
    </div>
}


function Greeting({image,name}:{image:string,name:string}){
const src=image
return(
    <div className="flex gap-5 items-center ">
   <Image loader={()=>src} src={image} height={30} width={30} className="rounded-xl" alt="google image" ></Image>
   <div className="text-black font-bold text-xl ">Welcome back {name} </div>
    </div>
)
}