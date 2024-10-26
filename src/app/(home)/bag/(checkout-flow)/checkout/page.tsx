'use client';

import { useQueryCartItems } from '@/tools';
import { Container } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

import SummarySectionSkeleton from '@/components/ui/loading-skeletons/SummarySectionSkeleton';
import { ICartItem } from '@/lib/types';
import { bagPageStyles as styles } from '@/styles/bag/bag.style';
import CheckoutForm from './components/CheckoutForm';
import CheckoutFormSkeleton from './components/CheckoutFormSkeleton';
import EmptyPage from './components/EmptyPage';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const { data: session } = useSession();
  const { data: cart = [], isLoading } = useQueryCartItems(session?.user?.id);
  const [staticCart, setStaticCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    if (cart.length > 0) {
      setStaticCart(cart);
    }
  }, [cart]);

  const total = useMemo(
    () =>
      +staticCart
        .reduce((total: number, item) => total + item.price * item.amount, 0)
        .toFixed(2),
    [staticCart],
  );

  useEffect(() => {
    if (
      !staticCart.length ||
      !total ||
      !session?.user ||
      clientSecret ||
      orderId
    )
      return;

    const payload = {
      items: staticCart,
      total: total + 20,
      userId: session?.user.id,
    };
    const headers = { 'Content-Type': 'application/json' };

    axios
      .post('/api/orders', payload, {
        headers,
      })
      .then(createInvoiceRes => {
        setInvoiceId(createInvoiceRes.data.id);
        axios
          .post(
            '/api/create-payment-intent',
            {
              total: total,
              userId: session?.user.id,
              customerId: createInvoiceRes.data.customer,
              invoiceId: createInvoiceRes.data.id,
            },
            {
              headers,
            },
          )
          .then(createPaymentIntentRes => {
            setClientSecret(createPaymentIntentRes.data.clientSecret);
            setOrderId(createPaymentIntentRes.data.id);
          });
      })
      .catch(error => {
        console.error('Error creating payment intent:', error);
      });
  }, [staticCart, total, session?.user, clientSecret, orderId]);

  const appearance: { theme: 'stripe' | 'night' | 'flat' | undefined } = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
    locale: 'en',
  };

  return staticCart.length > 0 || isLoading ? (
    <Container component={'main'} maxWidth="xl" sx={styles.main}>
      {(!clientSecret || !session) && (
        <>
          <CheckoutFormSkeleton />
          <SummarySectionSkeleton />
        </>
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} invoiceId={invoiceId} />
        </Elements>
      )}
    </Container>
  ) : (
    <EmptyPage />
  );
}
