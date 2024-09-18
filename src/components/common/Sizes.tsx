'use client';

import {Button, Grid} from '@mui/material';
import {useState} from 'react';

import {BaseWithValue, Data} from '@/lib/types';

export default function Sizes({sizes}: {sizes: Data<BaseWithValue>[]}) {
  const [choosedSize, setChoosedSize] = useState(0);

  return sizes
    .sort((a, b) => +a.attributes.value - +b.attributes.value)
    .map(({id, attributes: {value}}) => {
      const isChecked = id === choosedSize;
      return (
        <Grid key={id} xs={3} sm={2} md={3} lg={2} item>
          <Button
            sx={{
              width: '100%',
              fontWeight: 'fontWeighRegular',
              fontSize: {xs: 10, sm: 15},
              textTransform: 'uppercase',
              borderColor: 'grey.700',
              p: {xs: '8px 15px', sm: '10px 20px'},
              '&:hover': {
                borderColor: 'grey.700',
                backgroundColor: 'grey.100',
              },
              borderRadius: '12px',
              color: isChecked ? 'white' : 'text.secondary',
            }}
            variant={isChecked ? 'contained' : 'outlined'}
            onClick={() => setChoosedSize(id)}
          >
            EU-{value}
          </Button>
        </Grid>
      );
    });
}
