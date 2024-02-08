// import type { NextApiRequest } from "next";
import { createUser } from "@/app/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

// Ganti NextApiRequest menjadi NextRequest
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    // const body = await req.text();
    // const body = JSON.parse(bodyText);
    const { fullName, email, password } = body;

    await createUser(fullName, email, password);

    return NextResponse.json({ status: true, message: "success" });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({
      status: false,
      message: "Invalid request body",
    });
  }
};
