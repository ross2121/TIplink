
import { signIn,useSession } from "next-auth/react"
import {SecondaryButton } from "./button";
import {useRouter} from "next/navigation";
export const Hero=()=>{
  const router=useRouter();
  const session=useSession();
    return(
        <div className="flex-col justify-center align-middle items-center mt-14">
        <div className="items-center">  
        <h1 className="chakra-text text-center text-[30px] font-bold tracking-[-0.02em] text-neutral-primary mobile:text-[42px] sm:text-[48px] md:text-[60px] css-0 line-height:1.2">The crypto of tomorrow, <span className="font-bold text-primaryBlue">today</span></h1>
      </div>
        <div className="items-center"> 
        <p className="chakra-text text-center text-base leading-normal text-grey-700 mobile:text-[18px] sm:text-2xl css-0">Create a frictionless wallet with just a Google Account.</p>
        </div>
        {/* <div className="items-center align-middle"> */}
        <div className="flex items-center justify-center mt-10">
        <div className="flex text-center items-center text-white  w-72 justify-center gap-2 p-2 rounded-lg text-xl">
        {session.data?.user ? <SecondaryButton onClick={() => {
                router.push("/dashboard");
            }}>Go to Dashboard</SecondaryButton> : <SecondaryButton onClick={() => {
                signIn("google");
            }}>Login with Google</SecondaryButton>}
      
        </div>
            
      {/* </div> */}    
        </div>
        </div>
    )

}