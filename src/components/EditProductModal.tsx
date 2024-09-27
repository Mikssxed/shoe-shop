import ProductInfoForm from './ProductInfoForm';
import Modal from './ui/Modal';

const title = 'Edit product';
const description = `Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
  graphic or web designs. The passage is attributed to an unknown typesetter in the 15th
  century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum
  for use in a type specimen book. It usually begins with:`;

const EditProductModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      containerStyle={{
        display: 'flex',
        boxSizing: 'border-box',
        minWidth: {lg: '1150px', xl: '1487px'},
        justifyContent: 'center',
      }}
      paperStyle={{maxWidth: '100%'}}
    >
      <ProductInfoForm title={title} desc={description} isEdit={true} />
    </Modal>
  );
};

export default EditProductModal;
