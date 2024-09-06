import dbConnect from "@/lib/db";
import { UserModel } from "@/model/userModel";
import { z } from "zod";
import {
  usernameValidation,
  SignUpSchema,
} from "../../../schemas/signUpSchemas";

// Do validation of code

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    console.log(username, code);
    const decodedUsername = decodeURIComponent(username);
    console.log(decodedUsername);
    // username validation
    const result = usernameValidation.safeParse(decodedUsername);
    console.log(result);
    if (!result.success) {
      console.log(result.error);
      const usernameError = result.error.format()._errors || [];
      return Response.json(
        {
          success: false,
          message: `Invalid username ${usernameError.join(",")}`,
        },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const isCodeValid = user.verifyToken === code;
    const isCodeNotEXpired = new Date(user.verifyTokenExpiry) > new Date();

    if (isCodeValid && isCodeNotEXpired) {
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account verified",
        },
        { status: 200 }
      );
    } else if (!isCodeNotEXpired) {
      return Response.json(
        {
          success: false,
          message: "Code expired",
        },
        { status: 400 }
      );
    } else {
      // if !isCodeValid
      return Response.json(
        {
          success: false,
          message: "Invalid Code",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log("Error in verifyCode", error);
    return Response.json(
      {
        success: false,
        message: "Error in verifying code",
      },
      { status: 500 }
    );
  }
}
