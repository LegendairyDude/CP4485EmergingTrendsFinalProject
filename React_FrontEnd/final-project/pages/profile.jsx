//user profile page
//finale major missing component
//will work on after final commit in hopes of finishing b4 deadline
//but willing to accept the L a little for not having backed up my now lost version b4 commiting
//backup ur stuff kids
import Navbar from "./components/NavBar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import style from './profile.module.css'
import ProfileEntry from "./components/ProfileEntry";

const Profile = () => {
  const {data: session} = useSession()
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const fetchPrompts = async () => {
      if (session) {
        try {
          const response = await fetch('/api/getPrompt')
          const data = await response.json()
          setPrompts(data)
        } catch (error) {
            console.error("Error Getting Prompts: ", error)
        }
      }
    }

    fetchPrompts()
  }, [session])


return (
  <>
  <Navbar />
  <div className={style.profileContainer}>
    <h1 className={`${style.profilePageHeader} ${style.titleBackground}`}>Profile Page</h1>
    {session ? (
      <div className={style.sessionProfileContainer}>
        <h2>User: {session.user.name}</h2>
        <ul  className={style.userPromptList}>
          {prompts.map((prompt, index) => (
            <ProfileEntry 
            key={index}
            petType={prompt.petType}
            petDescription={prompt.getDescription}
            generatedName={prompt.generatedName}/>
          ))}
        </ul>
      </div>
    ) : (<p>Please sign in to view your profile page.</p>)}
  </div>
  </>
)
}

export default Profile
// function profile() {
//   const [petNames, setPetNames] = useState([]);

//   useEffect(() => {
//     // Fetch data from Flask API
//     fetch("http://localhost:8080/profile")
//       .then((response) => response.json())
//       .then((data) => {
//         setPetNames(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching pet names:", error);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />
//     <div>
//       <h1>Profile Page</h1>
//       <ul>
//         {petNames.map((petName, index) => (
//           <li key={index}>{petName}</li>
//         ))}
//       </ul>
//     </div>
//     </>
//   );
// }

// export default profile;
