import React from 'react';
import {useApolloClient, ApolloProvider} from '@apollo/react-hooks';
// import pgDataProvider from 'ra-postgraphile'
import pgDataProvider from './ra-postgraphiql/factory'
import client from './apollo';
import { useState, useEffect } from 'react';
import {
  Admin,
  Create,
  Edit,
  Resource,
  List,
  Datagrid,
  RichTextField,
  RichTextInput, 
  TextField,
  TextInput,
  NumberInput,
  DateField,
  DateInput,
  SimpleForm,
  EditButton,
  ReferenceField,
  ReferenceManyField,
  SingleFieldList,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

import { isAuthenticated } from './auth'
import Login from './login'

function Thing(props) {
  console.log(props)
  return (
    null
  )
}

const MealList = (props) => (
  <List {...props}>
    <Datagrid>
      <EditButton basePath="/meals" />
      <TextField source="id"/>
      <TextField source="rowId"/>
      <TextField source="nameEn"/>
      <TextField source="descriptionEn"/>
      <TextField source="photoUrl"/>
      <TextField source="videoUrl"/>
      <RichTextField source="method"/>
      <DateField source="createdAt" showTime/>
      <DateField source="updatedAt" showTime/>
      <ReferenceManyField  label="Measures" reference="measures" target="mealId">
        <Datagrid>
          <TextField source="id"/>
          <TextField source="unit"/>
          <TextField source="mealId"/>
          <TextField source="quantity"/>
          <TextField source="productId"/>
          <ReferenceField label="Product" reference="products" source="productId">
              <TextField source="nameEn"/>
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
    </Datagrid>
  </List>
)

export const MealCreate = (props) => (
  <Create title="Create a Meal" {...props}>
      <SimpleForm>
        <TextInput source="nameEn"/>
        <TextInput source="code"/>
        <TextInput source="photoUrl"/>
        <TextInput source="videoUrl"/>
        <TextInput source="descriptionEn"/>
        <TextInput multiline source="method"/>
        <NumberInput source="cookingDuration"/>
        <NumberInput source="serves" />
      </SimpleForm>
  </Create>
);

export const MealEdit = (props) => (
  <Edit title="Create a Meal" {...props}>
      <SimpleForm>
        <TextInput source="nameEn"/>
        <TextInput source="code"/>
        <TextInput source="photoUrl"/>
        <TextInput source="videoUrl"/>
        <TextInput source="descriptionEn"/>
        <TextInput multiline source="method"/>
        <NumberInput source="cookingDuration"/>
        <NumberInput source="serves" />
      </SimpleForm>
  </Edit>
)

const MeasureList = (props) => (
  <List {...props}>
    <Datagrid>
      <EditButton basePath="/meals" />
      <TextField source="id"/>
      <TextField source="unit"/>
      <TextField source="mealId"/>
      <TextField source="quantity"/>
      <TextField source="productId"/>
      <ReferenceField label="Product" reference="products" source="productId">
        <TextField source="nameEn"/>
      </ReferenceField>
      <ReferenceField label="Meal" reference="products" source="mealId">
        <TextField source="nameEn"/>
      </ReferenceField>
    </Datagrid>
  </List>
)

const MeasureCreate = (props) => (
  <Create title="Create a Measure" {...props}>
    <SimpleForm>
      <TextInput source="unit"/>
      <NumberInput source="quantity"/>
      <ReferenceInput label="Meal" source="mealId" reference="meals">
        <SelectInput optionText="nameEn" />
      </ReferenceInput>
      <ReferenceInput label="Product" source="productId" reference="products">
        <SelectInput optionText="nameEn" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

const ProductsList = (props) => (
  <List {...props}>
    <Datagrid>
      <EditButton basePath="/products" />
      <TextField source="id"/>
      <TextField source="rowId"/>
      <TextField source="nameEn"/>
      <TextField source="unit"/>
      <TextField source="price"/>
      <TextField source="quantity"/>
      <ReferenceManyField  label="Measures" reference="measures" target="productId">
        <SingleFieldList>
          <TextField source="id"/>
        </SingleFieldList>
      </ReferenceManyField>
    </Datagrid>
  </List>
)

export const ProductsCreate = (props) => (
  <Create title="Create a Product" {...props}>
      <SimpleForm>
        <TextInput source="nameEn"/>
        <TextInput source="code"/>
        <NumberInput source="price"/>
        <NumberInput source="quantity"/>
        <TextInput source="unit"/>
      </SimpleForm>
  </Create>
);

export const ProductsEdit = (props) => (
  <Edit title="Edit Product" {...props}>
      <SimpleForm>
        <TextInput source="nameEn"/>
        <TextInput source="code"/>
        <NumberInput source="price"/>
        <NumberInput source="quantity"/>
        <TextInput source="unit"/>
      </SimpleForm>
  </Edit>
);


export const ClientList = (props) => (
  <List {...props}>
    <Datagrid>
      <EditButton basePath="/clients" />
      <TextField source="id"/>
      <TextField source="rowId"/>
      <TextField source="clientId" />
    </Datagrid>
  </List>
)

export const ClientCreate= (props) => (
  <Create title="Create a Client" {...props}>
      <SimpleForm>
        <TextInput source="clientId"/>
      </SimpleForm>
  </Create>
)

export const ClientEdit = (props) => (
  <Edit title="Edit Client" {...props}>
      <SimpleForm>
        <TextInput source="clientId"/>
      </SimpleForm>
  </Edit>
);

const AppAdmin = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    (async () => {
      const provider = await pgDataProvider(client);
      setDataProvider(() => provider);
    })()
  }, [client]);

  return (
    dataProvider && (
      <Admin dataProvider={dataProvider}>
        <Resource
          name="meals"
          list={MealList}
          edit={MealEdit}
          create={MealCreate}
          
        />
        <Resource
          list={ProductsList}
          create={ProductsCreate}
          edit={ProductsEdit}
          name="products" 
        />
        <Resource
          list={MeasureList}
          create={MeasureCreate}
          name="measures" 
        />
        <Resource
          list={ClientList}
          create={ClientCreate}
          edit={ClientEdit}
          name="clients" 
        />
      </Admin>
    )
  )
}
const App = () => {
  if (!isAuthenticated()) {
    return <Login />
  }
  return (
    <ApolloProvider client={client}>
      <AppAdmin/>
    </ApolloProvider>
  )
}

export default App;