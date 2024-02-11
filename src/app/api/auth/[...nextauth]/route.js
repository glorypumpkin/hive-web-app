import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GG_ID,
            clientSecret: process.env.GG_SECRET,
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
                }
            }
        })
    ],
    callbacks: {
        async redirect() {
            return "/dashboard"
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };