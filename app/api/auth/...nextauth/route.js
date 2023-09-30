import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '1086696909500-fk0ho6v0im0e9bkhm0k4nnb46bk19vab.apps.googleusercontent.com',
            clientSecret: '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'
        })
    ],
    async session ({session}) {

    },
    async signIn({profile}){

    }
})

export {handler as GET , handler as POST}