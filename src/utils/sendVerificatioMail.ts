import { resend } from "@/lib/resend";

import VerificationEmail from "../../email/verificationEmail";

import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationMail(
  email: string,
  verifyToken: string,
  username: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "verify@dailyblogs.co",
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ username, otp: verifyToken }),
    });
    console.log(username, verifyToken);
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
