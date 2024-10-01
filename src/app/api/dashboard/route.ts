// write a random route for dashboard

import dbConnect from "@/lib/db";
import { UserModel } from "@/model/userModel";
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    const users = await UserModel.find({}).lean();
    return NextResponse.json(users);
}   