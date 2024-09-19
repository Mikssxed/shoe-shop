'use client';

import {Button, SxProps} from '@mui/material';

const styles: Record<string, SxProps> = {
  productContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  productLabel: {
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 300,
    maxWidth: '100%',
    lineBreak: 'anywhere',
  },
  actionButton: {
    flexBasis: '50%',
    p: {
      xs: '10px 15px',
      sm: '16px 20px',
    },
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default function ActionButtons({id}: {id: string}) {
  const addToBag = () => {
    //TODO: add to bag logic
  };

  const addToFav = () => {
    //TODO: add to fav logic
  };

  return (
    <>
      <Button onClick={addToFav} variant="outlined" sx={styles.actionButton}>
        Favorite
      </Button>
      <Button onClick={addToBag} variant="contained" sx={styles.actionButton}>
        Add to Bag
      </Button>
    </>
  );
}
