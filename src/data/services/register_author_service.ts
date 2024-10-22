import axios from "axios";

const baseUrl = "http://localhost:1337"; // Base URL for your API

export async function Register_Author_Service(
    data: FormData
) {
    console.log("service check", data);
    try {
        const response = await axios.post(
            `${baseUrl}/api/authors`, 
            data,
            { 
                headers: { 
                    'Content-Type': 'multipart/form-data'
                } 
            }
        );
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.error("Register Author Service Error:", error);
        throw new Error("Failed to register author. Please try again later.");
    }
}
