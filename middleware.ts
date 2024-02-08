import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkUser } from "./app/lib/firebase/service";
import axios from "axios";

export const middleware = async (req: NextRequest) => {
  // try {
  //   const userResponse = await fetch(
  //     "http://localhost:3000/api/user/checkUser",
  //     {}
  //   );
  //   if (userResponse.ok) {
  //     const userData = await userResponse.json();
  //     if (userData.user === null) {
  //       return NextResponse.redirect(new URL("/auth/login", req.url));
  //     }
  //     console.log({ user: userData.user });
  //     // Lanjutkan logika middleware Anda jika diperlukan
  //   } else {
  //     console.error("Error checking user:", userResponse.statusText);
  //     return NextResponse.json({ error: "Internal Server Error" });
  //   }
  // } catch (error: any) {
  //   console.error("Error checking user:", error.message);
  //   return NextResponse.json({ error: "Internal Server Error" });
  // }
};

export const config = {
  matcher: ["/admin/dashboard"],
};
