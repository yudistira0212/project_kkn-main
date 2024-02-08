import { loginUser } from "@/app/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    // console.log({ email, password });
    // Login user
    await loginUser(email, password);

    // Jika login berhasil
    return NextResponse.json({ status: true, message: "success" });
  } catch (error: any) {
    console.error("Error during login:", error.message);

    // Jika login gagal
    return NextResponse.json({
      status: false,
      message: "Invalid request body",
      error: error.message,
    });
  }
};
