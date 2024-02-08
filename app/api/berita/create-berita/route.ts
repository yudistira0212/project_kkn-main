import { createBerita } from "@/app/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
interface firebaseData {
  title: string;
  content: string;
  img1: File;
  img2?: File;
  img3?: File;
  coments?: string;
}

export const POST = async (req: NextRequest) => {
  try {
    // Baca isi dari body permintaan dan konversi menjadi string
    const dataBerita: FormData | any = await req.text();

    console.log("Data yang diterima:", dataBerita);

    await createBerita(dataBerita, (success: any, message: any) => {
      if (success) {
        return NextResponse.json({ message });
      } else {
        return NextResponse.json({ message });
      }
    });
  } catch (error: any) {
    // Tangani kesalahan jika terjadi
    console.log("Internal server error:", error);
    return NextResponse.json({ "internal server error": error });
  }
};
