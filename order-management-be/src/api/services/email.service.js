import { readFileSync } from "fs";
import Mustache from "mustache";
import { transporter } from "../../config/email.js"
import env from "../../config/env.js";
import { EMAIL_ACTIONS } from "../utils/common.js";

const getEmailData = ( action ) => {
    let path = '', template = '';
    switch (action) {
        case EMAIL_ACTIONS.VERIFY_USER:
            path = `${process.cwd()}/src/api/templates/verifyEmail.html`;
            template = readFileSync(path, 'utf8');
            return {
                url: `${env.app.appUrl}/verify`,
                subject: 'Re: Email Verification',
                template: template
            }
        case EMAIL_ACTIONS.FORGOT_PASSWORD:
            path = `${process.cwd()}/src/api/templates/forgotPassword.html`;
            template = readFileSync(path, 'utf8');
            return {
                url: `${env.app.appUrl}/reset`,
                subject: 'Re: Recover Password',
                template: template
            }
        default:
            break;
    }
}

export const sendEmail = async ( token, to, action ) => {
    try {
        // create the email data
        const data = getEmailData(action);
        const url = `${data.url}?token=${encodeURIComponent(token)}`;

        let options = {
            from: env.email.user,
            to: to,
            subject: data.subject,
            html: Mustache.render(data.template, { appUrl: url })
        };
    
        // send email to the user
        await transporter.sendMail(options);
        return;
    } catch (error) {
        console.log(`Error sending verification email ${error}`);
        throw error;   
    }
}
