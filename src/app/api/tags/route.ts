import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import { UserModel, JournalModel } from "@/model/userModel";
import { User } from "next-auth";
import { NextRequest } from "next/server";

//GET request to get all the tag is as provided
export async function GET(request: NextRequest) {
  //get the session of the user
  const session = await getServerSession(authOptions);
  //if the user is not authenticated return 401 status code
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "UnAuthenticated" },
      { status: 401 }
    );
  }
  //connect to the database
  await dbConnect();
  //get the user from the session
  const user = session.user as User;
  //reurn all the different tags in the database
  const tags = await JournalModel.find({ user: user._id }).distinct("tag");
  return Response.json({ success: true, tags });    
} 

// UPDATE the tags's name of given tag
export async function PUT(request: NextRequest) {
  //get the session of the user
  const session = await getServerSession(authOptions);
  //if the user is not authenticated return 401 status code
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "UnAuthenticated" },
      { status: 401 }
    );
  }
  //connect to the database
  await dbConnect();
  //get the user from the session
  const user = session.user as User;
  //get the tag from the request body
  const {tag,newTag} = await request.json();
  //update the tag name
  await JournalModel.updateMany({ user: user._id, tag }, { tag: newTag });
  return Response.json({ success: true, message: "Tag updated" });
}
