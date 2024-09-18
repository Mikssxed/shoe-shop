import {
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  SxProps,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import EditProductModal from '../EditProductModal';
import DeleteModal from './DeleteModal';

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
};

const ButtonMenu = ({
  name,
  productid,
  onDeleteProduct,
  onEditProduct,
  ...props
}: ButtonMenuProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  return (
    <>
      <EditProductModal open={openEdit} onClose={() => setOpenEdit(false)} />
      <Menu {...props}>
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
            <Typography fontWeight={300}>View</Typography>
          </MenuItem>
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={e => {
              setOpenEdit(true);
              props.onClose?.(e, 'backdropClick');
            }}
          >
            <Typography fontWeight={300}>Edit</Typography>
          </MenuItem>
          <MenuItem
            sx={styles.menuItem}
            onClick={e => {
              setOpenDeleteModal(true);
              props.onClose?.(e, 'backdropClick');
            }}
          >
            <Typography fontWeight={300}>Delete</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteModal
        name={name}
        text="Warning: Deleting this product will permanently remove it from the system. This action cannot be undone. Are you sure you want to proceed?"
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => {
          onDeleteProduct();
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
};
export default ButtonMenu;
