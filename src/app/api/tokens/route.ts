import { NextRequest,NextResponse } from "next/server";
 import {connection,Token} from "@/lib/constant"
 import { getAssociatedTokenAddress, getAccount} from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
export  async function GET(req:NextRequest) {
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
   if(balance[2]=="NaN"){
      balance[2]="0"
}

for(let i=0;i<balance.length;i++){
   if(balance[i]=="NaN"){
      console.log("heuueeu");
      balance[i]="0"
   }
}
   const tokens =tokent.map((token, index) => ({
    ...token,
    balance: balance[index],
   //  @ts-expect-error it is necessary for price to exist

   usdBalance: (balance[index] * Number(token.price)).toFixed(2)

}));


return  NextResponse.json({tokens,totalBalance: tokens.reduce((acc, val) => acc + Number(val.usdBalance), 0).toFixed(2)}) 
}
 async function Accountbalnce(token:{
    name:string,
    mint:string,
    native:boolean,
    decimals:number,
 },address:string){
     if(token.native){
        const balance=await connection.getBalance(new PublicKey(address));
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