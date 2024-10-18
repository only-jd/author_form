import axios from "axios";


const baseUrl = "http://localhost:1337"; // Base URL for your API

export async function Register_Author_Service(
    data:any
): Promise<any> {
    try {
      console.log("services",data)
        const response = await axios.post(
            `${baseUrl}/api/author`, 
            data, 
            { headers: { 'Content-Type': 'multipart/form-data' } } // Ensure content type is set
        );
        
        return response.data; // Return the response data
    } catch (error) {
        console.error("Register Author Service Error:", error);
        throw new Error("Failed to register author. Please try again later.");
    }
}
