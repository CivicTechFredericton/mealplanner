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
  DateField,
  DateInput,
  SimpleForm,
  EditButton,
} from 'react-admin';

import { isAuthenticated } from './auth'
import Login from './login'

function deleteThing() {
  return (
    <div>
      test
    </div>
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
      <RichTextField source="method"/>
      <DateField source="createdAt" showTime/>
      <DateField source="updatedAt" showTime/>
    </Datagrid>
  </List>
)

export const MealCreate = (props) => (
  <Create title="Create a Meal" {...props}>
      <SimpleForm>
        <TextInput source="rowId"/>
        <TextInput source="nameEn"/>
        <TextInput source="code"/>
        <TextInput source="photoUrl"/>
        <TextInput source="videoUrl"/>
        <TextInput source="descriptionEn"/>
        <TextInput multiline source="method"/>
        <TextInput source="cookingDuration"/>
        <TextInput source="serves" />
        <DateInput source="createdAt" showTime/>
        <DateInput source="updatedAt" showTime/>
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
        <TextInput source="cookingDuration"/>
        <TextInput source="serves" />
        <DateInput source="createdAt" showTime/>
        <DateInput source="updatedAt" showTime/>
      </SimpleForm>
  </Edit>
)

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
        <Resource name="ingredients" />
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