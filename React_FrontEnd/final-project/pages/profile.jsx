//user profile page
//finale major missing component
//will work on after final commit in hopes of finishing b4 deadline
//but willing to accept the L a little for not having backed up my now lost version b4 commiting
//backup ur stuff kids

import React, { useEffect, useState } from "react";
import Link from "next/link";

function profile() {
  const [petNames, setPetNames] = useState([]);

  useEffect(() => {
    // Fetch data from Flask API
    fetch("http://localhost:8080/profile")
      .then((response) => response.json())
      .then((data) => {
        setPetNames(data);
      })
      .catch((error) => {
        console.error("Error fetching pet names:", error);
      });
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <ul>
        {petNames.map((petName, index) => (
          <li key={index}>{petName}</li>
        ))}
      </ul>
    </div>
  );
}

export default profile;
