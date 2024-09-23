import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import { JournalModel } from "@/model/userModel";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import getMood from "./getMood";

//Post request to save the journal in JournalModel collection of database
export async function POST(request: NextRequest) {
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
  console.log(user.email);
  //get the journal from the request body
  const { tag, content } = await request.json();
  // console.log("--------------JOURNAL--------------");
  console.log(tag, content);

  // code for getting the mood from gemini
  const mood:string = (await getMood(content)).trim();
  console.log(mood);

  //create a new journal object
  const newJournal = new JournalModel({
    tag,
    content,
    mood,
    createdAt: new Date().toDateString(),
    user: user._id,
  });
  // if journal already exists update the journal else create a new journal
  const journal = await JournalModel.findOne({
    createdAt: new Date().toDateString(),
    user: user._id,
  });
  if (journal) {
    await JournalModel.updateOne(
      { _id: journal._id },
      { tag, content, mood, createdAt: new Date().toDateString(), user: user._id }
    );
  } else {
    await newJournal.save();
  }
  //return success message
  return Response.json({
    success: true,
    message: "Journal saved successfully",
  });
}

// GET request to get a particular journal asked by the user
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
  //get searchParams from the request url;
  const { searchParams } = new URL(request.url);
  //get the id of the journal from the searchParams
  const journalDate = searchParams.get("date");
  // console.log("Journal date-------------");
  console.log(journalDate);
  if (!journalDate) {
    return Response.json(
      { message: "Journal date is required" },
      { status: 400 }
    );
  }
  //connect to the database
  await dbConnect();
  //find the journal by where date is as provided
  const journal = await JournalModel.findOne({
    createdAt: journalDate,
    user: session.user._id,
  });
  // const journal = await JournalModel.findOne({_id:journalId,user:session.user._id});
  //if journal is not found return 404 status code
  if (journal) {
    console.log(
      "Journal found------------------------------------------------------"
    );
    console.log(journal);
    return Response.json({ success: true, journal });
  } else if (
    new Date(journalDate) <= new Date() &&
    new Date(journalDate) >= new Date("2024-09-01")
  ) {
    // fill the journal in databse with the current date
    const newJournal = new JournalModel({
      tag: "skipped",
      content: "[]",
      mood: "idk",
      createdAt: new Date(journalDate).toDateString(),
      user: session.user._id,
    });
    await newJournal.save();
    // refresh thes database
    // await dbConnect();
    //find the journal by where date is as provided
    const sameJournal = await JournalModel.findOne({
      createdAt: journalDate,
      user: session.user._id,
    });

    return Response.json({ success: true, journal: sameJournal });
  } else {
    return Response.json(
      { success: false, message: "Journal not found" },
      { status: 404 }
    );
  }
}
