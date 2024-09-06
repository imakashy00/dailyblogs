import { UserModel } from '@/model/userModel';
import nodemailer, { TransportOptions } from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendMail = async( {email,emailType,userId}:any)=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        // TODO: Configure mail for usage
        if(emailType==="accountVerification"){
            //send account verification mail
            await UserModel.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000});
        }
        else if(emailType==="forgotPassword"){
            //send forgot password mail
            await UserModel.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000});
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",//"process.env.SMTP_HOST",
            port: "process.env.SMTP_PORT",
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        } as TransportOptions);
        const mailOptions= {
            from:"aka@gmail.com",
            to:email,
            subject:emailType==="forgotPassword"?"Reset Password":"Account Verification",
            html:"<h1>Reset Password</h1>"
        }
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}