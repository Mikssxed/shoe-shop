'use client';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

import { SymbolButton } from '@/components/ui';
import { IQuantityButtonsProps } from '@/lib/types';
import { quantityButtonsStyles as styles } from '@/styles/bag/bag.style';
import { decreaseCartItemAmount, increaseCartItemAmount } from '@/tools';

const QuantityButtons: React.FC<IQuantityButtonsProps> = ({ item }) => {
  const [isQuantityOpened, setIsQuantityOpened] = useState<boolean>(false);
  const { data: session } = useSession();

  const onClickQuantity = () => {
    setIsQuantityOpened(prev => !prev);
  };

  const onClickDecrease = () =>
    decreaseCartItemAmount(item.id, session?.user?.id, item.selectedSize);
  const onClickIncrease = () =>
    increaseCartItemAmount(item.id, session?.user?.id, item.selectedSize);

  const isMinusDisabled = item.amount <= 1;

  return (
    <>
      {/* desktop version */}
      <Box data-testid="quantity-desktop" sx={styles.md_root}>
        <Box sx={styles.md_buttonsWrapper}>
          <SymbolButton
            dataTestId="quantity-desktop__decrease"
            onClick={onClickDecrease}
            disabled={isMinusDisabled}
          >
            <Image
              src="/icons/minus-2.svg"
              alt="minus"
              width={10}
              height={10}
            />
          </SymbolButton>
          <Typography
            data-testid="quantity-desktop__amount"
            sx={styles.md_amount}
          >
            {item.amount}
          </Typography>

          <SymbolButton
            dataTestId="quantity-desktop__increase"
            onClick={onClickIncrease}
          >
            <Image src="/icons/plus-2.svg" alt="plus" width={12} height={12} />
          </SymbolButton>
        </Box>
        <Typography sx={styles.md_quantityText}>Quantity</Typography>
        <Box sx={styles.md_dividerAfterQuantity} />
      </Box>

      {/* mobile version */}
      <Box data-testid="quantity-mobile" sx={styles.xs_root}>
        <Box
          data-testid="quantity-accordion"
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={onClickQuantity}
        >
          <Typography sx={{ mr: '4px', fontSize: { xs: 12, md: 18, xl: 24 } }}>
            Quantity
          </Typography>
          <Image
            src="/icons/dropdown.svg"
            alt="dropdown"
            width={6}
            height={6}
            style={{ rotate: isQuantityOpened ? '180deg' : '0deg' }}
          />
        </Box>
        {isQuantityOpened && (
          <Box sx={styles.xs_buttonsWrapper}>
            <SymbolButton
              dataTestId="quantity-mobile__decrease"
              onClick={onClickDecrease}
              disabled={isMinusDisabled}
            >
              <Image
                src="/icons/minus-2.svg"
                alt="minus"
                width={12}
                height={12}
              />
            </SymbolButton>

            <Typography
              data-testid="quantity-mobile__amount"
              sx={styles.xs_amount}
            >
              {item.amount}
            </Typography>

            <SymbolButton
              dataTestId="quantity-mobile__increase"
              onClick={onClickIncrease}
            >
              <Image
                src="/icons/plus-2.svg"
                alt="plus"
                width={12}
                height={12}
              />
            </SymbolButton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default QuantityButtons;
