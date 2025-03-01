import dbConnect from "@/lib/dbConnect";
import Resume from "@/model/resume.model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resumeid: string }> }
) {
  await dbConnect();

  try {
    const { resumeid } = await params;

    const resume = await Resume.findById(resumeid);

    if (!resume) {
      return Response.json(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Resume fetched successfully",
        resume,
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
