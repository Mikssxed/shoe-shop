'use client';

import Image from 'next/image';
import { Box, Skeleton, Typography } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';

import { OrderStatusProps } from '@/lib/types';
import { orderStatusStyle as styles } from '@/styles/orderHistory/order.style';
import { stylingConstants } from '@/lib/constants';

const OrderStatus = ({ status, isUpdating }: OrderStatusProps) => {
  const [isAfterUpdate, setIsAfterUpdate] = useState(false);

  useEffect(() => {
    if (!isAfterUpdate && !isUpdating) setIsAfterUpdate(true);
  }, [isUpdating]);

  const statusColor = useMemo(
    () =>
      status === 'received'
        ? '#3D9D41'
        : status === 'cancelled'
          ? '#CD3C37'
          : stylingConstants.palette.grey[800],
    [status],
  );

  return (
    <Box sx={{ ...styles.status, order: { xs: 2, sm: 4 } }}>
      {!isAfterUpdate ? (
        <Skeleton
          variant="rectangular"
          sx={{ width: '100%', height: '20px' }}
        />
      ) : (
        <>
          <Image
            src={`/icons/${status}.svg`}
            alt={status}
            width={20}
            height={20}
          />
          <Typography variant="orderInfo" sx={{ color: statusColor }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default OrderStatus;
