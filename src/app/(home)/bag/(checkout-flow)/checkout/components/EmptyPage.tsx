import EmptyProductList from '@/components/common/EmptyProductList';
import { bagPageStyles as styles } from '@/styles/bag/bag.style';
import { Container, Typography } from '@mui/material';

export default function EmptyPage() {
  return (
    <Container component={'main'} maxWidth="xl" sx={styles.emptyCart_main}>
      <Typography
        data-testid="bag__title-desktop-empty"
        variant="h1"
        sx={styles.emptyCart_rootTitle}
      >
        Cart
      </Typography>
      <EmptyProductList
        text={"You don't have any products yet"}
        subtext={'Add something to your cart'}
        link={'/products'}
        buttonText={'Add product'}
      />
    </Container>
  );
}
