'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import OrderItem from './OrderItem';
import OrderDetail from './OrderDetail';
import OrderStatus from './OrderStatus';
import { OrderProps } from '@/lib/types';
import { orderStyle as styles } from '@/styles/orderHistory/order.style';
import { stylingConstants } from '@/lib/constants/themeConstants';
import { formatAmount } from '@/utils';

const Order = ({
  invoice,
  paymentIntent,
  isOpen,
  isStatusUpdating,
  status,
}: OrderProps) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => setOpen(isOpen), [isOpen]);

  return (
    <Accordion disableGutters sx={styles.card} expanded={open}>
      <AccordionSummary sx={styles.summary} onClick={() => setOpen(!open)}>
        <Box sx={styles.summaryItems}>
          <OrderDetail
            labelText={paymentIntent.id.slice(0, 10)}
            infoText={new Date(
              paymentIntent.created * 1000,
            ).toLocaleDateString()}
            reversed={true}
            containerStyle={{ width: { md: '160px', lg: '170px' } }}
          />
          <OrderDetail
            labelText={'Products:'}
            infoText={`${invoice.lines.data.reduce((sum, line) => sum + parseInt(line.metadata.quantity), 0)}`}
            containerStyle={styles.summaryProducts}
          />
          <OrderDetail
            labelText={'Summary:'}
            infoText={`${formatAmount(paymentIntent.amount / 100)}$`}
            containerStyle={styles.summaryPrice}
          />
          <OrderStatus status={status} isUpdating={isStatusUpdating} />
          <Box sx={{ ...styles.arrow, order: { xs: 3, sm: 5 } }}>
            {open ? (
              <ArrowUp2 color={stylingConstants.palette.grey[800]} />
            ) : (
              <ArrowDown2 color={stylingConstants.palette.grey[800]} />
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={styles.details}>
        <Box sx={styles.deliverySection}>
          <OrderDetail
            labelText={'Delivery:'}
            infoText={`${paymentIntent.shipping?.address?.line1}, ${paymentIntent.shipping?.address?.postal_code} ${paymentIntent.shipping?.address?.city}`}
            infoStyle={styles.delivery}
          />
          <OrderDetail
            labelText={'Contacts:'}
            infoText={`${paymentIntent.shipping?.name} ${paymentIntent.shipping?.phone}, ${paymentIntent.receipt_email}`}
            infoStyle={styles.contacts}
          />
          <OrderDetail
            labelText={'Payment:'}
            infoText={invoice?.metadata?.paymentMethod || 'card'}
          />
        </Box>
        {invoice.lines.data.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
        <Box sx={styles.footer}>
          {invoice.invoice_pdf && (
            <Link
              href={invoice.invoice_pdf}
              download={`Invoice_${paymentIntent.id}`}
            >
              <Image
                src={`/icons/pdf.svg`}
                alt={'pdf'}
                width={24}
                height={24}
              />
              <Typography
                variant="orderInfo"
                style={{ textDecoration: 'underline', color: '#000' }}
              >
                PDF Invoice Download{' '}
              </Typography>
            </Link>
          )}
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="orderLabel">Discount:</Typography>
            <Typography variant="orderInfo" sx={{ color: '#EB5656' }}>
              -
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Order;
