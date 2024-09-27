'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, Container, Divider, Typography } from '@mui/material';

import { BagItem, BagSummary } from '@/components/bag';
import { useQueryCartItems } from '@/tools';
import { bagPageStyles as styles } from '@/styles/bag/bag.style';

const Bag = () => {
  const { data: cart = [] } = useQueryCartItems();

  return (
    <>
      <Typography variant="h1" sx={styles.rootTitleMobile}>
        Cart
      </Typography>
      <Divider sx={{ display: { xs: 'block', md: 'none' }, mb: '17px' }} />
      {cart.length ? (
        <Container component={'main'} maxWidth="xl" sx={styles.main}>
          <Box sx={styles.container}>
            <Typography variant="h1" sx={styles.rootTitleDesktop}>
              Cart
            </Typography>
            {cart.map((shoe, index) => (
              <Fragment key={shoe.id + '_' + shoe.selectedSize}>
                <BagItem item={shoe} />
                {index < cart.length - 1 && (
                  <Divider sx={styles.itemsDivider} />
                )}
              </Fragment>
            ))}
          </Box>
          <Box sx={styles.bagSummaryContainerMd}>
            <BagSummary />
          </Box>
        </Container>
      ) : (
        <Container component={'main'} maxWidth="xl" sx={styles.emptyCart_main}>
          <Typography variant="h1" sx={styles.emptyCart_rootTitle}>
            Cart
          </Typography>
          <Box sx={styles.emptyCart_container}>
            <Box sx={styles.emptyCart_bagTickWrapper}>
              <Image
                src={'/icons/bag-tick.svg'}
                alt="bagTick"
                width={24}
                height={24}
              />
            </Box>
            <Typography variant="h4" sx={styles.emptyCart_message}>
              You don&apos;t have any products yet
            </Typography>
            <Typography variant="body2" sx={styles.emptyCart_subMessage}>
              Add something to your cart
            </Typography>
            <Link href="/products">
              <Button sx={styles.emptyCart_addProductBtn} variant="contained">
                Add Product
              </Button>
            </Link>
          </Box>
        </Container>
      )}
      {Boolean(cart.length) && (
        <>
          <Divider sx={{ display: { xs: 'block', md: 'none' }, mt: '17px' }} />
          <Typography variant="h1" sx={styles.summaryTitleXs}>
            Summary
          </Typography>
          <Divider sx={{ display: { xs: 'block', md: 'none' }, mb: '17px' }} />
          <Container
            component={'main'}
            maxWidth="xl"
            sx={styles.bagSummaryContainerXs}
          >
            <BagSummary />
          </Container>
        </>
      )}
    </>
  );
};

export default Bag;
