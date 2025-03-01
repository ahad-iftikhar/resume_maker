import dbConnect from "@/lib/dbConnect";
import Resume from "@/model/resume.model";

export async function PATCH(request: Request) {
  await dbConnect();

  try {
    const { resumeId, data } = await request.json();

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { $set: data },
      { new: true }
    );

    if (!updatedResume) {
      return Response.json(
        {
          status: false,
          message: "Error updating resume",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        status: true,
        message: "Resume updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    Response.json(
      {
        status: false,
        message: "Failed to update resume",
      },
      { status: 500 }
    );
  }
}
