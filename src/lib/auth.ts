import GoogleProvide from "next-auth/providers/google"
import prisma from "@/db/index"
import { Keypair} from "@solana/web3.js"
import { Account, Session } from "next-auth";


export interface session extends Session {
    user: {
      email: string;
      name: string;
      image: string
      uid: string;
    };
}

interface token{

    uid: string,
 
}
interface User{
    uid :number,
    name:string,
    email:string,
    sub:string
image:string
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

        // @ts-expect-error it is necessary for price to exist
        session: ({ session, token }): session => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
              console.log("check");
              newSession.user.uid = token.uid ?? "";
            }
            console.log("Session",newSession);
            return newSession;
        },
        async jwt({ token, account, profile }: {token:token,account:Account,profile:User}) {
            const user = await prisma.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            })
            console.log(profile);
            if (user) {
              token.uid=user.id
            }
            console.log(token.uid);
            console.log("token",token);
            return token
        },
        async signIn({ user, account, profile, email, credentials }: {user:User,account:Account,profile:User,email:string,credentials:string}) {
            console.log("account",account);
           console.log(email);
            if (account?.provider=== "google") {
                console.log("email",user);
                const email = user.email;
                console.log(email);
                if (!email) {
                    return false
                } console.log("profile",profile,email,credentials);
                
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
                const publickey=Keypairs.publicKey;
                try{await prisma.user.create({
                    data: {
                         email:email,
                        name: user.name,
                        sub:account.providerAccountId,
                       
                        picture: user.image,
                     
                        SQLWALLET:{
                            create:{
                                privateKey:privatekey.toString(),
                                publiclkey:publickey.toBase58(),
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