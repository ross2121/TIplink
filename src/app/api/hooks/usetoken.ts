import { TokenDetails } from "@/lib/token";
import axios from "axios";
import { useEffect, useState } from "react";
export interface tokenwithdetails extends TokenDetails{
    balance:string,
    usdbalance:string
}
export function Balance(address:string){
    const [tokenBalances, setTokenBalances] = useState<{
        totalBalance: number,
        tokens: tokenwithdetails[]
    } | null >(null);
    console.log(address);
   const [loading,setloading]=useState(true);
   console.log("address",address);
   useEffect(() => {
    // @ts-expect-error it is necessary for price to exist
    axios.get(`api/tokens?address=${address.publiclkey}`)
        .then(res => {
        
            setTokenBalances(res.data);
            if(res.data.name=="USD-coin"){
                if(res.data.tok){
                    res.data.usdbalance="0"
                }
            }
            console.log(res.data);
            setloading(false)
        })
}, [])
return {
    loading, tokenBalances
}
   
}