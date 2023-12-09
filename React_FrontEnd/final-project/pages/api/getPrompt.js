//get prompts route for user profile page 
import { getSession } from "next-auth/react";
import { dbConnect } from "@/utils/db";
import Prompt from "@/models/Prompt";

const getPromptHandler = async (req, res) => {
    const session = await getSession({ req })

    if(!session) {
        return res.status(401).json({error: 'You are not yet authenticated, please sign in'})
    }

    await dbConnect()

    try {
        const prompts = await Prompt.find({userId: session.user.id})
        return res.status(200).json(prompts)
    } catch (error) {
        console.log("Error getting prompts: ", error)
        return res.status(500).json({error: "The server Broked"})
    }
}

export default getPromptHandler