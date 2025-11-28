import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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
${data.email ? `📧 *Email:* ${data.email}\n` : ''}
💎 *Selected Plan:* ${selectedPlan.name}
   ${selectedPlan.washes} - ${selectedPlan.price}`;

        // Your WhatsApp number
        const whatsappNumber = '201009441336';

        // --- EMAIL NOTIFICATION via Resend ---
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey) {
            console.log('Attempting to send email notification with Resend...');
            try {
                const resend = new Resend(resendApiKey);

                const emailHtml = `
                    <h2>New Membership Registration</h2>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                    <p><strong>Selected Plan:</strong> ${selectedPlan.name}</p>
                    <p><strong>Details:</strong> ${selectedPlan.washes} - ${selectedPlan.price}</p>
                `;

                const emailResult = await resend.emails.send({
                    from: 'AutoBella Memberships <onboarding@resend.dev>',
                    to: 'moniemghazal@gmail.com',
                    subject: `New Membership - ${selectedPlan.name} - ${data.name}`,
                    html: emailHtml,
                });

                console.log('Email notification sent via Resend. ID:', emailResult.data?.id);
            } catch (emailError) {
                console.error('Error sending email notification:', emailError);
            }
        } else {
            console.warn('WARNING: RESEND_API_KEY environment variable is missing. Email notification will NOT be sent.');
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

