import { ICartItem } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body: { items: ICartItem[]; total: number; user: any } =
      await req.json();
    const { email, id } = body.user;

    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        metadata: { userId: id },
      });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.total * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      customer: customer.id,
      metadata: customer.metadata,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
