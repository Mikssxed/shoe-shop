'use client';

import { useState, useEffect } from 'react';

import { Order, OrderStatus } from '@/lib/types';
import { saveOrderStatuses, useOrderStatuses } from '@/tools';

/**
 * A custom hook that updates the statuses of orders.
 *
 * @param {PaymentIntent[]} orders - array of orders.
 * @param {Map<string, SavedOrderStatus>} statuses - map of order statuses containing current status and timestamp of last update (updates each day).
 * @returns {Map<string, SavedOrderStatus> | undefined} - updated orders.
 *
 */
const useUpdateOrderStatuses = (orders: Order[], isDataLoading: boolean) => {
  const { data: statuses } = useOrderStatuses();
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    setIsUpdating(true);
  }, [orders]);

  useEffect(() => {
    if (!isDataLoading && statuses && isUpdating) {
      const newMapOfStatuses = new Map(statuses);
      const now = new Date();
      let updated = false;

      orders.forEach((order, index) => {
        const orderStatus = newMapOfStatuses.get(order.paymentIntent.id);
        if (
          !newMapOfStatuses.has(order.paymentIntent.id) ||
          (orderStatus?.status === 'shipped' &&
            new Date(orderStatus?.updated).toDateString() != now.toDateString())
        ) {
          const day = 1000 * 60 * 60 * 24;
          const timeSinceOrder =
            new Date().getTime() -
            new Date(order.paymentIntent.created * 1000).getTime();
          const random = Math.floor(Math.random() * 10 + 1);

          let newStatus: OrderStatus;

          if (timeSinceOrder > day * 7)
            newStatus = random > 2 ? 'received' : 'cancelled';
          else if (timeSinceOrder > day * 2)
            newStatus =
              random > 6
                ? 'shipped'
                : (newStatus = random > 2 ? 'received' : 'cancelled');
          else if (timeSinceOrder > day)
            newStatus = random > 2 ? 'shipped' : 'cancelled';
          else newStatus = 'shipped';

          newMapOfStatuses.set(order.paymentIntent.id, {
            status: newStatus,
            updated: new Date().getTime(),
          });
          updated = true;
        }
      });

      setIsUpdating(false);
      if (updated) saveOrderStatuses(newMapOfStatuses);
    }
  }, [orders, isDataLoading, isUpdating]);
  return { data: statuses, isUpdating };
};

export default useUpdateOrderStatuses;
