import ProductInfoForm from './ProductInfoForm';

const title = 'Add a product';
const description = `Fill out the fields below to add a new product to the catalog. Enter the product name, price, gender, brand, and a detailed description. You can also upload images of the product.`;

// TODO: ProfileSidebar is breaking some of the styles, make it permanent after md(900px) screens
const AddProductForm = () => {
  return <ProductInfoForm title={title} desc={description} isEdit={false} />;
};

export default AddProductForm;
