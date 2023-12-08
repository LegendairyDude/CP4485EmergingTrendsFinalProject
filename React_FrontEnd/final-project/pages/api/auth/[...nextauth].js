// auth route per next auth documentation
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
//import db 
import { dbConnect } from "@/utils/db";
//import user
import User from "@/models/user";

// console.log({
//     clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
// })

//get session and user dad for authorization frm google and reg usr in db
const authHandler = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString()

        return session
    },
    async signIn({ profile }) {
        try {
            await dbConnect()

        //check if user exists
        const userExists = await User.findOne({email: profile.email})
        
        //create user if no exist
        if(!userExists) {
            await User.create({
                email: profile.email,
                username: profile.name.replace(",", "").toLowerCase(),
                image: profile.picture
            })
        }

        return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default NextAuth(authHandler)
