import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Format the message for WhatsApp
        const message = `🚗 *New Booking Request*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
${data.email ? `📧 *Email:* ${data.email}\n` : ''}🚙 *Car Type:* ${data.carType}
📍 *Area:* ${data.area}
🏠 *Address:* ${data.address}
✨ *Service:* ${data.service}
📅 *Date:* ${data.date}
⏰ *Time:* ${data.timeSlot}
${data.notes ? `📝 *Notes:* ${data.notes}` : ''}`;

        // Your WhatsApp number
        const whatsappNumber = '201009441336';

        // --- EMAIL NOTIFICATION via Resend ---
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey) {
            console.log('Attempting to send email notification with Resend...');
            try {
                const resend = new Resend(resendApiKey);

                const emailHtml = `
                    <h2>New Booking Request</h2>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                    <p><strong>Car Type:</strong> ${data.carType}</p>
                    <p><strong>Area:</strong> ${data.area}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                    <p><strong>Service:</strong> ${data.service}</p>
                    <p><strong>Date:</strong> ${data.date}</p>
                    <p><strong>Time:</strong> ${data.timeSlot}</p>
                    ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
                `;

                const emailResult = await resend.emails.send({
                    from: 'AutoBella Bookings <onboarding@resend.dev>',
                    to: 'moniemghazal@gmail.com',
                    subject: `New Booking - ${data.name}`,
                    html: emailHtml,
                });

                console.log('Email notification sent via Resend. ID:', emailResult.data?.id);
            } catch (emailError) {
                console.error('Error sending email notification:', emailError);
                // We don't block the success response if email fails
            }
        } else {
            console.warn('WARNING: RESEND_API_KEY environment variable is missing. Email notification will NOT be sent.');
        }
        // ----------------------------------------------

        console.log('Booking received:', data);
        console.log('WhatsApp message:', message);

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

