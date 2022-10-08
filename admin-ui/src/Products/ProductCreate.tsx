import { Create, CreateProps } from "react-admin";
import { ProductForm } from "./ProductForm";

export const ProductCreate = (props: CreateProps) => {
  return (
    <Create {...props} title="Create Product">
      <ProductForm />
    </Create>
  );
};
