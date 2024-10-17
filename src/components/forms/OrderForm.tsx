'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import BagPricingList from '@/components/bag/BagPricingList';
import ControlledInput from '@/components/controlled/ControlledInput';
import { useIsMobile } from '@/hooks';
import { OrderValidation } from '@/lib/validation';
import { orderFormStyles as styles } from '@/styles/forms/orderForm.style';
import { useQueryCartItems } from '@/tools';
import { formatAmount } from '@/utils';
import { useRouter } from 'next/navigation';
import BaseButton from '../ui/BaseButton';

type Props = { onClick?: () => void; submitText?: string };

const defaultValues = {
  promocode: '',
};

const OrderForm = ({ onClick, submitText }: Props) => {
  const { data: session } = useSession();
  const { data: cart = [] } = useQueryCartItems(session?.user?.id);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  const shippingCost = 20;

  const { handleSubmit, control } = useForm<z.infer<typeof OrderValidation>>({
    resolver: zodResolver(OrderValidation),
    defaultValues,
  });

  const onSubmit = () => {
    try {
      if (subtotal >= 999999.99) {
        throw Error('Order total exceeds the maximum amount allowed!');
      }
      if (onClick) {
        onClick();
        return;
      }
      if (cart.some(item => item.selectedSize === 'unselected'))
        throw Error('All products must have selected size!');
      router.push('/bag/checkout');
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
      +cart
        .reduce((total: number, item) => total + item.price * item.amount, 0)
        .toFixed(2),
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
          <BagPricingList name="Subtotal" value={formatAmount(subtotal)} />
          <BagPricingList name="Shipping" value={subtotal ? shippingCost : 0} />
          <BagPricingList name="Tax" value={0} />
        </Box>

        <Divider sx={styles.dividerBeforeTotal} />
        <BagPricingList
          name="Total"
          value={subtotal ? formatAmount(subtotal + shippingCost) : 0}
          bold
        />
        <Divider sx={styles.dividerAfterTotal} />
        {!isMobile && (
          <BaseButton
            disabled={submitText === 'Processing...'}
            dataTestId="order__checkout-button-desktop"
            type="submit"
            sx={styles.md_checkoutBtn}
          >
            {submitText || 'Checkout'}
          </BaseButton>
        )}
      </Box>
      {isMobile && (
        <Box sx={styles.xs_checkoutContainer}>
          <BaseButton
            disabled={submitText === 'Processing...'}
            dataTestId="order__checkout-button-mobile"
            sx={styles.xs_checkoutBtn}
            onClick={() => (onClick ? onClick() : handleSubmit(onSubmit))}
          >
            {submitText || 'Checkout'}
          </BaseButton>
        </Box>
      )}
    </>
  );
};

export default OrderForm;
