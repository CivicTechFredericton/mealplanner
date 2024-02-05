import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ListContextProvider,
  ListProps,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  SearchInput,
  SingleFieldList,
  Tab,
  TabbedShowLayout,
  TextField,
  TextInput,
  UrlField,
  UseListOptions,
  useDataProvider,
  useList,
  useListContext,
} from 'react-admin';
import CustomSearchInput from '../components/CustomSearchInput';
import { useEffect, useState } from 'react';
import { ListField } from '../ListField';
import { NutritionShow } from '../Nutrition/NutritionShow';
import { MealType } from './service';

const postFilters = [
  <TextInput source='tags' />,
  <TextInput source='code' />,
  <TextInput source='nameEn' />,
  <TextInput source='nameFr' />,
  <TextInput source='descriptionEn' />,
  <TextInput source='descriptionFr' />,
  <TextInput source='Categories' />,
];

export const MealList = (props: ListProps) => {
  const [data, setData] = useState<MealType[]>([]);

  const handleSearchResult = (data: MealType[]) => {
    setData(data);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <CustomSearchInput onSearch={handleSearchResult} />
      <List
        {...props}
        title='Meals List'
        filters={postFilters}
        filter={{
          rowId: data,
          order: 'ASC',
          page: 1,
          perPage: 10,
          sort: 'id',
        }}
      >
        <Datagrid expand={Details}>
          <TextField source='id' />
          <TextField source='code' />
          <TextField source='nameEn' />
          <TextField source='nameFr' />
          <ListField label='tags' source='tags' />
          <TextField source='descriptionEn' />
          <TextField source='descriptionFr' />
          <ListField source='categories' />
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
};

const Details = () => {
  return (
    <>
      <TabbedShowLayout syncWithLocation={false}>
        <Tab label='Method'>
          <RichTextField source='method' />
          <ReferenceManyField label='Measures' reference='measures' target='mealId'>
            <Datagrid>
              {/* <TextField source="rowId" /> */}
              <TextField source='productId' label='Product ID' />
              <ReferenceField label='Product Name' reference='products' source='productId'>
                <TextField source='nameEn' />
              </ReferenceField>
              <TextField label='Nom du Produit' source='nameFr' />
              <TextField source='unit' />
              <TextField source='quantity' />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label='Summary'>
          <NumberField source='cookingDuration' />
          <NumberField source='totalCost' />
          <NumberField source='servingCost' />
          <TextField source='tips' />
          <NumberField source='servingsSize' />
          <TextField source='servingsSizeUnit' />
          <NumberField source='serves' />
          <NumberField source='nutritionRating' />
          <UrlField source='photoUrl' />
          <UrlField source='videoUrl' />
          <DateField source='createdAt' showTime />
          <DateField source='updatedAt' showTime />
        </Tab>
        <Tab label='Nutrition'>
          <ReferenceManyField
            reference='nutrition'
            target='nutritionableId'
            filter={{ nutritionableType: 'meal' }}
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
