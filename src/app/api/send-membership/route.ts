import { NextRequest, NextResponse } from 'next/server';

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

        // --- FREE WHATSAPP NOTIFICATION (CallMeBot) ---
        const apiKey = process.env.CALLMEBOT_API_KEY;

        if (apiKey) {
            try {
                // Encode the message for URL
                const encodedMessage = encodeURIComponent(message);
                const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${whatsappNumber}&text=${encodedMessage}&apikey=${apiKey}`;

                // Send the request to CallMeBot
                const notificationResponse = await fetch(callMeBotUrl);

                if (notificationResponse.ok) {
                    console.log('WhatsApp notification sent via CallMeBot');
                } else {
                    console.error('Failed to send WhatsApp notification via CallMeBot');
                }
            } catch (notifyError) {
                console.error('Error sending WhatsApp notification:', notifyError);
            }
        } else {
            console.log('CALLMEBOT_API_KEY not found. Skipping automatic WhatsApp notification.');
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
