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
        const message = `🌟 *Service Evaluation Received*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
📢 *How they heard about us:* ${data.howHeard}
⭐ *Service Quality:* ${data.quality}
📊 *Rating:* ${data.rating}/10
${data.review ? `💬 *Review:* ${data.review}` : ''}`;

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
                    <h2 style="color: #C9A961;">Service Evaluation Received</h2>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    <p><strong>How they heard about us:</strong> ${data.howHeard}</p>
                    <p><strong>Service Quality:</strong> ${data.quality}</p>
                    <p><strong>Rating:</strong> ${data.rating}/10</p>
                    ${data.review ? `<p><strong>Review:</strong> ${data.review}</p>` : ''}
                </div>
            `;

            const info = await transporter.sendMail({
                from: `"AutoBella Feedback" <${gmailUser}>`,
                to: 'autobella.cars@gmail.com',
                subject: `Service Evaluation - ${data.quality} - ${data.name}`,
                html: emailHtml,
            });

            console.log('Email sent:', info.messageId);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing evaluation:', error);
        return NextResponse.json(
            { error: 'Failed to process evaluation' },
            { status: 500 }
        );
    }
}
