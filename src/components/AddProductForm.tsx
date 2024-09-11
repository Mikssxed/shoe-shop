import ProductInfoForm from "./ProductInfoForm";

const title = "Add a product";
const description = `Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
  graphic or web designs. The passage is attributed to an unknown typesetter in the 15th
  century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum
  for use in a type specimen book. It usually begins with:`;

// TODO: ProfileSidebar is breaking some of the styles, make it permanent after md(900px) screens
const AddProductForm = () => {
  return <ProductInfoForm title={title} desc={description} isEdit={false} />;
};

export default AddProductForm;
