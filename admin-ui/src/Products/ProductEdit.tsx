import { Edit, EditProps } from "react-admin";
import { ProductForm } from "./ProductForm";

export const ProductEdit = (props: EditProps) => {
  return (
    <Edit {...props} title="Edit Product">
      <ProductForm />
    </Edit>
  );
};
