import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    adapter : PrismaAdapter(PrismaClient),
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {
                    label : "Email",
                    type : "email",
                    placeholder : "Enter your email"
                },
                password : {
                    label : "Password",
                    type : "password",
                    placeholder : "Enter your password"
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where : {
                        email : credentials.email
                    }
                });

                if(!user) {
                    return null;
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);  

                if(!isCorrectPassword) {
                    return null;
                }
                return user;
            }
        })
    ],
    session: {
        strategy : "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };