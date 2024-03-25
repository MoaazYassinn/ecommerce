import nodemailer from "nodemailer"

import { template } from "./template.js";
import Jwt from "jsonwebtoken";

export const sendEmails=async(email)=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "anyemail@gmail.com",
          pass: "anypass",
        },
      });
       let token=Jwt.sign({email},process.env.JWT_KEY)

      const info = await transporter.sendMail({
        from: '"anyName" <email>', 
        to: email, // list of receivers
        subject: "Subject", // Subject line // plain text body
        html:template(token), // html body
      });
    
      console.log("Message sent: %s", info.messageId);
}