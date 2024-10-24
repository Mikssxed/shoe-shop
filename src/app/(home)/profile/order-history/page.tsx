import { Typography, Box } from '@mui/material';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import OrdersList from '@/components/order-history/OrdersList';
import { getInitialOrders } from '@/tools';

export default async function OrderHistory() {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  if (!user) {
    return null;
  }

  const initialOrders = await (await getInitialOrders(user.id)).json();

  return (
    <Box sx={{ p: { xs: '24px 12px', md: 0 } }}>
      <Typography variant="h1" sx={{ pl: { xs: '8px', md: 0 } }}>
        Order history
      </Typography>
      <OrdersList user={user} initialOrders={initialOrders} />
    </Box>
  );
}
