import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Format the message for WhatsApp (still used for redirect)
        const message = `🚗 *New Booking Request*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
${data.email ? `📧 *Email:* ${data.email}\n` : ''}🚙 *Car Type:* ${data.carType}
🏷️ *Car Brand:* ${data.carBrand}
🎨 *Car Color:* ${data.carColor}
🔢 *License Plate:* ${data.plateLetters} ${data.plateNumbers}
💳 *Payment Method:* ${data.paymentMethod}
📍 *Area:* ${data.area}
🏠 *Address:* ${data.address}
✨ *Service:* ${data.service}
📅 *Date:* ${data.date}
⏰ *Time:* ${data.timeSlot}
${data.notes ? `📝 *Notes:* ${data.notes}` : ''}`;

        // Your WhatsApp number
        const whatsappNumber = '201009441336';

        // --- EMAIL NOTIFICATION via Nodemailer (Gmail) ---
        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_APP_PASSWORD;

        if (gmailUser && gmailPass) {
            console.log('Attempting to send email notification with Nodemailer...');
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: gmailUser,
                        pass: gmailPass,
                    },
                });

                const emailHtml = `
                    <h2>New Booking Request</h2>
                    <p><strong>Booking ID:</strong> #${data.bookingId}</p>
                    <hr style="margin: 20px 0; border: 1px solid #C9A961;" />
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                    <p><strong>Car Type:</strong> ${data.carType}</p>
                    <p><strong>Car Brand:</strong> ${data.carBrand}</p>
                    <p><strong>Car Color:</strong> ${data.carColor}</p>
                    <p><strong>License Plate:</strong> ${data.plateLetters} ${data.plateNumbers}</p>
                    <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
                    <p><strong>Area:</strong> ${data.area}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                    <p><strong>Service:</strong> ${data.service}</p>
                    <p><strong>Date:</strong> ${data.date}</p>
                    <p><strong>Time:</strong> ${data.timeSlot}</p>
                    ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
                `;

                const info = await transporter.sendMail({
                    from: `"AutoBella Bookings" <${gmailUser}>`,
                    to: 'autobella.cars@gmail.com',
                    subject: `New Booking - ${data.name}`,
                    html: emailHtml,
                });

                console.log('Email notification sent via Nodemailer. MessageId:', info.messageId);
            } catch (emailError) {
                console.error('Error sending email notification:', emailError);
            }
        } else {
            console.warn('WARNING: GMAIL_USER or GMAIL_APP_PASSWORD environment variable is missing. Email notification will NOT be sent.');
        }
        // ----------------------------------------------

        console.log('Booking received:', data);

        return NextResponse.json({
            success: true,
            message: 'Booking received successfully',
            whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        });

    } catch (error) {
        console.error('Error processing booking:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process booking' },
            { status: 500 }
        );
    }
}


