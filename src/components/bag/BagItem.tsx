'use client';

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  Tooltip,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';

import { BagItemProps, TSelectedSize } from '@/lib/types';
import { bagItemStyles as styles } from '@/styles/bag/bag.style';
import { changeSelectedSize, deleteFromCartQuery } from '@/tools';
import QuantityButtons from './QuantityButtons';

const BagItem: React.FC<BagItemProps> = ({ item }) => {
  const { data: session } = useSession();
  const handleChange = (event: SelectChangeEvent<TSelectedSize>) => {
    changeSelectedSize(item, Number(event.target.value), session?.user?.id);
  };

  const onDelete = () => {
    deleteFromCartQuery(item.id, item.selectedSize, session?.user?.id);
    enqueueSnackbar('Succesfully deleted from cart', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  return (
    <Box sx={styles.root}>
      <Box component="picture" sx={styles.picture}>
        <Link href={'/products/' + item.id}>
          {item.images?.data ? (
            <Image
              src={item?.images?.data[0]?.attributes?.url}
              alt="sneakers"
              fill
              style={{ minWidth: '102px' }}
            />
          ) : (
            <Paper sx={styles.noImagePaper}>
              <Image
                fill
                src="/icons/galleryIcon.svg"
                alt="icon"
                style={{ minWidth: '102px' }}
              />
            </Paper>
          )}
        </Link>
      </Box>
      <Box sx={styles.about}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          <Box sx={{ flex: '1' }}>
            <Link
              href={'/products/' + item.id}
              style={{ textDecoration: 'none' }}
            >
              <Tooltip title={item.name} placement="top-end">
                <Typography variant="h4" sx={styles.name}>
                  {item.name}
                </Typography>
              </Tooltip>
            </Link>
            <Typography variant="body1" sx={styles.gender}>
              {item.gender?.data?.attributes.name}&apos;s Shoes
            </Typography>
            <Typography variant="h2" sx={styles.inStockText}>
              In Stock
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="h4">size:</Typography>
              <Select
                value={item.selectedSize}
                onChange={handleChange}
                MenuProps={{ disableScrollLock: true }}
                sx={styles.selectSize}
              >
                {item.selectedSize === 'unselected' && (
                  <MenuItem value="unselected" sx={styles.selectSize_menuItem}>
                    unselected
                  </MenuItem>
                )}
                {item?.sizes?.data.map(size => (
                  <MenuItem
                    key={'k' + size.id + item.id}
                    value={size.attributes.value}
                    sx={styles.selectSize_menuItem}
                  >
                    EU-{size.attributes.value}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Box>
            <Tooltip title={`$${item.price}`} placement="top-end">
              <Typography sx={styles.price}>${item.price}</Typography>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={styles.amountButtons}>
          <QuantityButtons item={item} />
          <Button sx={styles.deleteButton} onClick={onDelete}>
            <Box sx={styles.deleteIconWrapper}>
              <Image
                layout="fill"
                objectFit="contain"
                src={'/icons/trash.svg'}
                alt="trash"
              />
            </Box>
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BagItem;
