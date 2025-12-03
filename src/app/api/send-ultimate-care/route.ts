import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const gmailUser = process.env.GMAIL_USER;
        const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

        if (!gmailUser || !gmailAppPassword) {
            return NextResponse.json(
                { error: 'Email configuration missing' },
                { status: 500 }
            );
        }

        // WhatsApp message
        const message = `🌟 *New Ultimate Care Booking*

📋 *Booking ID:* ${data.bookingId}
👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
${data.email ? `📧 *Email:* ${data.email}\n` : ''}🚗 *Car Type:* ${data.carType}
🏷️ *Car Brand:* ${data.carBrand}
🎨 *Car Color:* ${data.carColor}
🔢 *License Plate:* ${data.plateLetters} ${data.plateNumbers}
💳 *Payment Method:* ${data.paymentMethod}
📅 *Date:* ${data.date}
⏰ *Time:* ${data.timeSlot}
🛠️ *Service:* ${data.serviceLabel}
📍 *Area:* ${data.area}
🏠 *Address:* ${data.address}
${data.notes ? `📝 *Notes:* ${data.notes}` : ''}`;

        // Send WhatsApp message
        const whatsappPhone = '201556028198';
        const whatsappApiKey = process.env.CALLMEBOT_API_KEY;

        if (whatsappApiKey) {
            const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${encodeURIComponent(message)}&apikey=${whatsappApiKey}`;

            try {
                await fetch(whatsappUrl);
            } catch (whatsappError) {
                console.error('WhatsApp notification failed:', whatsappError);
            }
        }

        // Send Email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailAppPassword,
                },
            });

            const emailHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #C9A961; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">🌟 New Ultimate Care Booking</h2>
                    
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
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #C9A961; font-weight: bold;">${data.serviceLabel}</td>
                            </tr>
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
                from: `"AutoBella Ultimate Care" <${gmailUser}>`,
                to: 'autobella.cars@gmail.com',
                subject: `New Ultimate Care Booking - ${data.serviceLabel} - ${data.name}`,
                html: emailHtml,
            });

            console.log('Email sent:', info.messageId);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing Ultimate Care booking:', error);
        return NextResponse.json(
            { error: 'Failed to process booking' },
            { status: 500 }
        );
    }
}
