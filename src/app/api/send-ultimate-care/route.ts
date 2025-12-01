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
                    <h2 style="color: #C9A961;">New Ultimate Care Booking</h2>
                    <p><strong>Booking ID:</strong> ${data.bookingId}</p>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                    <p><strong>Car Type:</strong> ${data.carType}</p>
                    <p><strong>Car Brand:</strong> ${data.carBrand}</p>
                    <p><strong>Car Color:</strong> ${data.carColor}</p>
                    <p><strong>License Plate:</strong> ${data.plateLetters} ${data.plateNumbers}</p>
                    <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
                    <p><strong>Date:</strong> ${data.date}</p>
                    <p><strong>Time:</strong> ${data.timeSlot}</p>
                    <p><strong>Service:</strong> ${data.serviceLabel}</p>
                    <p><strong>Area:</strong> ${data.area}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                    ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
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
