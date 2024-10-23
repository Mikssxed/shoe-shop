'use client';

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

import { BagItemProps, TSelectedSize } from '@/lib/types';
import { bagItemStyles as styles } from '@/styles/bag/bag.style';
import { changeSelectedSize, deleteFromCartQuery } from '@/tools';
import { DeleteModal } from '../modals';
import QuantityButtons from './QuantityButtons';

const BagItem: React.FC<BagItemProps> = ({ item }) => {
  const { data: session } = useSession();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleChange = (event: SelectChangeEvent<TSelectedSize>) => {
    changeSelectedSize(item, Number(event.target.value), session?.user?.id);
  };

  const openModal = () => setOpenDeleteModal(true);
  const closeModal = () => setOpenDeleteModal(false);

  const onDelete = () => {
    deleteFromCartQuery(item.id, item.selectedSize, session?.user?.id);
    enqueueSnackbar('Successfully deleted from cart', {
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
              data-testid="bag-item__picture"
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: { xs: '2px', sm: '8px' },
          }}
        >
          <Box sx={{ flex: '1' }}>
            <Link
              data-testid="bag-item__link"
              href={'/products/' + item.id}
              style={{ textDecoration: 'none' }}
            >
              <Tooltip title={item.name} placement="top-end">
                <Typography
                  data-testid="bag-item__name"
                  variant="h4"
                  sx={styles.name}
                >
                  {item.name}
                </Typography>
              </Tooltip>
            </Link>
            <Typography
              data-testid="bag-item__gender"
              variant="body1"
              sx={styles.gender}
            >
              {item.gender?.data?.attributes.name}&apos;s Shoes
            </Typography>
            <Typography
              data-testid="bag-item__in-stock"
              variant="h2"
              sx={styles.inStockText}
            >
              In Stock
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' } }}
              >
                size:
              </Typography>
              <Select
                value={item.selectedSize}
                onChange={handleChange}
                MenuProps={{ disableScrollLock: true }}
                inputProps={{ 'data-testid': 'bag-item__size' }}
                sx={styles.selectSize}
              >
                {item.selectedSize === 'unselected' && (
                  <MenuItem value="unselected" sx={styles.selectSize_menuItem}>
                    unselected
                  </MenuItem>
                )}
                {item?.sizes?.data.map(size => (
                  <MenuItem
                    data-testid={'bag-item__size__option'}
                    key={'k' + size.id + item.id}
                    value={size.attributes.value}
                    sx={styles.selectSize_menuItem}
                  >
                    {`EU-${size.attributes.value}`}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Box>
            <Tooltip title={`$${item.price}`} placement="top-end">
              <Typography data-testid="bag-item__price" sx={styles.price}>
                ${item.price}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={styles.amountButtons}>
          <QuantityButtons item={item} />
          <Button
            data-testid="bag-item__delete-button"
            sx={styles.deleteButton}
            onClick={openModal}
          >
            <Box sx={styles.deleteIconWrapper}>
              <Image
                fill
                style={{ objectFit: 'contain' }}
                src={'/icons/trash.svg'}
                alt="trash"
              />
            </Box>
            Delete
          </Button>
        </Box>
      </Box>
      <DeleteModal
        name={item.name}
        text="Warning: Are you sure you want to remove the selected item from your cart?"
        open={openDeleteModal}
        onClose={closeModal}
        onSubmit={() => {
          setOpenDeleteModal(false);
          onDelete();
        }}
      />
    </Box>
  );
};

export default BagItem;
