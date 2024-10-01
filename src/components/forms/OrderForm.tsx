'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, Typography } from '@mui/material';
import { TickCircle } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import BagPricingList from '@/components/bag/BagPricingList';
import ControlledInput from '@/components/common/ControlledInput';
import Modal from '@/components/ui/Modal';
import { stylingConstants } from '@/lib/constants/themeConstants';
import { OrderValidation } from '@/lib/validation';
import { orderFormStyles as styles } from '@/styles/forms/orderForm.style';
import { clearCartQuery, useQueryCartItems } from '@/tools';

const defaultValues = {
  promocode: '',
};

const OrderForm = () => {
  const { data: cart = [] } = useQueryCartItems();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const { handleSubmit, control } = useForm<z.infer<typeof OrderValidation>>({
    resolver: zodResolver(OrderValidation),
    defaultValues,
  });

  const onSubmit = () => {
    try {
      if (cart.some(item => item.selectedSize === 'unselected'))
        throw Error('All products must have selected size!');
      setShowCheckoutModal(true);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const onOpenPromocodeInput = () => setShowPromoInput(prev => !prev);

  useEffect(() => {
    setSubtotal(
      cart.reduce((total: number, item) => total + item.price * item.amount, 0),
    );
  }, [cart]);

  return (
    <>
      <Box component="form" sx={styles.root} onSubmit={handleSubmit(onSubmit)}>
        <Button onClick={onOpenPromocodeInput} sx={styles.openPromocodeField}>
          Do you have a promocode?
          <Image
            width={24}
            height={24}
            src={'/icons/dropdown.svg'}
            style={{
              marginLeft: '4px',
              rotate: showPromoInput ? '180deg' : '0deg',
            }}
            alt="dropdown"
          />
        </Button>
        {showPromoInput && (
          <ControlledInput
            name="promocode"
            control={control}
            label="Promocode"
            placeholder="SOLVD2024"
            containerProps={{ mt: '12px' }}
          />
        )}

        <Box sx={styles.bagPricingList}>
          <BagPricingList name="Subtotal" value={subtotal} />
          <BagPricingList name="Shipping" value={subtotal ? 20 : 0} />
          <BagPricingList name="Tax" value={0} />
        </Box>

        <Divider sx={styles.dividerBeforeTotal} />
        <BagPricingList
          name="Total"
          value={subtotal ? subtotal + 20 : 0}
          bold
        />
        <Divider sx={styles.dividerAfterTotal} />

        <Button variant="contained" sx={styles.md_checkoutBtn} type="submit">
          Checkout
        </Button>
      </Box>
      <Box sx={styles.xs_checkoutContainer}>
        <Button
          sx={styles.xs_checkoutBtn}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Checkout
        </Button>
      </Box>
      <Modal
        open={showCheckoutModal}
        onClose={() => console.log('checked out')}
        paperStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <Typography variant="h2">Successful purchase!</Typography>
        <TickCircle
          size={128}
          variant="Bold"
          color={stylingConstants.palette.primary.main}
        />
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          You have successfully purchased the products.
          <br />
          Delivery time: {Math.floor(Math.random() * 8 + 2)} days.
        </Typography>
        <Link href="/products">
          <Button variant="contained" onClick={clearCartQuery}>
            Back to home page
          </Button>
        </Link>
      </Modal>
    </>
  );
};

export default OrderForm;
