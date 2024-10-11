'use client';
import { BagSummary } from '@/components/bag';
import { bagPageStyles as styles } from '@/styles/bag/bag.style';
import { Box } from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useState } from 'react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/products',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Box sx={styles.bagSummaryContainerMd}>
        <BagSummary onClick={handleSubmit} />
      </Box>
    </>
  );
}
