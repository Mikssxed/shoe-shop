import { ProductForm } from '@/components/forms';
import Modal from '../ui/Modal';
import { ProductAttributes } from '@/lib/types';

const title = 'Edit product';
const description = `Use the form below to edit the details of the product. Update the product name, price, gender, brand, and description as needed. You can also upload or remove product images.`;

const EditProductModal = ({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: ProductAttributes;
}) => {
  return (
    <Modal
      dataTestId="edit-product-modal"
      open={open}
      onClose={onClose}
      containerStyle={{
        display: open ? 'flex' : 'none',
        boxSizing: 'border-box',
        minWidth: { lg: '1150px', xl: '1487px' },
        justifyContent: 'center',
      }}
      paperStyle={{
        maxWidth: '100%',
        p: { sm: '20px', md: '32px' },
        paddingInline: { md: '40px 65px' },
      }}
    >
      <ProductForm
        title={title}
        desc={description}
        mode="edit"
        product={product}
        onClose={onClose}
        openEditModal={open}
      />
    </Modal>
  );
};

export default EditProductModal;
