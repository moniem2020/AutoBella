import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Get the selected plan details
        const plans: Record<string, { name: string; washes: string; price: string }> = {
            basic: { name: 'Basic Plan', washes: '3 washes', price: 'EGP 540' },
            plus: { name: 'Plus Plan', washes: '4 washes', price: 'EGP 720' },
            elite: { name: 'Elite Plan', washes: '6 washes', price: 'EGP 1050' },
        };

        const selectedPlan = plans[data.membership as keyof typeof plans];

        // Format the message for WhatsApp
        const message = `🎫 *New Membership Registration*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
${data.email ? `📧 *Email:* ${data.email}\n` : ''}📍 *Area:* ${data.area}
💎 *Selected Plan:* ${selectedPlan.name}
   ${selectedPlan.washes} - ${selectedPlan.price}`;

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
                    <h2>New Membership Registration</h2>
                    <p><strong>Booking ID:</strong> #${data.bookingId}</p>
                    <hr style="margin: 20px 0; border: 1px solid #C9A961;" />
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                    <p><strong>Selected Plan:</strong> ${selectedPlan.name}</p>
                    <p><strong>Details:</strong> ${selectedPlan.washes} - ${selectedPlan.price}</p>
                `;

                const info = await transporter.sendMail({
                    from: `"AutoBella Memberships" <${gmailUser}>`,
                    to: 'autobella.cars@gmail.com',
                    subject: `New Membership - ${selectedPlan.name} - ${data.name}`,
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

        console.log('Membership registration received:', data);
        console.log('WhatsApp message:', message);

        return NextResponse.json({
            success: true,
            message: 'Membership registration received successfully',
            whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        });

    } catch (error) {
        console.error('Error processing membership:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process membership registration' },
            { status: 500 }
        );
    }
}


