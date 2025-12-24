import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendBookingInvoiceEmail(bookingDetails) {
  const { 
    userEmail, 
    userName, 
    serviceName, 
    duration, 
    location, 
    totalCost, 
    bookingId,
    address 
  } = bookingDetails;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .invoice-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; 
                      border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #667eea; }
        .total-cost { font-size: 24px; color: #764ba2; font-weight: bold; text-align: center; 
                      padding: 20px; background: #f0f0f0; border-radius: 8px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Care.xyz থেকে আপনার booking সফল হয়েছে</p>
        </div>
        
        <div class="content">
          <h2>প্রিয় ${userName},</h2>
          <p>আপনার service booking সফলভাবে সম্পন্ন হয়েছে। নিচে আপনার booking এর বিস্তারিত তথ্য দেওয়া হলো:</p>
          
          <div class="invoice-details">
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span>${bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span>${serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duration:</span>
              <span>${duration}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location:</span>
              <span>${location}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Address:</span>
              <span>${address}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span style="color: orange; font-weight: bold;">Pending</span>
            </div>
          </div>
          
          <div class="total-cost">
            Total Cost: ৳${totalCost}
          </div>
          
          <p style="margin-top: 30px;">আমাদের team শীঘ্রই আপনার সাথে যোগাযোগ করবে এবং আপনার booking confirm করবে।</p>
          
          <p>ধন্যবাদ Care.xyz ব্যবহার করার জন্য! ❤️</p>
        </div>
        
        <div class="footer">
          <p>© 2024 Care.xyz. All rights reserved.</p>
          <p>যদি কোনো সমস্যা হয় তাহলে আমাদের সাথে যোগাযোগ করুন: support@care.xyz</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `Booking Confirmation - ${serviceName} | Care.xyz`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Invoice email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}