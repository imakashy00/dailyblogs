import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import { JournalModel } from "@/model/userModel";
import { User } from "next-auth";
import { NextRequest } from "next/server";


// fetch moods from the database
export async function GET(request: NextRequest) {
    // get the searchParams from the request url
    const { searchParams } = new URL(request.url);
    //get the month from the searchParams
    const journalMonth = searchParams.get("month");
    // get the year from the searchParams
    const journalYear = searchParams.get("year");
    // console.log("Journal date-------------");
    console.log(journalMonth, journalYear);
    if (!journalMonth && !journalYear) {
      return Response.json(
        { message: "Journal date is required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json(
        { message: "UnAuthenticated" },
        { status: 401 }
      );
    }
    const user = session.user as User;
    const moods = await JournalModel.find({
      user: user._id,
      $where: `return (new Date(this.createdAt).getMonth() + 1) == ${journalMonth} && new Date(this.createdAt).getFullYear() == ${journalYear}`,
    });
    // return new Response(JSON.stringify(moods), {
    //     status: 200,
    // });
}