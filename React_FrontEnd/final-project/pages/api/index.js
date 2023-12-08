//route to flask back end for generation of pet name with langchain
export const API_BASE_URL = "http://localhost:8080";

export const generatePetName = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_pet_name`);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error("Error: ", error);
    return "Error Generating Name";
  }
};
