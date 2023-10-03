import {
  BooleanField,
  Datagrid,
  EditButton,
  List,
  ListProps,
  NumberField,
  ReferenceManyField,
  SingleFieldList,
  TextField,
  FunctionField,
  UrlField,
} from "react-admin";
import { ListField } from "../ListField";
import { NutritionShow } from "../Nutrition/NutritionShow";

export const ProductList = (props: ListProps) => {
  const convertToKilograms = (value: number, unit: string) => {
    if (unit === "g") {
      return (value / 1000).toFixed(2);
    } else if (unit === "lb") {
      return (value / 2.2).toFixed(2);
    } else {
      return value;
    }
  };

  const convertToLiters = (value: number, unit: string) => {
    if (unit === "ml" || unit === "mL") {
      return value / 1000;
    } else if (unit === "oz") {
      return value * 0.0295735;
    } else {
      return value;
    }
  };

  const formatUnit = (unit: string) => {
    const unitMapping: Record<string, string> = {
      g: "kg",
      lb: "kg",
      ml: "L",
      mL: "L",
      oz: "L",
    };
    return unitMapping[unit] || unit;
  };

  return (
    <List {...props} title="ProductList">
      <Datagrid expand={NutritionDetails}>
        <TextField source="id" fullWidth />
        <TextField source="nameEn" fullWidth />
        <TextField source="nameFr" fullWidth />
        <TextField source="code" />
        <NumberField source="price" />
        <FunctionField
          label="Quantity"
          render={(record: any) => {
            const convertedQuantity =
              record.unit === "g" || record.unit === "lb"
                ? convertToKilograms(record.quantity, record.unit)
                : convertToLiters(record.quantity, record.unit);

            return `${convertedQuantity}`;
          }}
        />
        <FunctionField
          label="Unit"
          render={(record: any) => {
            return formatUnit(record.unit);
          }}
        />
        <BooleanField source="isArchived" />
        <TextField source="upc" />
        <UrlField source="sourceLink" />
        <ListField source="tags" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const NutritionDetails = () => {
  return (
    <>
      <h3>Nutrition Information</h3>
      <ReferenceManyField
        reference="nutrition"
        target="nutritionableId"
        filter={{ nutritionableType: "product" }}
      >
        <SingleFieldList>
          <NutritionShow />
        </SingleFieldList>
      </ReferenceManyField>
    </>
  );
};
