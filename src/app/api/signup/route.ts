import dbConnect from "@/lib/db";
import { UserModel } from "@/model/userModel";
import bcrytjs from "bcryptjs";
import { sendVerificationMail } from "@/utils/sendVerificatioMail";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json(); // always apply await to request.json() to get the data

    // Always query the database using await
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return NextResponse.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }
    // check if username alredy exist return username taken
    const existingUserbyEmail = await UserModel.findOne({ email });

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    if (existingUserbyEmail) {
      if (existingUserbyEmail.isVerified) {
        return NextResponse.json(
          { success: false, message: "Email already exist" },
          { status: 400 }
        );
      }
      else{
        const hashedPassword = await bcrytjs.hash(password, 10);
        existingUserbyEmail.password = hashedPassword;
        existingUserbyEmail.verifyToken = verificationToken;
        existingUserbyEmail.verifyTokenExpiry = new Date(new Date().getTime() + 3600000);
        await existingUserbyEmail.save();
      }
    } else {
      const hashedPassword = await bcrytjs.hash(password, 10);
      const expiryDate = new Date(); // const is editable because it gets an object from the new Date() method and object create reference in memory which is editable
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyToken: verificationToken,
        verifyTokenExpiry: expiryDate,
        isVerified: false,
        journals: [],
      });
      await newUser.save(); // always apply await to save() method to save the data
    }

    //send email verification
    const emailResponse = await sendVerificationMail(email, verificationToken, username);
    console.log(emailResponse)

    if (!emailResponse.success) {
      return NextResponse.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, message: "User registered succesfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
