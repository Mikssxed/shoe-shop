'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Order from './Order';
import OrderListSkeleton from './OrderListSkeleton';
import { orderListStyle as styles } from '@/styles/orderHistory/order.style';
import { useOrders } from '@/tools';
import { useIntersectionObserver, useUpdateOrderStatuses } from '@/hooks';
import { OrdersListProps } from '@/lib/types';

const OrdersList = ({ user, initialOrders }: OrdersListProps) => {
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const {
    data: ordersHistory = [],
    isFetching: isLoading,
    hasNextPage,
    fetchNextPage,
  } = useOrders(user, initialOrders);
  const bottomElementRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { data: orderStatuses, isUpdating } = useUpdateOrderStatuses(
    ordersHistory,
    isLoading,
  );

  useEffect(() => {
    setOrderIds(searchParams.getAll('id'));
  }, [isLoading, searchParams]);
  useIntersectionObserver(hasNextPage, fetchNextPage, bottomElementRef);

  return (
    <>
      {!isLoading && ordersHistory && ordersHistory.length <= 0 ? (
        <Box sx={{ mt: 'calc(50vh - 140px)' }}>
          <Typography variant="h4" textAlign="center">
            You don&apos;t have any orders yet
          </Typography>
          <Typography variant="body2" textAlign="center">
            After you make an order you can check details and status of it here
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={styles.container}>
            {ordersHistory &&
              ordersHistory.map((order, index) => (
                <Order
                  key={index}
                  invoice={order.invoice}
                  paymentIntent={order.paymentIntent}
                  isOpen={orderIds.includes(order.paymentIntent.id)}
                  isStatusUpdating={isUpdating}
                  status={
                    orderStatuses?.get(order.paymentIntent.id)?.status ||
                    'shipped'
                  }
                />
              ))}
            {initialOrders.length > 0 &&
              initialOrders[initialOrders.length - 1].has_more &&
              isLoading && <OrderListSkeleton />}
          </Box>
          <div ref={bottomElementRef} />
        </>
      )}
    </>
  );
};

export default OrdersList;
