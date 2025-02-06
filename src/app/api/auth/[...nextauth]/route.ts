import { AUTH } from "@/lib/auth";
import NextAuth from "next-auth"
// @ts-expect-error it is necessary for price to exist
const handler = NextAuth(AUTH)

export { handler as GET, handler as POST }

console.log({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
})