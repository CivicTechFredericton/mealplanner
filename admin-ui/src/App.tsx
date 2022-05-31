import { useApolloClient } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import { useEffect, useState } from "react";
import {
  Admin,
  Datagrid,
  DataProvider,
  Layout,
  List,
  ListProps,
  Resource,
  TextField,
} from "react-admin";
import { useAuth } from "./Auth";
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
        Measure: { excludeFields: ["id"] },
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
        {dataProvider !== null && auth.raAuthProvider !== null ? (
          <Admin
            authProvider={auth.raAuthProvider}
            dataProvider={dataProvider}
            layout={Layout}
            requireAuth
          >
            <Resource name="meals" list={MealList} edit={MealEdit} />
            <Resource name="products" list={ProductList} />
          </Admin>
        ) : (
          "loading..."
        )}
      </main>
    </div>
  );
}

export default App;
