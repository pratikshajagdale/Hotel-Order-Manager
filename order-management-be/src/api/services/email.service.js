import { readFileSync } from "fs";
import Mustache from "mustache";
import { transporter } from "../../config/email.js"
import env from "../../config/env.js";

export const sendOwnerVerificatonEmail = async ( toEmail ) => {
    try {

        // create the email data
        const path = `${process.cwd()}/src/api/templates/verifyEmail.html`;
        const template = readFileSync(path, 'utf8');
        let options = {
            from: env.email.user,
            to: toEmail,
            subject: 'Re: Email Verification',
            html: Mustache.render(template, { appUrl: env.app.appUrl })
        };
    
        // send email to the user
        await transporter.sendMail(options);
        return;
    } catch (error) {
        console.log(`Error sending verification email ${error}`);
        throw error;   
    }
}
