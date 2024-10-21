import { ProductForm } from '@/components/forms';
import { ProductAttributes } from '@/lib/types';
import Modal from '../ui/Modal';

const title = 'Duplicate product';
const description = `This product is a duplicate. Use the form below to edit the details of the copied product. Update the product name, price, gender, brand, and description as needed. You can also upload or remove product images.`;

const DuplicateProductModal = ({
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
      dataTestId="duplicate-product-modal"
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
        product={product}
        onClose={onClose}
        openEditModal={open}
        duplicate
      />
    </Modal>
  );
};

export default DuplicateProductModal;
