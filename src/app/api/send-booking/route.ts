import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Format the message for WhatsApp
        const message = `🚗 *New Booking Request*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
${data.email ? `📧 *Email:* ${data.email}\n` : ''}🚙 *Car Type:* ${data.carType}
📍 *Area:* ${data.area}
🏠 *Address:* ${data.address}
✨ *Service:* ${data.service}
📅 *Date:* ${data.date}
⏰ *Time:* ${data.timeSlot}
${data.notes ? `📝 *Notes:* ${data.notes}` : ''}`;

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
                // We don't block the success response if notification fails
            }
        } else {
            console.log('CALLMEBOT_API_KEY not found. Skipping automatic WhatsApp notification.');
        }
        // ----------------------------------------------

        console.log('Booking received:', data);
        console.log('WhatsApp message:', message);

        return NextResponse.json({
            success: true,
            message: 'Booking received successfully',
            whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        });

    } catch (error) {
        console.error('Error processing booking:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process booking' },
            { status: 500 }
        );
    }
}
