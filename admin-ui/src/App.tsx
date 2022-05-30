import { useApolloClient } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import { useEffect, useState } from "react";
import {
  Admin,
  Datagrid,
  DataProvider, Layout,
  List,
  ListProps, Resource, TextField
} from "react-admin";
// import './App.css'
import { useAuth } from "./Auth";
import { Login } from "./Login";
import { MealEdit } from "./Meals/MealEdit";
import { MealList } from "./Meals/MealList";



const ProductList = (props: ListProps) => {
  return (
    <List {...props} title="Products List">
      <Datagrid>
        <TextField source="rowId"></TextField>
      </Datagrid>
    </List>
  );
};

function App() {
  const auth = useAuth();
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    pgDataProvider(client, {
      typeMap: {
        Meal: { excludeFields: ["id"] },
        Product: { excludeFields: ["id"] },
        Measure: { excludeFields: ["id"]}
      },
    })
      .then((resolvedValue) => setDataProvider(resolvedValue))
      .catch((error) => console.log(error));
    // this can also be written as
    // pgDataProvider(client).then(setDataProvider).catch(console.log);
  }, []);

  return (
    <div className="App">
      <main>
        {auth.currentPerson === null ? (
          <Login />
        ) : (
          dataProvider && (
            <Admin dataProvider={dataProvider} layout={Layout}>
              <Resource name="meals" list={MealList}  edit={MealEdit} />

              <Resource name="products" list={ProductList} />
            </Admin>
          )
        )}
      </main>
    </div>
  );
}

export default App;
