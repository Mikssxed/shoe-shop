import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProductList } from "@/components/common";
import { getMyProducts } from "@/tools";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Session, User, getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function MyProducts() {
  const session = (await getServerSession(authOptions)) as Session;
  const user = session.user as User;
  const initialData = await getMyProducts(user);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: {
            xs: 630 / 250,
            sm: 630 / 230,
            md: 1480 / 630,
            lg: 1480 / 450,
            xl: 1480 / 360,
          },
          marginBottom: { xs: 3, sm: 5 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: {
              xs: "calc(100% - 50px)",
              sm: "calc(100% - 65px)",
              md: "calc(100% - 90px)",
            },
          }}
        >
          <Image
            src="/images/myProductsBanner.png"
            alt="My products"
            fill
            priority
            quality={100}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Stack
          sx={{
            position: "absolute",
            bottom: 0,
            left: { xs: 20, md: 40, xl: 60 },
            alignItems: "center",
          }}
          direction="row"
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: 64, sm: 90, md: 120 },
              height: { xs: 64, sm: 90, md: 120 },
              border: "4px solid #fff",
              borderRadius: "50%",
            }}
          >
            <Image
              src="/images/avatar.png"
              alt="jane meldrum"
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Typography
            sx={{
              marginLeft: { xs: 2, sm: 3 },
            }}
            variant="h4"
            fontSize={14}
          >
            Jane Meldrum
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          padding: { xs: "0 24px", md: 0 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Typography variant="h1">My Products</Typography>
          <Link href="/profile/add-product">
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                padding: "8px 24px",
                position: "relative",
                zIndex: 1,
              }}
            >
              Add product
            </Button>
          </Link>
        </Stack>
        <ProductList
          initialProducts={initialData}
          filters={Object.assign({ "filters[filters[userID]]": user.id })}
        />
      </Box>
    </>
  );
}
