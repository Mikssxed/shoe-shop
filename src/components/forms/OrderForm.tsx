"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider } from "@mui/material";

import ControlledInput from "@/components/common/ControlledInput";
import BagPricingList from "@/components/bag/BagPricingList";
import { OrderValidation } from "@/lib/validation";
import { useQueryCartItems } from "@/tools";
import { orderFormStyles as styles } from "@/styles/forms/forms.style";

const defaultValues = {
  promocode: "",
};

const OrderForm = () => {
  const { data: cart = [] } = useQueryCartItems();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const { handleSubmit, control } = useForm<z.infer<typeof OrderValidation>>({
    resolver: zodResolver(OrderValidation),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof OrderValidation>) => {
    try {
      //handling creating order
    } catch (error) {
      console.error(error);
    }
  };

  const onOpenPromocodeInput = () => setShowPromoInput((prev) => !prev);

  useEffect(() => {
    setSubtotal(
      cart.reduce((total: number, item) => total + item.price * item.amount, 0)
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
            src={"/icons/dropdown.svg"}
            style={{
              marginLeft: "4px",
              rotate: showPromoInput ? "180deg" : "0deg",
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
            containerProps={{ mt: "12px" }}
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

        <Button type="submit" variant="contained" sx={styles.md_checkoutBtn}>
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
    </>
  );
};

export default OrderForm;
