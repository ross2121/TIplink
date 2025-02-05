import { Provider } from "@/components/providers"
import GoogleProvide from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client";
import prisma from "@/db/index"
import { Session } from 'next-auth';
import { Keypair} from "@solana/web3.js"


export interface session extends Session {
    user: {
      email: string;
      name: string;
      image: string
      uid: string;
    };
}
export const AUTH={
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    providers:[
     GoogleProvide({
        clientId:process.env.GOOGLE_CLIENT_ID||"",
        clientSecret:process.env.GOOGLE_CLIENT_SECRET||""
     })
    ],
    callbacks:{ 
        session: ({ session, token }: any): session => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
              // @ts-ignore
              console.log("check");
              newSession.user.uid = token.uid ?? "";
            }
            console.log("Session",newSession);
            return newSession!;
        },
        async jwt({ token, account, profile }: any) {
            const user = await prisma.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            })
            if (user) {
              token.uid=user.id
            }
            console.log(token.uid);
            console.log("token",token);
            return token
        },
        async signIn({ user, account, profile, email, credentials }: any) {
            console.log(account);
            if (account?.provider=== "google") {
                console.log("email",user);
                const email = user.email;
                console.log(email);
                if (!email) {
                    return false
                }
                
                const userDb = await prisma.user.findFirst({
                    where: {
                        email:user.email
                    }
                })
                if (userDb) {
                    return true;
                }
                const Keypairs=Keypair.generate();
                const privatekey=Keypairs.secretKey;
                const publickey=Keypairs.publicKey.toBase58();
                try{await prisma.user.create({
                    data: {
                         email:email,
                        name: user.name,
                        sub:account.providerAccountId,
                        //@ts-ignore
                        picture: user.image,
                     
                        SQLWALLET:{
                            create:{
                                privateKey:privatekey.toString(),
                                publiclkey:publickey,
                            }
                        },
                        InrWallet:{
                            create:{
                                balance:0
                            }
                        }
                    },
                })}catch(e){
                    console.log(e);
                }

                return true;

            }
            
            return false
        },
    }
   
}