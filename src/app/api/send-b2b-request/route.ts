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
                    <h2>New B2B Quote Request</h2>
                    <p><strong>Booking ID:</strong> #${data.bookingId}</p>
                    <hr style="margin: 20px 0; border: 1px solid #C9A961;" />
                    <p><strong>Business/Entity Name:</strong> ${data.businessName}</p>
                    <p><strong>Contact Person:</strong> ${data.contactName}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                    <p><strong>Business Type:</strong> ${data.businessType}</p>
                    <p><strong>Area:</strong> ${data.area}</p>
                    <p><strong>Location:</strong> ${data.location}</p>
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
