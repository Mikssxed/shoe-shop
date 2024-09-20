import { Box, Button, Stack, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import { ProductList } from '@/components/common';
import ProfilePicture from '@/components/common/ProfilePicture';
import { textOverflowEllipsis } from '@/styles/commonStyles';
import { capitalizeFirstLetter } from '@/utils/helperFunctions';
import { getMyProducts } from '@/tools';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function MyProducts() {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  if (!user) {
    return null;
  }
  const { username, firstName, lastName } = user;
  const initialData = await getMyProducts(user);
  const gotFullNames = firstName && lastName;
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: {
            xs: 630 / 250,
            sm: 630 / 230,
            md: 1480 / 630,
            lg: 1480 / 450,
            xl: 1480 / 360,
          },
          mb: { xs: 3, sm: 5 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: {
              xs: 'calc(100% - 50px)',
              sm: 'calc(100% - 65px)',
              md: 'calc(100% - 90px)',
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
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Stack
          sx={{
            position: 'absolute',
            bottom: 0,
            left: { xs: 20, md: 40, xl: 60 },
            alignItems: 'center',
          }}
          direction="row"
        >
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: { xs: 64, sm: 90, md: 120 },
              height: { xs: 64, sm: 90, md: 120 },
              border: '4px solid #fff',
              borderRadius: '50%',
            }}
          >
            <ProfilePicture
              avatarStyle={{ fontSize: { sm: '28px', md: '48px' } }}
            />
          </Box>
          <Typography
            sx={{
              ml: { xs: 1, sm: 3 },
              ...textOverflowEllipsis,
              maxWidth: { xs: '160px', sm: '220px' },
            }}
            variant="h4"
            title={
              gotFullNames
                ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
                    lastName,
                  )}`
                : username
            }
          >
            {gotFullNames
              ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
                  lastName,
                )}`
              : username}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          p: { xs: '0 24px', md: 0 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 5,
          }}
        >
          <Typography variant="h1">My Products</Typography>
          <Link href="/profile/add-product">
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                p: '8px 24px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Add product
            </Button>
          </Link>
        </Stack>
        <ProductList
          initialProducts={initialData}
          filters={Object.assign({ 'filters[filters[userID]]': user.id })}
        />
      </Box>
    </>
  );
}
