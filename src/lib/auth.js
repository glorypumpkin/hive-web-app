import { getServerSession } from "next-auth";

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
    session: {
        strategy: "jwt",
        // maxAge 30 minutes
        maxAge: 30 * 60
    },
    callbacks: {
        async redirect() {
            return "/dashboard"
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                token.access_token = account.access_token;
                token.id = profile.id;
            }
            return token;
        }
    }
};

export async function auth(...args) {
    return await getServerSession(...args, authOptions)
}