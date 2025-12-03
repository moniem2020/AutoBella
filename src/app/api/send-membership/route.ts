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
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #C9A961; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">💎 New Membership Registration</h2>
                        
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
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Selected Plan:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #C9A961; font-weight: bold;">${selectedPlan.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Plan Details:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${selectedPlan.washes} - ${selectedPlan.price}</td>
                                </tr>
                                ${data.area ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Area:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.area}</td>
                                </tr>` : ''}
                                ${data.address ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.address}</td>
                                </tr>` : ''}
                                ${data.carType ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Type:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.carType}</td>
                                </tr>` : ''}
                                ${data.carBrand ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Brand:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.carBrand}</td>
                                </tr>` : ''}
                                ${data.carColor ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Color:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.carColor}</td>
                                </tr>` : ''}
                                ${data.plateLetters && data.plateNumbers ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>License Plate:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.plateLetters} ${data.plateNumbers}</td>
                                </tr>` : ''}
                                ${data.paymentMethod ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Payment Method:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.paymentMethod}</td>
                                </tr>` : ''}
                                ${data.date ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Preferred Date:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.date}</td>
                                </tr>` : ''}
                                ${data.timeSlot ? `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Preferred Time:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.timeSlot}</td>
                                </tr>` : ''}
                            </table>
                        </div>
                        
                        <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
                            This is an automated message from AutoBella Website
                        </p>
                    </div>
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


