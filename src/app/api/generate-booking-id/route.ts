import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { type } = await request.json();

        let bookingId: string;

        switch (type) {
            case 'booking':
                // Increment booking counter (starts at 109)
                const bookingCounter = await kv.incr('booking_counter');
                // If this is the first time, set it to 109
                if (bookingCounter === 1) {
                    await kv.set('booking_counter', 109);
                    bookingId = '109';
                } else {
                    bookingId = bookingCounter.toString();
                }
                break;

            case 'membership':
                // Increment membership counter (starts at 17, prefix with M)
                const membershipCounter = await kv.incr('membership_counter');
                if (membershipCounter === 1) {
                    await kv.set('membership_counter', 17);
                    bookingId = 'M17';
                } else {
                    bookingId = `M${membershipCounter}`;
                }
                break;

            case 'b2b':
                // Increment B2B counter (starts at 3, prefix with B)
                const b2bCounter = await kv.incr('b2b_counter');
                if (b2bCounter === 1) {
                    await kv.set('b2b_counter', 3);
                    bookingId = 'B3';
                } else {
                    bookingId = `B${b2bCounter}`;
                }
                break;

            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid type' },
                    { status: 400 }
                );
        }

        return NextResponse.json({
            success: true,
            bookingId,
        });

    } catch (error) {
        console.error('Error generating booking ID:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate booking ID' },
            { status: 500 }
        );
    }
}
