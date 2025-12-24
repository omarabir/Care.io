import { NextResponse } from "next/server";
import { getAllServices } from "@/lib/db";

export async function GET() {
  try {
    const services = await getAllServices();

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error("Services fetch error:", error);
    return NextResponse.json(
      { message: "Services load করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
