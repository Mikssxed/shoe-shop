import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customer = await stripe.customers.create({
      email: body.user.email,
      metadata: { userId: body.user.id },
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.total * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      customer: customer.id,
    });

    // Return a response using NextResponse
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
