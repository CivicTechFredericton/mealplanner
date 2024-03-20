import { useState } from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  ImageField,
  List,
  ListProps,
  NumberField,
  ReferenceManyField,
  RichTextField,
  SingleFieldList,
  Tab,
  TabbedShowLayout,
  TextField,
  useRecordContext
} from "react-admin";
import { Link } from "react-router-dom";
import { ListField } from "../ListField";
import { NutritionShow } from "../Nutrition/NutritionShow";
import CustomSearchInput from "../components/CustomSearchInput";

const VideoField = (props) => {
  const record = useRecordContext(props);
  if (record.videoUrl === null) return null;
  return (
    <div className="video-responsive">
      <iframe
        width="250px"
        src={"https://youtube.com/embed/".concat(
          record.videoUrl.slice(record.videoUrl.search("=") + 1)
        )}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
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
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
};

const Details = () => {
  const meal = useRecordContext();
  return (
    <>
      <TabbedShowLayout syncWithLocation={false}>
        <Tab label="Method">
          <RichTextField source="method" />
          <Link to={`${meal.id}/ingredients`}>Ingredients</Link>
        </Tab>
        <Tab label="Summary">
          <NumberField source="prepTime" />
          <NumberField source="cookTime" />
          <NumberField source="totalCost" />
          <NumberField source="servingCost" />
          <TextField source="tips" />
          <NumberField source="servingsSize" />
          <TextField source="servingsSizeUnit" />
          <NumberField source="portions" />
          <NumberField source="nutritionRating" />
          <TextField source="descriptionEn" />
          <TextField source="descriptionFr" />

          <DateField source="createdAt" showTime />
          <DateField source="updatedAt" showTime />
        </Tab>
        <Tab label="Nutrition">
          <ReferenceManyField
            reference="nutrition"
            target="nutritionableId"
            filter={{ nutritionableType: "meal" }}
          >
            <SingleFieldList>
              <NutritionShow />
            </SingleFieldList>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </>
  );
};
