import nodemailer from "nodemailer";
import ConfigDet from "../config/env.config.js";
const transporter=nodemailer.createTransport({
service:"gmail",
auth:{
    user:ConfigDet.user,
    pass:ConfigDet.pass
}

})

export async function sendEmailTo(to,subject,message) {
    await transporter.sendMail({
        from :ConfigDet.user,
        to:to,
        subject:subject,
        text:message

    })
    console.log("Email Sent")
}