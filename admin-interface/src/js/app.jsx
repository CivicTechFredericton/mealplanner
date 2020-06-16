import React from 'react';
import {useApolloClient, ApolloProvider} from '@apollo/react-hooks';
import pgDataProvider from 'ra-postgraphile'
import client from './apollo';
import { useState, useEffect } from 'react';
import {Admin, Resource, List, Datagrid, RichTextField, TextField, DateField} from 'react-admin';

const MealList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="rowId"/>
      <TextField source="nameEn"/>
      <TextField source="descriptionEn"/>
      <RichTextField source="method"/>
      <DateField source="createdAt" showTime/>
      <DateField source="updatedAt" showTime/>
    </Datagrid>
  </List>
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
        <Resource name="meals" list={MealList}/>
        <Resource name="ingredients" />
      </Admin>
    )
  )
}
const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppAdmin/>
    </ApolloProvider>
  )
}

export default App;