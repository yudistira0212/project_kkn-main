import { checkUser } from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";
// import type { User } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

export const GET = async () => {
  try {
    const user = (await checkUser()) as FirebaseUser | null;

    console.log("user api", user?.email);

    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ user });
    }
  } catch (error: any) {
    console.error("Error checking user login:", error.message);
    return NextResponse.json({ error: "Internal Server Error" });
  }
};
