import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GG_ID,
            clientSecret: process.env.GG_SECRET,
        })
    ],
    callbacks: {
        async redirect() {
            return "/dashboard"
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };