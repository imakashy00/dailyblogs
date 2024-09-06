import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import { UserModel, JournalModel } from "@/model/userModel";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { create } from "domain";

//GET request to get all the journals having provided tag
export async function GET(request: NextRequest) {
  // console.log("request recieved-------------------")
  //get the session of the user
  const session = await getServerSession(authOptions);
  //if the user is not authenticated return 401 status code
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "UnAuthenticated" },
      { status: 401 }
    );
  }
  // get the tag from the request url
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  // console.log(tag)
  if (!tag) { 
    return Response.json({ message: "Tag is required" }, { status: 400 });
  }
  //connect to the database
  await dbConnect();
  //get the user from the session
  const user = session.user as User;
  const journals = await JournalModel.find({ tag }, { user: 0 }).sort({
    createdAt: -1,
  });
  if (!journals) {
    return Response.json({ message: "No journal found" }, { status: 404 });
  }
  return Response.json({ success: true, journals }, { status: 200 });
}
