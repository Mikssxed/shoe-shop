"use client";

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

import BagPricingList from "@/components/bag/BagPricingList";
import { stylingConstants } from "@/lib/constants/themeConstants";

interface BagSummaryProps {
  subtotal: number;
}

const BagSummary: React.FC<BagSummaryProps> = ({ subtotal }) => {
  const [showPromoInput, setShowPromoInput] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        position: "sticky",
        alignSelf: "flex-start",
        top: { xs: "32px", md: "80px" },
        flexDirection: "column",
        maxWidth: "400px",
        flex: "1",
      }}
    >
      <Typography
        fontSize={53}
        fontWeight={500}
        lineHeight="53px"
        sx={{ mb: "68px", display: { xs: "none", md: "block" } }}
        color={stylingConstants.palette.text.primary}
      >
        Summary
      </Typography>
      <Button
        onClick={() => setShowPromoInput((prev) => !prev)}
        sx={{
          alignSelf: "flex-start",
          p: "0",
          fontSize: { xs: "16px", sm: "20px" },
          lineHeight: { xs: "17px", sm: "23.5px" },
          fontWeight: "400",
          color: "#000",
          textTransform: "none",
        }}
      >
        Do you have a promocode?{" "}
        <Image
          width={24}
          height={24}
          src={"/icons/dropdown.svg"}
          style={{ marginLeft: "4px" }}
          alt="dropdown"
        />
      </Button>
      {/* UPDATE THIS INPUT */}
      {showPromoInput && (
        <TextField sx={{ mt: "20px" }} label="Promo code" variant="filled" />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          mt: "38px",
        }}
      >
        <BagPricingList name="Subtotal" value={subtotal} />
        <BagPricingList name="Shipping" value={subtotal ? 20 : 0} />
        <BagPricingList name="Tax" value={0} />
      </Box>
      <Divider
        sx={{
          mb: "22px",
          mt: { xs: "28px", md: "40px", xl: "56px" },
        }}
      />
      <BagPricingList name="Total" value={subtotal ? subtotal + 20 : 0} bold />
      <Divider sx={{ mt: "22px", mb: { xs: "113px", md: "0px" } }} />
      {/* UPDATE THIS BUTTON */}
      <Button
        sx={{
          display: { xs: "none", md: "block" },
          mt: { md: "70px", xl: "113px" },
          textTransform: "none",
          bgcolor: "#FE645E",
          fontSize: "16px",
        }}
        variant="contained"
      >
        Checkout
      </Button>
    </Box>
  );
};

export default BagSummary;
