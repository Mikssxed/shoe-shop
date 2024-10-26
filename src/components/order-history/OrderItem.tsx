import { Box, Typography, Tooltip } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

import { orderItemStyle as styles } from '@/styles/orderHistory/order.style';
import OrderDetail from './OrderDetail';
import { OrderItemProps } from '@/lib/types';
import { formatAmount } from '@/utils';

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <Box sx={styles.orderItemSection}>
      <Box sx={styles.infoContainer}>
        <Link href={`/products/${item.metadata.id}`}>
          <Box sx={styles.pictureContainer}>
            <Image
              src={item.metadata.image}
              alt="order item"
              fill
              sizes="104px"
              style={styles.picture}
            />
          </Box>
        </Link>
        <Box sx={styles.about}>
          <Link
            href={`/products/${item.metadata.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Tooltip
              title={`${item.metadata.name || item.description}`}
              placement="top-end"
            >
              <Typography variant="h2" sx={styles.name}>
                {item.metadata.name || item.description}
              </Typography>
            </Tooltip>
          </Link>
          <Typography variant="body1">
            {item.metadata.gender}&apos;s Shoes
          </Typography>
          <Typography variant="orderInfo" sx={styles.size}>
            Size: EU-{item.metadata.size}
          </Typography>
        </Box>
      </Box>
      <OrderDetail
        labelText={'Quantity:'}
        infoText={item.metadata.quantity}
        containerStyle={styles.quantity}
      />
      <OrderDetail
        labelText={'Price:'}
        infoText={`${formatAmount(item.amount / 100 / parseInt(item.metadata.quantity))}$`}
        containerStyle={styles.price}
      />
    </Box>
  );
};

export default OrderItem;
