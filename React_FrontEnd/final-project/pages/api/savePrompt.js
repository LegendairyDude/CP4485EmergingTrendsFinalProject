/* api route for creating new entry in db for generated pet names*/
import Prompt from "@/models/Prompt";
/* mongoDB connection utility */
import { dbConnect } from "@/utils/db";

/* function to handle post request to database */
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      /* Get parameters from request which is response from
      flask back end name generation */
      const { petType, petDescription, generatedName } = req.body;

      //connect to the db
      await dbConnect();

      /*  Create a new prompt using the prompt model /models/Prompt */ 
      const newPrompt = new Prompt({
        petType,
        petDescription,
        generatedName,
      });

      //Save prompt to the database
      await newPrompt.save();

      //return the successful 
      return res.status(201).json(newPrompt);
    } catch (error) {
      //catch and notify error
      console.error("Error in savePromt", error)
      return res.status(500).json({ error: "Failed to save the prompt" });
    }
  } else {
    //handle unwanted actions
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
