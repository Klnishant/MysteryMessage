import { resend } from "@/lib/resend";
import  verficationEmail from "../../emails/verificationEmail"
import { apiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail (
    email: string,
    username: string,
    verifycode: string
): Promise<apiResponse> {
    console.log(email,username,verifycode);
    
    try {
        const emailResponse = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Mystery message",
            react: verficationEmail({username,otp: verifycode})
        });

        console.log(emailResponse);
        
        return ({success: true,
            message: 'verification code send successfully'});
    } catch (error) {
        console.error("Error sending verification email",error)
        
        return ({
            success: false,
            message: "failed to send verification email"
        });
    }
}