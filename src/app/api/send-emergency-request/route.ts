import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const {
            bookingId,
            name,
            phone,
            emergencyType,
            area,
            carType,
            paymentMethod
        } = data;

        // Create Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email Content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'moniemghazal@gmail.com',
            subject: `🚨 Emergency Request #${bookingId} - ${emergencyType}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">🚨 New Emergency Request</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Booking ID: #${bookingId}</p>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Emergency Type:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #dc2626; font-weight: bold;">${emergencyType}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Area:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${area}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Type:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${carType}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Payment Method:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${paymentMethod}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
                        This is an automated message from AutoBella Website
                    </p>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        // Prepare WhatsApp Message
        const whatsappMessage = `🚨 *New Emergency Request* 🚨%0a%0a` +
            `🆔 *ID:* ${bookingId}%0a` +
            `👤 *Name:* ${name}%0a` +
            `📱 *Phone:* ${phone}%0a` +
            `⚠️ *Type:* ${emergencyType}%0a` +
            `📍 *Area:* ${area}%0a` +
            `🚗 *Car Type:* ${carType}%0a` +
            `💳 *Payment:* ${paymentMethod}%0a` +
            `%0aPlease contact the client immediately for location details!`;

        return NextResponse.json({
            success: true,
            whatsappUrl: `https://wa.me/201000000000?text=${whatsappMessage}` // Replace with actual admin number if needed
        });

    } catch (error) {
        console.error('Error processing emergency request:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
