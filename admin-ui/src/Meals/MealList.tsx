import { useState } from "react";
import {
  Datagrid,
  EditButton,
  ImageField,
  List,
  ListProps,
  NumberField,
  ShowButton,
  TextField,
} from "react-admin";
import { Link } from "react-router-dom";
import { ListField } from "../ListField";
import CustomSearchInput from "../components/CustomSearchInput";
import { Details, VideoField } from "./MealDetails";

export const MealList = (props: ListProps) => {
  const [data, setData] = useState<string[]>([]);
  const handleSearchResult = (data: string[]) => {
    setData(data);
  };

  return (
    <>
      <CustomSearchInput onSearch={handleSearchResult} />
      <List
        {...props}
        title="Meals List"
        filter={{
          rowId: data,
          order: "ASC",
          page: 1,
          perPage: 10,
          sort: "id",
        }}
      >
        <Datagrid expand={Details}>
          <TextField source="id" />
          <TextField source="nameEn" />
          <NumberField source="code" />
          <TextField source="nameFr" />
          <ListField label="Tags" source="tags" />
          <ImageField source="photoUrl" />
          <VideoField source="videoUrl" />
          <ListField source="categories" />
          <ShowButton />
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
};
