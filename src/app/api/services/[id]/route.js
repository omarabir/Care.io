import { NextResponse } from "next/server";
import { getServiceById } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const service = await getServiceById(id);

    if (!service) {
      return NextResponse.json(
        { message: "Service পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error("Service fetch error:", error);
    return NextResponse.json(
      { message: "Service load করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
