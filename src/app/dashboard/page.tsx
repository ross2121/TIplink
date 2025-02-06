
import { getServerSession } from "next-auth";
import {Profile} from "../../components/profile";
import prisma from "@/db/index";
import { AUTH } from "../../lib/auth";

async function getUserWallet() {
    const session = await getServerSession(AUTH);

    const userWallet = await prisma.sOLWALLET.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select: {
            publiclkey: true
        }
    })

    if (!userWallet) {
        return {
            error: "No solana wallet found associated to the user"
        }
    }
    
    return {error: null, userWallet};
}

export default async function Dashboard() {
    const userWallet = await getUserWallet();

    if (userWallet.error || !userWallet.userWallet?.publiclkey) {
        return <>No solana wallet found</>
    }
    if(userWallet.userWallet.publiclkey===null){
        return;
    }

    return <div>
      {/* @ts-expect-error   it is necessary for profile to exist*/}
        <Profile publiclkey={userWallet.userWallet?.publiclkey}/>
    </div>
}