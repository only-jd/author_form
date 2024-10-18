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

    const data = {
        full_name: formData.fullName,
        age: formData.age,
        gender: formData.gender,
        contact_no: formData.contactDetails.toString(), // Convert to string if necessary
        email: formData.email,
        linked_url: formData.socialMediaLinks, // Array is now correct
        previous_work: formData.previousWork,
        prev_work_url: formData.previousWorkLink,
        bio: formData.bio,
        edu_qualification: formData.education,
        domain_type: formData.domain,
        other_domain: formData.otherDomain,
        current_org: formData.currentOrganization,
        profile_picture: formData.profilePicture // This will be handled differently
    };

    console.log(data)

    try {
        const response = await Register_Author_Service( data);
        return {
            success: true,
            data: response,
            error: null
        };
    } catch (error) {
        console.error("Register Author Action Error:", error);
       
    }
}
