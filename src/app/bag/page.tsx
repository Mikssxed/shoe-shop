"use client"
import BagItem from "@/components/bag/BagItem"
import { Container, Typography, Divider, Box, Button } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material"
import { Fragment, useMemo } from "react"
import Image from "next/image"
import bagTick from "@/assets/icons/bag-tick.svg"
import "./index.css"
import BagSummary from "@/components/bag/BagSummary"

//DELETE THENE AND PROVIDER
const theme = createTheme({
  typography: {
    fontFamily: "Work+Sans",
  },
})

//DUMMY DATA NEEDS TO BE CHANGED IN FUTURE
const cart = [
  {
    name: "Air Max 270",
    images: {
      data: [
        "https://s3-alpha-sig.figma.com/img/595b/e7ae/43e34afe4d5703f0f52bd98aadeaed48?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XsXpCZOUb38~0hg9u95zNIr2Yd7toJzQWaj4ZmqycFClNocSE3h1Tpeut8o7ZPaaXM67KtaVm7o2nB8Vg--v9Dz0O34lp0o-xz0-DsHg-OAgHrJeSYXR7OrI8IKqTNkGzjIlg1yAbGkRiXhHCB2qZYc4JPMAH7KsXJIW7Llhhu~wTejmpqfdpnvAEvilhqx7D6nFpiWdryrPt2GhnOee-GRya-LmMKemhnGM0hTUwEdTHh1ontibVLCkbP~rKXq23eGn8c61cAQyOQROq8VZn5LPBEepcqL-5VsqBjK75f4Vb1UKxJpOzaaPMatoEp7iF2ZRaaqgrkEFRUc7tNzeIA__",
      ],
    },
    description: "Lorem ipsum",
    number: 233,
    teamName: "Nike",
    gender: "Men",
    price: 160,
    amount: 0,
  },
  {
    name: "Air Max 90",
    images: {
      data: [
        "https://s3-alpha-sig.figma.com/img/e952/7227/aeb12f3a2acf215bc4e881e170c1478e?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bdXZ2FhEu45PcZptK58o97O2nlTSDgXxv2njs2ZCNtBrNh8ZrpulxJleDXc5Pj6ldA56Q8KQbjFz1vyWG8vqAcHPcgLvwmH0b~xYIdyd71oC5ZykfVTYIuDNpGQ9nxH-HCB~MrSOtvLZ84ijwu1FCVfybrdQuRTj9GNygXIJ-cnEPeO1O3heqKR2xzmh34IqdjTp8P-nAIwi~~Eivt-qhT-qkrXQyaVUlctxcf7xn5TDqIfiBoNCifIACIyGGbqH52Qj7ZwFeXIbnUwkA~e1~BfuVKunNfwQPvlTsVDqjbsEK09-lHPUmpThYemo5G77ToViSKXNyzPd-rIXeeFv4Q__",
      ],
    },
    description: "Lorem ipsum",
    number: 233,
    teamName: "Nike",
    gender: "Women",
    price: 140,
    amount: 0,
  },
  {
    name: "Air Force 1 '07SE",
    images: {
      data: [
        "https://s3-alpha-sig.figma.com/img/e258/c7ef/9c7fa3a16f6de35f829dee79229f2f75?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QZDHKd7TO7QHkXul7QM4Mkx-0Az8HZdHYgXCw39R8stdKM5seHIjNyxX6fcjwwlblBxurj99Y4wlakvGOTp0EiZ9eZfWwAmHYoNWRKGSO3A7h9xc1rY96nurKGzbupkPy3ozAPmXYSmbtjZPYLa5OQuLo31NyesTUiEWGuZprMrrui8IHGGEkZ0hnSut8GlOA45P64dmdpQQsXnTM9llKpMgeXo50M8~H1ayP-gnruzOV1gn1tDC1AUXfX-qszKXO5uCR9-blvvNAtxQFySNBCKBKTUwqY80kr5n5xrlWvMCmOvXN2za2VbuYgh-8PHenlCLgSzOUdE9Wm2Fbg37rw__",
      ],
    },
    description: "Lorem ipsum",
    number: 233,
    teamName: "Nike",
    gender: "Men",
    price: 110,
    amount: 1,
  },
]

const Bag = () => {
  const subtotal = useMemo(
    () => cart.reduce((acc, shoe) => acc + shoe.price * shoe.amount, 0),
    [JSON.stringify(cart)]
  )

  return (
    <ThemeProvider theme={theme}>
      <Typography
        sx={{
          padding: "14px 14px 0px 14px",
          marginBottom: { xs: "12px" },
          display: { xs: "block", md: "none" },
          fontSize: { xs: "30px", md: "53px" },
          fontWeight: 500,
          lineHeight: { xs: "35px", md: "53px" },
        }}
      >
        Cart
      </Typography>
      <Divider
        sx={{ display: { xs: "block", md: "none" }, marginBottom: "17px" }}
      />
      {cart.length ? (
        <Container
          component={"main"}
          maxWidth="xl"
          sx={{
            paddingTop: { xs: "14px", md: "80px" },
            paddingBottom: { xs: "0px", md: "60px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "40px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              maxWidth: "963px",
            }}
          >
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                marginBottom: { xs: "12px", md: "57px" },
                fontSize: { xs: "30px", md: "53px" },
                fontWeight: 500,
                lineHeight: { xs: "35px", md: "53px" },
              }}
            >
              Cart
            </Typography>
            {cart.map((shoe, index) => (
              <Fragment key={shoe.name}>
                <BagItem data={shoe} />
                {index < cart.length - 1 && (
                  <Divider
                    sx={{
                      marginY: { xs: "15px", md: "60px" },
                      borderColor: { xs: "white", md: "rgba(0, 0, 0, 0.12)" },
                    }}
                  />
                )}
              </Fragment>
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "100%",
              maxWidth: { md: "300px", lg: "400px" },
            }}
          >
            <BagSummary subtotal={subtotal} />
          </Box>
        </Container>
      ) : (
        <Container
          component={"main"}
          maxWidth="xl"
          sx={{
            height: "100%",
            paddingTop: "80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              marginBottom: "57px",
              fontSize: { xs: "30px", md: "53px" },
              fontWeight: 500,
              lineHeight: { xs: "35px", md: "53px" },
            }}
          >
            Cart
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "0.7",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "72px",
                height: "72px",
                borderRadius: "100%",
                bgcolor: "#F9FAFB",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Image src={bagTick} alt="bagTick" />
            </Box>
            <Typography
              sx={{
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: 500,
                fontSize: { xs: "16px", md: "20px" },
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              You don't have any products yet
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: { xs: "13px", md: "15px" },
                lineHeight: { xs: "15px", md: "17.5px" },
              }}
            >
              Add something to your cart
            </Typography>
            <Button
              sx={{
                marginTop: "41px",
                borderRadius: "8px",
                bgcolor: "#FE645E",
                textTransform: "none",
                fontFamily: "Work Sans",
                "&:hover": { color: "#000" },
                color: "white",
                width: "148px",
              }}
            >
              Add Product
            </Button>
          </Box>
        </Container>
      )}
      <Divider
        sx={{ display: { xs: "block", md: "none" }, marginTop: "17px" }}
      />
      <Typography
        sx={{
          padding: "14px 14px 0px 14px",
          marginBottom: { xs: "12px" },
          display: { xs: "block", md: "none" },
          fontSize: { xs: "30px", md: "53px" },
          fontWeight: 500,
          lineHeight: { xs: "35px", md: "53px" },
        }}
      >
        Summary
      </Typography>
      <Divider
        sx={{ display: { xs: "block", md: "none" }, marginBottom: "17px" }}
      />
      <Container
        component={"main"}
        maxWidth="xl"
        sx={{
          paddingTop: "25px",
          display: { xs: "flex", md: "none" },
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <BagSummary subtotal={subtotal} />
      </Container>
      <Box
        sx={{
          padding: "10px",
          borderTop: "thin solid rgba(0, 0, 0, 0.12)",
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: "0px",
          width: "100%",
          height: "60px",
          bgcolor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            fontFamily: "Work Sans",
            textTransform: "none",
            bgcolor: "#FE645E",
            fontSize: "16px",
            width: "100%",
            maxWidth: "400px",
          }}
          variant="contained"
        >
          Checkout
        </Button>
      </Box>
    </ThemeProvider>
  )
}

export default Bag
