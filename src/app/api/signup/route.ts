import dbConnect from "@/lib/dbConnect";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Email already taken",
        },
        { status: 400 }
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 3600000);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser && !existingUser.isVerified) {
      existingUser.password = hashedPassword;
      existingUser.verifyCode = verifyCode;
      existingUser.verifyCodeExpiry = verifyCodeExpiry;
      await existingUser.save();
    } else {
      const newUser = await User.create({
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
      });
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verfiy your account",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
