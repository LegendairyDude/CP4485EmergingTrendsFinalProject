import React, { useState } from "react";
import { generatePetName, API_BASE_URL } from "../api";
import style from "./PetNameGenerator.module.css";
// import dbConnect from "@/utils/db";
// import Prompt from "@/models/Prompt";
/* Name generation is to be desired and could be largely improved
with more knowledge and time in langchain ,
plus an OpenAPI key; Currently using databricks dolly-v2 */

const PetNameGenerator = () => {
  // states for name generation
  const [generatedName, setGeneratedName] = useState("");
  //setting petType
  const [petType, setPetType] = useState("");
  //setting ppet description for generation
  const [petDescription, setPetDescription] = useState("");
  //display some form of loading nofication while prompt processes
  const [loading, setLoading] = useState(false)
  //display error info if occurs
  const [error, setError] = useState("")

  // handle click remastered, possibly the final addition
  const handleGenerateClick = async (e) => {
    e.preventDefault()
    try {
      //while processing display loading message
      setLoading(true)

      /* fetch and send request to flask back end to generate pet name */
      const generateResponse = await fetch(`${API_BASE_URL}/generate_pet_name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ petType, petDescription}),
      }) 

      //if repsonse from generation not ok dispaly error msg
      if (!generateResponse.ok) {
        throw new Error(`HTTP ERROR! ${generateResponse.status}`)
      }

      //get newly generated name received with prompt data from flask
      const generateData = await generateResponse.json()
      setGeneratedName(generateData.generatedName)

      /* after generating name and getting results, call mongodb route
      and make a new post to the db*/

      /* save the data to the mongodb */
      await fetch("/api/savePrompt", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        // set data to be passed
        body: JSON.stringify({
          petType,
          petDescription,
          generatedName: generateData.generatedName.petName
        }),
      })
    } catch (error) {
      //display errors 
      console.log("Error", error)
      setError("Error generating or saving")
      setGeneratedName("Error Generating")
    } finally {
      // remove loading msg upon completion
      setLoading(false)
    }
  }
  

  //pet name generation form
  return (
    <div className={style.nameGenForm}>
      <form>
        {/* Pet Type. i.e. spieces */}
        <label htmlFor="petType" className={style.petForm}>
          Type of Pet:
        </label>
        <input
          type="text"
          name="petType"
          id="pet-type"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
        />

        {/* Description of pet parameters (colour, personailty, size, traits, ..., etc)
        could be broken down to include more laid out input style but when project gets lost in the
        void 2 days before due, this will have to do i hope :/  */}
        <label htmlFor="petDescription" className={style.petForm}>
          Pet Description:
        </label>
        <input
          className={style.nameInput}
          type="text"
          name="petDescription"
          id="pet-description"
          value={petDescription}
          onChange={(e) => setPetDescription(e.target.value)}
        />

        {/* "submit" button */}
        <button className={style.submitBtn} onClick={handleGenerateClick}>
                  Generate Pet Name
                  {/* On submit display loading message while awaiting results */}
                  {loading && <span className={style.loading}>Loading...</span>}
                </button>
              </form>

              <p id={style.nameResults} className={error ? style.error : ""}>
              {error || (generatedName && `Generated Name: ${generatedName.petName}`) || ""}
              </p>
            </div>)
        
  
};

export default PetNameGenerator;
  
//classic handlec clicks 
// const handleGenerateClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true)
  //     const response = await fetch(`${API_BASE_URL}/generate_pet_name`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ petType, petDescription }),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP ERROR! Status ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setGeneratedName(data.generatedName);

      //save data after generation
      // await dbConnect()
      // const newPrompt = {
      //   petType,
      //   petDescription,
      //   generatedName: data.generatedName.petName,
      //   userId: user.uid
      // }
      // await Prompt.create(newPrompt)

  //   } catch (error) {
  //     console.log("Error", error);
  //     setError("Error Generating name")
  //     setGeneratedName("Error Generating Name");
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  // handler for generating the pet name
  // const handleGenerateClick = async () => {
  //   const newPetName = await generatePetName(
  //     petType,
  //     petDescription
  //   );
  //   setGeneratedName(newPetName);
  // };