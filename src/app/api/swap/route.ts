"use client"
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/index"
import { getServerSession } from "next-auth";
import {AUTH} from "@/lib/auth"

import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";

export async function POST(req:NextRequest){
    const connection=new Connection("")
    
  const session=await getServerSession(AUTH);
  const data:{quoteResponse:Response}=await req.json();
 
  if(!session?.user){
    return NextResponse.json({Message:"No user found"},{status:400});
  }
  const USer=await prisma.sOLWALLET.findFirst({
      where:{
        userId:session?.user.uid
      }
  })
  if(!USer?.publiclkey){
return NextResponse.json({Message:"No Sol wallet found"},{status:400});
  }
  
  const { swapTransaction } = await (
    await fetch('https://quote-api.jup.ag/v6/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quoteResponse:data.quoteResponse,
        userPublicKey: USer.publiclkey.toString(),
        wrapAndUnwrapSol: true,
      })
    })
  ).json();
 
const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
if(USer.privateKey===null){
    return NextResponse.json({Message:"No key found"})
}
const privateKey=await Privatekey(USer.privateKey);
if(privateKey==null){
    return NextResponse.json({Message:"NO private key founf"})
}
console.log(transaction);
transaction.sign([privateKey]);
const latestBlockHash = await connection.getLatestBlockhash();
const rawTransaction = transaction.serialize()
const txid = await connection.sendRawTransaction(rawTransaction, {
  skipPreflight: true,
  maxRetries: 2
});
await connection.confirmTransaction({
 blockhash: latestBlockHash.blockhash,
 lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
 signature: txid
});
return NextResponse.json({txid});

}
async function Privatekey(key:string) {
    const arr = key.split(",").map(x => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
}