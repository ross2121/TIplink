import { NextRequest,NextResponse } from "next/server";
 import {connection,Token} from "@/lib/constant"
 import { getAssociatedTokenAddress, getAccount, getMint} from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
export  async function GET(req:NextRequest,res:NextResponse) {
   const {searchParams}=new URL(req.url);
   const address=searchParams.get('address')||""
   const tokent=await Token();
   if(tokent==null){
    return;
   }
   const balance=await Promise.all(tokent.map((token)=>Accountbalnce(token,address)))
   if(tokent==null||balance==null){
    return;
   }
   const tokens =tokent.map((token, index) => ({
    ...token,
    balance: balance[index],
    // @ts-ignore
    usdBalance: (balance[index] * Number(token.price)).toFixed(2)
}));
// @ts-ignore
return  NextResponse.json({tokens,totalBalance: tokens.reduce((acc, val) => acc + Number(val.usdBalance), 0).toFixed(2)}) 
}
 export async function Accountbalnce(token:{
    name:string,
    mint:string,
    native:boolean,
    decimals:number,
 },address:string){
     if(token.native){
        let balance=await connection.getBalance(new PublicKey(address));
        return balance/LAMPORTS_PER_SOL
     }
     const ata=await getAssociatedTokenAddress(new PublicKey(token.mint),new PublicKey(address))
     try {
        const account=await getAccount(connection,ata)
        return Number(account.amount)/(10*token.decimals)
     } catch (error) {
        return error;
     }
}