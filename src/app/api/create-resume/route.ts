import dbConnect from "@/lib/dbConnect";
import Resume from "@/model/resume.model";
import User from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { id, resumeName } = await request.json();
    const newResume = await Resume.create({ resumeName });

    if (!newResume) {
      return Response.json(
        {
          status: false,
          message: "Error creating resume",
        },
        { status: 500 }
      );
    }

    const user = await User.findByIdAndUpdate(id, {
      $push: { resumes: newResume._id },
    });

    if (!user) {
      return Response.json(
        {
          status: false,
          message: "Error adding resume",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        status: true,
        message: "Resume created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        status: false,
        message: "Error creating resume",
        error: error,
      },
      { status: 500 }
    );
  }
}
