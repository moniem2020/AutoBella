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
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #C9A961; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">🚗 New Booking Request</h2>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                            <p style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Booking ID: #${data.bookingId}</p>
                            
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="tel:${data.phone}">${data.phone}</a></td>
                                </tr>
                                ${data.email ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.email}</td>
                                </tr>` : ''}
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Type:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.carType}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Brand:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.carBrand}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Color:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.carColor}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>License Plate:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.plateLetters} ${data.plateNumbers}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Payment Method:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Area:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.area}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.address}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #C9A961; font-weight: bold;">${data.service}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.date}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Time:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.timeSlot}</td>
                                </tr>
                                ${data.notes ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Notes:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.notes}</td>
                                </tr>` : ''}
                            </table>
                        </div>
                        
                        <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
                            This is an automated message from AutoBella Website
                        </p>
                    </div>
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


