import dbConnect from "@/lib/dbConnect";
import User from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, code } = await request.json();
    const decodedEmail = decodeURIComponent(email);

    const user = await User.findOne({ email: decodedEmail });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification code expired. Signup again to get a new code",
        },
        { status: 400 }
      );
    }

    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    await user.save();
    // await User.updateOne(
    //   { email: decodedEmail },
    //   {
    //     $set: { isVerified: true },
    //     $unset: { verifyCode: 1, verifyCodeExpiry: 1 },
    //   }
    // );

    return Response.json(
      {
        success: true,
        message: "Account verified successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    );
  }
}
