import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { ICartItem } from '@/lib/types';
import { fetchOrdersFromStripe } from '@/tools';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const pageParam = url.searchParams.get('pageParam');

  if (!userId) return;

  const orders = await fetchOrdersFromStripe(
    userId,
    pageParam ? pageParam : '',
  );

  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  try {
    const body: {
      items: ICartItem[];
      total: number;
      userId: string;
    } = await req.json();
    const existingCustomers = await stripe.customers.search({
      query: `metadata["userId"]:"${body.userId}"`,
      limit: 1,
    });

    let customer;

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        metadata: { userId: body.userId },
      });
    }

    const invoice = await stripe.invoices.create({
      currency: 'usd',
      customer: customer.id,
    });

    stripe.invoices.update(invoice.id, {
      metadata: {
        userId: body.userId,
      },
    });

    body.items.forEach(async item => {
      await stripe.invoiceItems.create({
        invoice: invoice.id,
        customer: customer.id,
        description: `${item.name} x${item.amount}`,
        amount: item.price * 100 * item.amount,
        metadata: {
          id: item.id,
          image: item.images?.data ? item?.images?.data[0]?.attributes.url : '',
          gender: item?.gender?.data?.attributes.name || '',
          size: item?.selectedSize.toString(),
          quantity: item.amount,
          name: item.name,
        },
      });
    });

    return NextResponse.json({
      id: invoice.id,
      customer: customer.id,
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: {
      invoiceId: string;
      paymentType: string;
      orderId: string;
    } = await req.json();

    await stripe.invoices.update(body.invoiceId, {
      shipping_cost: {
        shipping_rate_data: {
          display_name: 'Rate',
          fixed_amount: { amount: 2000, currency: 'usd' },
          type: 'fixed_amount',
        },
      },
      metadata: {
        orderId: body.orderId,
        paymentMethod: body.paymentType,
      },
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(
      body.invoiceId,
      { auto_advance: false },
    );

    return NextResponse.json({
      invoice: finalizedInvoice,
    });
  } catch (error) {
    console.error('Error finalizing invoice:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
