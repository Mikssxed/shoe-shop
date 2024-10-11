'use client';
import { bagPageStyles as styles } from '@/styles/bag/bag.style';
import { useQueryCartItems } from '@/tools';
import { Container } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import CheckoutForm from './components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState('');
  const { data: session } = useSession();
  const { data: cart = [] } = useQueryCartItems(session?.user?.id);

  const total = useMemo(
    () =>
      cart.reduce((total: number, item) => total + item.price * item.amount, 0),
    [cart],
  );

  useEffect(() => {
    if (!cart.length || !total || !session?.user) return;

    const payload = {
      items: cart,
      total: total + 20,
      user: session?.user,
    };

    axios
      .post('/api/create-payment-intent', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error('Error creating payment intent:', error);
      });
  }, [cart, total, session?.user]);

  const appearance: { theme: 'stripe' | 'night' | 'flat' | undefined } = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Container component={'main'} maxWidth="xl" sx={styles.main}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Container>
  );
}
