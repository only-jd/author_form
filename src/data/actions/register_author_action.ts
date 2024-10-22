import { AuthorTypes } from "../types/types";
import { Register_Author_Service } from "../services/register_author_service";

export async function Register_Author_Action(
    formData: AuthorTypes
): Promise<any> {
    if (!formData) {
        return {
            success: false,
            data: null,
            error: "No form data found"
        };
    }

    // Create FormData to handle both the author data and the image file
    const data = new FormData();

    // Add the form fields
    data.append("data", JSON.stringify({
        full_name: formData.fullName,
        age: formData.age,
        gender: formData.gender,
        contact_no: formData.contactDetails,
        email: formData.email,
        linked_url: formData.socialMediaLinks,
        previous_work: formData.previousWork,
        prev_work_url: formData.previousWorkLink,
        bio: formData.bio,
        edu_qualification: formData.education,
        domain_type: formData.domain,
        other_domain: formData.otherDomain,
        current_org: formData.currentOrganization
    }));

    // Add the image file to the "profile_picture" field
    if (formData.profilePicture) {
        data.append("files.profile_picture", formData.profilePicture);
    }

    try {
        // Call the service with FormData
        const response = await Register_Author_Service(data);
        return {
            success: true,
            data: response,
            error: null
        };
    } catch (error) {
        console.error("Register Author Action Error:", error);
        return {
            success: false,
            data: null,
            error: "Failed to register author. Please try again later."
        };
    }
}
