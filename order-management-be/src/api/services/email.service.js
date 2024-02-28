import { transporter } from "../../config/email"
import env from "../../config/vars";

export const sendOwnerVerificatonEmail = async ( toEmail ) => {
    try {
        let options = {
            from: env.email.user,
            to: toEmail,
            subject: 'Re: Email Verification',
            text: 'Please verify the email'
        };
    
        await transporter.sendMail(options);
        return;
    } catch (error) {
        console.log(`Error sending verification email ${error}`);
        throw error;   
    }
}
