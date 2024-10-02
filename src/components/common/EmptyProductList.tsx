import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { BagCross1 } from 'iconsax-react';
import Link from 'next/link';

import { stylingConstants } from '@/lib/constants/themeConstants';
import { EmptyProductListProps } from '@/lib/types';
import { emptyProductListStyles as styles } from '@/styles/emptyProductList/emptyProductList.style';
import BaseButton from '../ui/BaseButton';

const EmptyProductList = ({
  text,
  subtext,
  link,
  buttonText,
}: EmptyProductListProps) => {
  return (
    <Box sx={styles.emptyProductList_container}>
      <Stack gap={1} marginY={2}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            mx: 'auto',
          }}
        >
          <BagCross1
            size="20"
            color={stylingConstants.palette.grey[500]}
            variant="Outline"
          />
        </Avatar>
        <Typography variant="h4" textAlign="center">
          {text}
        </Typography>
        <Typography variant="body2" textAlign="center">
          {subtext}
        </Typography>
        {link && (
          <Link href={link} style={styles.emptyProductList_link}>
            <BaseButton sx={styles.emptyProductList_addProductBtn}>
              {buttonText}
            </BaseButton>
          </Link>
        )}
      </Stack>
    </Box>
  );
};

export default EmptyProductList;
