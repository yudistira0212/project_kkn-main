import { logoutUser } from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await logoutUser();
    return NextResponse.json({ message: "Berhasil Logout" });
  } catch (error: any) {
    console.error("Error logging out:", error);
    return NextResponse.json({ message: error.message });
  }
};
