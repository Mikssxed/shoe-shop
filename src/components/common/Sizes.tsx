'use client';

import {sortSizes} from '@/utils';
import {Button, Grid} from '@mui/material';
import {useMemo, useState} from 'react';

import {BaseWithValue, Data} from '@/lib/types';

export default function Sizes({sizes}: {sizes: Data<BaseWithValue>[]}) {
  const [choosedSize, setChoosedSize] = useState(0);

  const sortedSizes = useMemo(() => sortSizes([...sizes]), [sizes]);

  return sortedSizes.map(({id, attributes: {value}}) => {
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
