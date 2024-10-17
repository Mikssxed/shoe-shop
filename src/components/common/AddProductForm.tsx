import { ProductForm } from '@/components/forms';

const title = 'Add a product';
const description = `Fill out the fields below to add a new product to the catalog. Enter the product name, price, gender, brand, and a detailed description. You can also upload images of the product.`;

const AddProductForm = () => {
  return <ProductForm title={title} desc={description} />;
};

export default AddProductForm;
