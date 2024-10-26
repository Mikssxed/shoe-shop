'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { getCode } from 'country-list';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BagSummary } from '@/components/bag';
import { ControlledInput } from '@/components/controlled';
import { useIsMobile } from '@/hooks';
import { CheckoutFormValidation } from '@/lib/validation';
import { bagPageStyles as styles } from '@/styles/bag/bag.style';
import {
  addOrderStatus,
  clearCartQuery,
  queryClient,
  useQueryCartItems,
} from '@/tools';

type Props = {
  orderId: string;
  invoiceId: string;
};

const defaultValues = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  state: '',
  zipCode: '',
  address: '',
};

export default function CheckoutForm({ orderId, invoiceId }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  const router = useRouter();
  const [paymentType, setPaymentType] = useState('card');
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CheckoutFormValidation),
    defaultValues,
  });
  const { data: cart = [] } = useQueryCartItems(session?.user?.id);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const hasUnseleckedSize = useMemo(
    () => cart.some(item => item.selectedSize === 'unselected'),
    [cart],
  );

  useEffect(() => {
    if (hasUnseleckedSize) {
      enqueueSnackbar(
        'All products must have selected size! Go back to cart and select size.',
        {
          variant: 'error',
          preventDuplicate: true,
        },
      );
    }
  }, [hasUnseleckedSize]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return;
    }
    enqueueSnackbar('Validation error. Plese check fields.', {
      variant: 'error',
    });
  }, [errors]);

  useEffect(() => {
    if (!session) {
      return;
    }
    const fields = ['name', 'surname', 'email', 'phone'] as const;
    const userValues = {
      name: session.user.name || '',
      surname: session.user.surname || '',
      email: session.user.email,
      phone: session.user.phone || '',
    };

    fields.forEach(field => {
      if (!getValues(field)) {
        setValue(field, userValues[field]);
      }
    });
  }, [session, setValue, getValues]);

  const onSubmit = async (data: z.infer<typeof CheckoutFormValidation>) => {
    try {
      if (cart.some(item => item.selectedSize === 'unselected'))
        throw Error(
          'All products must have selected size! Go back to cart and select size.',
        );
      if (!stripe || !elements) {
        return;
      }
      const countryCode = getCode(data.country);
      setIsLoading(true);
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: data.email,
          shipping: {
            name: `${data.name} ${data.surname}`,
            phone: data.phone,
            address: {
              city: data.city,
              country: countryCode,
              line1: data.address,
              postal_code: data.zipCode,
              state: data.state,
            },
          },
          return_url: `${window.location.origin}/bag/thank-you/${orderId}`,
        },
        redirect: 'if_required',
      });

      if (error) {
        throw new Error(error?.message);
      }

      //finalize invoice to create invoice pdf
      await axios.put(
        '/api/orders',
        { orderId, invoiceId, paymentType },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      queryClient.invalidateQueries({ queryKey: ['orders'] });
      addOrderStatus(orderId);
      clearCartQuery(session?.user?.id);
      router.push(`/bag/thank-you/${orderId}`);
    } catch (error: any) {
      enqueueSnackbar(error?.message || 'An unexpected error occurred.', {
        variant: 'error',
      });
      setMessage(error?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container
        data-testid="checkout-form"
        component={'main'}
        maxWidth="xl"
        sx={{ ...styles.main, pt: 0, flexDirection: 'column' }}
      >
        <Typography>
          <Link href="/bag">Back to cart</Link>
        </Typography>
        <Box sx={styles.container}>
          <Typography variant="h1" sx={{ mb: 8 }}>
            Checkout
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Personal Info
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ControlledInput
                inputStyle={{ maxWidth: '100%' }}
                name="name"
                control={control}
                label="Name"
                required
                placeholder="Jane"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledInput
                inputStyle={{ maxWidth: '100%' }}
                name="surname"
                control={control}
                label="Surname"
                required
                placeholder="Smith"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledInput
                inputStyle={{ maxWidth: '100%' }}
                name="email"
                control={control}
                label="Email"
                required
                placeholder="example@mail.com"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledInput
                inputStyle={{ maxWidth: '100%' }}
                name="phone"
                control={control}
                label="Phone Number"
                required
                placeholder="123-456-7890"
              />
            </Grid>
          </Grid>
          <Divider sx={styles.itemsDivider} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shipping Info
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <ControlledInput
                name="country"
                control={control}
                label="Country"
                required
                placeholder="USA"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <ControlledInput
                name="city"
                control={control}
                label="City"
                required
                placeholder="New York"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <ControlledInput
                name="state"
                control={control}
                label="State"
                required
                placeholder="New York"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <ControlledInput
                name="zipCode"
                control={control}
                label="Zip Code"
                required
                placeholder="3460853"
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledInput
                inputStyle={{ maxWidth: '100%' }}
                name="address"
                control={control}
                label="Address"
                required
                placeholder="Street, Apartment, Block"
              />
            </Grid>
          </Grid>
          <Divider sx={styles.itemsDivider} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment Info
          </Typography>

          <PaymentElement
            id="payment-element"
            onChange={e => setPaymentType(e.value.type)}
          />
          {message && (
            <Typography color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Container>
      {!isMobile && (
        <Box sx={styles.bagSummaryContainerMd}>
          <BagSummary
            submitText={isLoading ? 'Processing...' : 'Confirm & Pay'}
            onClick={handleSubmit(onSubmit)}
          />
        </Box>
      )}
      {isMobile && (
        <>
          <Divider sx={{ display: { xs: 'block', md: 'none' }, mt: '17px' }} />
          <Typography
            data-testid="summary__title-mobile"
            variant="h1"
            sx={styles.summaryTitleXs}
          >
            Summary
          </Typography>
          <Divider sx={{ display: { xs: 'block', md: 'none' }, mb: '17px' }} />
          <Container
            component={'main'}
            maxWidth="xl"
            sx={styles.bagSummaryContainerXs}
          >
            <BagSummary
              submitText={isLoading ? 'Processing...' : 'Confirm & Pay'}
              onClick={handleSubmit(onSubmit)}
            />
          </Container>
        </>
      )}
    </>
  );
}
