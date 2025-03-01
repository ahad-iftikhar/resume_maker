import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import userModel from "@/model/user.model";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await userModel.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: "resumes",
          localField: "resumes",
          foreignField: "_id",
          as: "resumes",
        },
      },
      { $unwind: { path: "$resumes", preserveNullAndEmptyArrays: true } },
      { $sort: { "resume.createdAt": -1 } },
      { $group: { _id: "$_id", resumes: { $push: "$resumes" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        resumes: user[0].resumes,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "An unexpected error occured",
      },
      { status: 500 }
    );
  }
}
