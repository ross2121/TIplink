// 'use client';

// import Image from "next/image"
// import { signIn } from "next-auth/react"
// import { ReactNode } from 'react'

// interface WalletButtonProps {
//   children?: ReactNode
// }

// export const WalletButton = ({ children }: WalletButtonProps) => {
//   return (
//     <div className="flex">
//       <button
//         className="wallet-adapter-button hidden h-11 cursor-pointer !items-center !justify-center rounded-lg bg-white text-xs !font-semibold text-primaryBlue shadow-[0px_0px_40px_rgba(0,_0,_0,_0.06)] transition-all duration-150 ease-in-out hover:!bg-blue-25 active:!bg-blue-50 mobile:!flex sm:text-base !w-11 pl-2"
//         type="button"
//         onClick={() => signIn()}
//       >
//         <Image 
//           alt="Wallet based" 
//           src="https://tiplink.io/icons/wallet-blue.svg" 
//           height={20} 
//           width={20}
//         />
//         {children}
//       </button>
//     </div>
//   )
// }