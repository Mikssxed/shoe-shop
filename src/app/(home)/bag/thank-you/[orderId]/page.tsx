'use client';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import BaseButton from '@/components/ui/BaseButton';
import { ThankYouPageProps } from '@/lib/types';
import styles from '@/styles/bag/thank-you/thank-you.style';

const ThankYouPage = ({ params }: ThankYouPageProps) => {
  const { orderId } = params;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.info}>
        <Typography variant="extremeHuge" sx={styles.title}>
          THANK YOU
        </Typography>
        <Box sx={styles.orderInfoBox}>
          <Typography sx={styles.forYourOrder}>for your order</Typography>
          <Typography sx={styles.orderId}>#{orderId}</Typography>
        </Box>
        <Box sx={styles.imgContainerXs}>
          <ImageWithSkeleton
            src="/images/man_with_boxes.png"
            alt="man with boxes"
          />
        </Box>
        <Typography sx={styles.message}>
          Your order has been received and is currently being processed. You
          will receive an email confirmation with your order details shortly.
        </Typography>
        <Box sx={styles.buttonsContainer}>
          {/* TODO: change the path after the page is created */}
          <Link href={`/order/${orderId}`} passHref>
            <BaseButton variant="outlined" sx={styles.button}>
              View Order
            </BaseButton>
          </Link>
          <Link href="/products" passHref>
            <BaseButton variant="contained" sx={styles.button}>
              Continue Shopping
            </BaseButton>
          </Link>
        </Box>
      </Box>
      <Box sx={styles.imgContainerMd}>
        <ImageWithSkeleton
          src="/images/man_with_boxes.png"
          alt="man with boxes"
        />
      </Box>
    </Box>
  );
};

export default ThankYouPage;
