import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createBooking, getServiceById } from '@/lib/db';
import { sendBookingInvoiceEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'অনুগ্রহ করে login করুন' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      serviceId, 
      duration, 
      durationType,
      division, 
      district, 
      city, 
      area, 
      address 
    } = body;

    // Validation
    if (!serviceId || !duration || !durationType || !division || !district || !city || !area || !address) {
      return NextResponse.json(
        { message: 'সব তথ্য দিতে হবে' },
        { status: 400 }
      );
    }

    // Get service details
    const service = await getServiceById(serviceId);
    if (!service) {
      return NextResponse.json(
        { message: 'Service পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    // Calculate total cost
    const chargePerUnit = durationType === 'hours' ? service.chargePerHour : service.chargePerDay;
    const totalCost = duration * chargePerUnit;

    const location = `${area}, ${city}, ${district}, ${division}`;

    // Create booking
    const bookingData = {
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      serviceId,
      serviceName: service.name,
      duration: `${duration} ${durationType === 'hours' ? 'ঘণ্টা' : 'দিন'}`,
      location,
      address,
      totalCost,
      status: 'Pending'
    };

    const result = await createBooking(bookingData);
    const bookingId = result.insertedId.toString();


    try {
      await sendBookingInvoiceEmail({
        userEmail: session.user.email,
        userName: session.user.name,
        serviceName: service.name,
        duration: bookingData.duration,
        location,
        address,
        totalCost,
        bookingId
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
   
    }

    return NextResponse.json(
      { 
        message: 'Booking সফল হয়েছে',
        bookingId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { message: 'Booking এ সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}