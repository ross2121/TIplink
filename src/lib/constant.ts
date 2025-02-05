import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./token";

let lasttime:number|null=null
let price:{[key:string]:{
    usd:string,
}}={}

const tokentimeout=60*1000;
export const connection=new Connection("https://solana-mainnet.g.alchemy.com/v2/r25E3uMjQakYPLTlM3f9rNihLj8SlmE_")
export async function Token(){
if(!lasttime||new Date().getTime() - lasttime < tokentimeout){
    const get=await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana,usd-coin,tether&vs_currencies=usd");
    price=get.data
    console.log(get.data);
    lasttime=new Date().getTime();
}
if(price==null){
    return;
}
    lasttime=tokentimeout*60;
   
    return SUPPORTED_TOKENS.map(s=>({
            ...s,
            // @ts-ignore
            price:price[s.name].usd
            }))
}

