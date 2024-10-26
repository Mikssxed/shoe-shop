'use client';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import BaseButton from '@/components/ui/BaseButton';
import { ThankYouPageProps } from '@/lib/types';
import styles from '@/styles/bag/thank-you/thank-you.style';
import { clearCartQuery } from '@/tools';

const ThankYouPage = ({ params }: ThankYouPageProps) => {
  const { orderId } = params;
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const failed = searchParams.get('redirect_status') === 'failed';
  useEffect(() => {
    if (failed) return;
    clearCartQuery(session?.user?.id);
  }, [session, failed]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.info}>
        <Typography variant="extremeHuge" sx={styles.title}>
          {failed ? 'PAYMENT FAILED' : 'THANK YOU'}
        </Typography>
        <Box sx={styles.orderInfoBox}>
          <Typography sx={styles.forYourOrder}>
            {failed
              ? 'We encountered an issue with your payment.'
              : 'for your order'}
          </Typography>
          <Typography sx={styles.orderId}>#{orderId}</Typography>
        </Box>
        <Box sx={styles.imgContainerXs}>
          <ImageWithSkeleton
            src={
              failed
                ? '/images/payment_failed.webp'
                : '/images/man_with_boxes.png'
            }
            alt={failed ? 'payment failed' : 'man with boxes'}
          />
        </Box>
        <Typography sx={styles.message}>
          {failed
            ? 'Unfortunately, your payment could not be processed. Please try again or choose a different payment method.'
            : 'Your order has been received and is currently being processed. You will receive an email confirmation with your order details shortly.'}
        </Typography>
        <Box sx={styles.buttonsContainer}>
          {failed ? (
            <>
              <Link href="/bag/checkout" passHref>
                <BaseButton variant="contained" sx={styles.button}>
                  Retry Payment
                </BaseButton>
              </Link>
              <Link href="/bag" passHref>
                <BaseButton variant="outlined" sx={styles.button}>
                  Return to Cart
                </BaseButton>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/profile/order-history?id=${orderId}`} passHref>
                <BaseButton variant="outlined" sx={styles.button}>
                  View Order
                </BaseButton>
              </Link>
              <Link href="/products" passHref>
                <BaseButton variant="contained" sx={styles.button}>
                  Continue Shopping
                </BaseButton>
              </Link>
            </>
          )}
        </Box>
      </Box>
      <Box sx={styles.imgContainerMd}>
        <ImageWithSkeleton
          src={
            failed
              ? '/images/payment_failed.webp'
              : '/images/man_with_boxes.png'
          }
          alt={failed ? 'payment failed' : 'man with boxes'}
        />
      </Box>
    </Box>
  );
};

export default ThankYouPage;
