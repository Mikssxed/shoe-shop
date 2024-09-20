import { useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

import { SymbolButton } from "@/components/ui";
import { IQuantityButtonsProps } from "@/lib/types";
import { decreaseCartItemAmount, increaseCartItemAmount } from "@/tools";
import { quantityButtonsStyles as styles } from "@/styles/bag/bag.style";

const QuantityButtons: React.FC<IQuantityButtonsProps> = ({ item }) => {
  const [isQuantityOpened, setIsQuantityOpened] = useState<boolean>(false);

  const onClickQuantity = () => {
    setIsQuantityOpened((prev) => !prev);
  };

  const onClickDecrease = () => decreaseCartItemAmount(item.id);
  const onClickIncrease = () => increaseCartItemAmount(item.id);

  const isMinusDisabled = item.amount <= 1;
  const isPlusDisabled = item.amount >= item.number;

  return (
    <>
      {/* desktop version */}
      <Box sx={styles.md_root}>
        <Box sx={styles.md_buttonsWrapper}>
          <SymbolButton onClick={onClickDecrease} disabled={isMinusDisabled}>
            <Image
              src="/icons/minus-2.svg"
              alt="minus"
              width={12}
              height={12}
            />
          </SymbolButton>
          <Typography sx={styles.md_amount}>{item.amount}</Typography>

          <SymbolButton onClick={onClickIncrease} disabled={isPlusDisabled}>
            <Image src="/icons/plus-2.svg" alt="plus" width={12} height={12} />
          </SymbolButton>
        </Box>
        <Typography sx={styles.md_quantityText}>Quantity</Typography>
        <Box sx={styles.md_dividerAfterQuantity} />
      </Box>

      {/* mobile version */}
      <Box sx={styles.xs_root}>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={onClickQuantity}
        >
          <Typography sx={{ mr: "4px", fontSize: { xs: 12, md: 18, xl: 24 } }}>
            Quantity
          </Typography>
          <Image
            src="/icons/dropdown.svg"
            alt="dropdown"
            width={6}
            height={6}
            style={{ rotate: isQuantityOpened ? "180deg" : "0deg" }}
          />
        </Box>
        {isQuantityOpened && (
          <Box sx={styles.xs_buttonsWrapper}>
            <SymbolButton onClick={onClickDecrease} disabled={isMinusDisabled}>
              <Image
                src="/icons/minus-2.svg"
                alt="minus"
                width={12}
                height={12}
              />
            </SymbolButton>

            <Typography sx={styles.xs_amount}>{item.amount}</Typography>

            <SymbolButton onClick={onClickIncrease} disabled={isPlusDisabled}>
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
