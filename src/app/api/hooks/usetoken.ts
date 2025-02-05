import { TokenDetails } from "@/lib/token";
import axios from "axios";
import { useEffect, useState } from "react";
export interface tokenwithdetails extends TokenDetails{
    balance:string,
    usdbalance:string
}
export function Balnce(address:string){
    const [tokenBalances, setTokenBalances] = useState<{
        totalBalance: number,
        tokens: tokenwithdetails[]
    } | null >(null);
   const [loading,setloading]=useState(true);
   useEffect(() => {
    axios.get(`/api/tokens?address=${address}`)
        .then(res => {
            setTokenBalances(res.data);
            setloading(false)
        })
}, [])
return {
    loading, tokenBalances
}
   
}