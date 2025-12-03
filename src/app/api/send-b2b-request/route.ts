import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Your WhatsApp number
        const whatsappNumber = '201009441336';

        // --- EMAIL NOTIFICATION via Nodemailer (Gmail) ---
        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_APP_PASSWORD;

        if (gmailUser && gmailPass) {
            console.log('Attempting to send B2B request email notification with Nodemailer...');
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
                        <h2 style="color: #C9A961; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">🏢 New B2B Quote Request</h2>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                            <p style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Booking ID: #${data.bookingId}</p>
                            
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Business Name:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.businessName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Contact Person:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.contactName}</td>
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
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Business Type:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #C9A961; font-weight: bold;">${data.businessType}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Area:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.area}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.location}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
                            This is an automated message from AutoBella Website
                        </p>
                    </div>
                `;

                const info = await transporter.sendMail({
                    from: `"AutoBella B2B Requests" <${gmailUser}>`,
                    to: 'autobella.cars@gmail.com',
                    subject: `New B2B Request - ${data.businessType} - ${data.businessName}`,
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

        console.log('B2B request received:', data);

        return NextResponse.json({
            success: true,
            message: 'B2B request received successfully',
        });

    } catch (error) {
        console.error('Error processing B2B request:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process B2B request' },
            { status: 500 }
        );
    }
}
