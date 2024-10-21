'use client';

import {
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  SxProps,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  DeleteModal,
  DuplicateProductModal,
  EditProductModal,
} from '@/components/modals';
import { ProductAttributes } from '@/lib/types';

const styles: Record<string, SxProps> = {
  menuItem: {
    p: '0.5rem 1rem',
    '&:hover': {
      backgroundColor: 'grey.A100',
    },
  },
};

type ButtonMenuProps = MenuProps & {
  productid: number;
  onDeleteProduct: () => void;
  name: string;
  onEditProduct?: () => void;
  product: ProductAttributes;
};

const ButtonMenu = ({
  name,
  productid,
  onDeleteProduct,
  onEditProduct,
  product,
  ...props
}: ButtonMenuProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <EditProductModal
        open={openEdit}
        product={product}
        onClose={() => setOpenEdit(false)}
      />
      <DuplicateProductModal
        open={openDuplicateModal}
        onClose={() => setOpenDuplicateModal(false)}
        product={product}
      />
      <Menu {...props} disableScrollLock={true}>
        <MenuList
          sx={{
            p: 0,
            width: '7rem',
          }}
        >
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={() => router.push(`/products/${productid}`)}
          >
            <Typography variant="menu">View</Typography>
          </MenuItem>
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={e => {
              setOpenEdit(true);
              props.onClose?.(e, 'backdropClick');
            }}
          >
            <Typography variant="menu">Edit</Typography>
          </MenuItem>
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={e => {
              setOpenDuplicateModal(true);
              props.onClose?.(e, 'backdropClick');
            }}
          >
            <Typography variant="menu">Duplicate</Typography>
          </MenuItem>
          <MenuItem
            data-testid="button-menu__delete"
            sx={styles.menuItem}
            onClick={e => {
              setOpenDeleteModal(true);
              props.onClose?.(e, 'backdropClick');
            }}
          >
            <Typography variant="menu">Delete</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteModal
        name={name}
        text="Warning: Deleting this product will permanently remove it from the system. This action cannot be undone. Are you sure you want to proceed?"
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => {
          setOpenDeleteModal(false);
          onDeleteProduct();
        }}
      />
    </>
  );
};
export default ButtonMenu;
