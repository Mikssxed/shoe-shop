import React from "react"
import { Typography, Divider, Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import BagPricingList from "@/components/bag/BagPricingList"
import Image from "next/image"
import dropdownIcon from "@/assets/icons/Vector8.svg"

interface BagSummaryProps {
  subtotal: number
}

const BagSummary: React.FC<BagSummaryProps> = ({ subtotal }) => {
  const [showPromoInput, setShowPromoInput] = useState(false)
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
        sx={{ marginBottom: "68px", display: { xs: "none", md: "block" } }}
      >
        Summary
      </Typography>
      <Button
        onClick={() => setShowPromoInput((prev) => !prev)}
        sx={{
          fontFamily: "Work Sans",
          alignSelf: "flex-start",
          padding: "0",
          fontSize: { xs: "16px", sm: "20px" },
          lineHeight: { xs: "17px", sm: "23.5px" },
          fontWeight: "400",
          color: "#000",
          textTransform: "none",
        }}
      >
        Do you have a promocode?{" "}
        <Image
          src={dropdownIcon}
          style={{ marginLeft: "4px" }}
          alt="dropdown"
        />
      </Button>
      {/* UPDATE THIS INPUT */}
      {showPromoInput && (
        <TextField
          sx={{ marginTop: "20px" }}
          label="Promo code"
          variant="filled"
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "38px",
        }}
      >
        <BagPricingList name="Subtotal" value={subtotal} />
        <BagPricingList name="Shipping" value={subtotal ? 20 : 0} />
        <BagPricingList name="Tax" value={0} />
      </Box>
      <Divider
        sx={{
          marginBottom: "22px",
          marginTop: { xs: "28px", md: "40px", xl: "56px" },
        }}
      />
      <BagPricingList name="Total" value={subtotal ? subtotal + 20 : 0} bold />
      <Divider
        sx={{ marginTop: "22px", marginBottom: { xs: "113px", md: "0px" } }}
      />
      {/* UPDATE THIS BUTTON */}
      <Button
        sx={{
          display: { xs: "none", md: "block" },
          marginTop: { md: "70px", xl: "113px" },
          fontFamily: "Work Sans",
          textTransform: "none",
          bgcolor: "#FE645E",
          fontSize: "16px",
        }}
        variant="contained"
      >
        Checkout
      </Button>
    </Box>
  )
}

export default BagSummary
