import ProductInfoForm from './ProductInfoForm';
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
      open={open}
      onClose={onClose}
      containerStyle={{
        display: 'flex',
        boxSizing: 'border-box',
        minWidth: { lg: '1150px', xl: '1487px' },
        justifyContent: 'center',
      }}
      paperStyle={{ maxWidth: '100%' }}
    >
      <ProductInfoForm
        title={title}
        desc={description}
        isEdit={true}
        product={product}
        onClose={onClose}
        openEditModal={open}
      />
    </Modal>
  );
};

export default EditProductModal;
