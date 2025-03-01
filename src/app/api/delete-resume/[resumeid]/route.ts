import dbConnect from "@/lib/dbConnect";
import Resume from "@/model/resume.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import userModel from "@/model/user.model";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ resumeid: string }> }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  try {
    const { resumeid } = await params;
    const resumeId = new mongoose.Types.ObjectId(resumeid);

    if (!resumeid) {
      return Response.json(
        {
          success: true,
          message: "Resume id is required",
        },
        { status: 400 }
      );
    }

    const deletedResume = await Resume.findByIdAndDelete(resumeid);

    if (!deletedResume) {
      return Response.json(
        {
          success: true,
          message: "Error deleting resume",
        },
        { status: 500 }
      );
    }

    const updatedResult = await userModel.updateOne(
      { _id: user._id },
      { $pull: { resumes: resumeid } }
    );

    return Response.json(
      {
        success: true,
        message: "Resume deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: true,
        message: "An unexpected error occoured",
      },
      { status: 500 }
    );
  }
}
