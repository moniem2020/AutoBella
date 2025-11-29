import Redis from 'ioredis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Redis client
// Use REDIS_URL if available (standard), otherwise fall back to KV_URL (Vercel KV)
const redisUrl = process.env.REDIS_URL || process.env.KV_URL;
const redis = redisUrl ? new Redis(redisUrl) : null;

export async function POST(request: NextRequest) {
    if (!redis) {
        console.error('Redis is not configured. Missing REDIS_URL or KV_URL.');
        return NextResponse.json(
            { success: false, error: 'Database configuration error' },
            { status: 500 }
        );
    }

    try {
        const { type } = await request.json();

        let bookingId: string;

        switch (type) {
            case 'booking':
                // Increment booking counter (starts at 109)
                const bookingCounter = await redis.incr('booking_counter');
                // If this is the first time, set it to 109
                if (bookingCounter === 1) {
                    await redis.set('booking_counter', 109);
                    // Reset counter to 109 so next incr is 110
                    // Actually, if we set it to 109, the current one is 109.
                    bookingId = '109';
                } else {
                    bookingId = bookingCounter.toString();
                }
                break;

            case 'membership':
                // Increment membership counter (starts at 17, prefix with M)
                const membershipCounter = await redis.incr('membership_counter');
                if (membershipCounter === 1) {
                    await redis.set('membership_counter', 17);
                    bookingId = 'M17';
                } else {
                    bookingId = `M${membershipCounter}`;
                }
                break;

            case 'b2b':
                // Increment B2B counter (starts at 3, prefix with B)
                const b2bCounter = await redis.incr('b2b_counter');
                if (b2bCounter === 1) {
                    await redis.set('b2b_counter', 3);
                    bookingId = 'B3';
                } else {
                    bookingId = `B${b2bCounter}`;
                }
                break;

            case 'ultimate-care':
                // Increment Ultimate Care counter (prefix with C13)
                const ultimateCareCounter = await redis.incr('ultimate_care_counter');
                bookingId = `C13${ultimateCareCounter}`;
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
