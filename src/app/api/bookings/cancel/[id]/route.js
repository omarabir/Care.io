import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getBookingById, cancelBooking } from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "অনুগ্রহ করে login করুন" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Check if booking exists and belongs to user
    const booking = await getBookingById(id);

    if (!booking) {
      return NextResponse.json(
        { message: "Booking পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    if (booking.userId !== session.user.id) {
      return NextResponse.json(
        { message: "আপনি এই booking cancel করতে পারবেন না" },
        { status: 403 }
      );
    }

    if (booking.status === "Cancelled") {
      return NextResponse.json(
        { message: "এই booking ইতিমধ্যে cancel করা হয়েছে" },
        { status: 400 }
      );
    }

    if (booking.status === "Completed") {
      return NextResponse.json(
        { message: "Completed booking cancel করা যায় না" },
        { status: 400 }
      );
    }

    await cancelBooking(id);

    return NextResponse.json(
      { message: "Booking cancel করা হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cancel booking error:", error);
    return NextResponse.json(
      { message: "Booking cancel করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
