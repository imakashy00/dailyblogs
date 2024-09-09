import dbConnect from "@/lib/db";
import { UserModel } from "@/model/userModel";
import { z } from "zod";
import {
  usernameValidation,
} from "../../../schemas/signUpSchemas";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    console.log("Full URL:", request.url);
    console.log("searchParams-----------------");
    console.log(searchParams);
    const userName = { username: searchParams.get("username") };
    // validation
    console.log("username-----------------");
    console.log(userName);
    const result = UsernameQuerySchema.safeParse(userName);
    console.log("result-----------------");
    console.log(result); // TODO: remove this
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      console.log("usernameError-----------------");
      console.log(usernameError)
      return Response.json(
        {
          success: false,
          message: usernameError,
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    console.log(username);
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    console.log(existingVerifiedUser);
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }
    // console.log("object")
    return Response.json(
      {
        success: true,
        message: `${username} is available`,
      },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.log("Error in checkUsernameUnique", error);
    return Response.json({
      success: false,
      message: "Error in checking username",
    });
  }
}
