import { useApolloClient } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import { useEffect, useState } from "react";
import { Admin, DataProvider, Layout, Resource } from "react-admin";
import { useAuth } from "./Auth";
import { MealCreate } from "./Meals/MealCreate";
import { MealEdit } from "./Meals/MealEdit";
import { MealList } from "./Meals/MealList";
import { MeasureCreate } from "./Measure/MeasureCreate";
import { MeasureEdit } from "./Measure/MeasureEdit";
import { MeasureList } from "./Measure/MeasureList";
import { NutritionCreate } from "./Nutrition/NutritionCreate";
import { NutritionEdit } from "./Nutrition/NutritionEdit";
import { NutritionList } from "./Nutrition/NutritionList";
import { PersonList } from "./People/PersonList";
import { UserShow } from "./People/UserShow";
import { ProductCreate } from "./Products/ProductCreate";
import { ProductEdit } from "./Products/ProductEdit";
import { ProductList } from "./Products/ProductList";

function App() {
  const auth = useAuth();
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    pgDataProvider(client, {
      typeMap: {
        Meal: { excludeFields: ["id"], expand: true },
        Product: { excludeFields: ["id"] },
        Measure: { excludeFields: ["id"] },
        Person: { excludeFields: ["id"] },
        CurrentPerson: { excludeFields: ["id"] },
        CurrentUser: { excludeFields: ["id"] },
        Nutrition: { excludeFields: ["id"] },
        // AppPrivate.account: {excludeField: ["id"]}
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
            <Resource name="CurrentUser" show={UserShow} />
            <Resource
              name="meals"
              list={MealList}
              edit={MealEdit}
              create={MealCreate}
              // show={NutritionShow}
            />
            <Resource
              name="products"
              list={ProductList}
              edit={ProductEdit}
              create={ProductCreate}
            />
            <Resource
              name="measures"
              list={MeasureList}
              edit={MeasureEdit}
              create={MeasureCreate}
            />
            <Resource name="people" list={PersonList} />
            <Resource
              name="nutrition"
              list={NutritionList}
              edit={NutritionEdit}
              create={NutritionCreate}
            />
          </Admin>
        ) : (
          "loading..."
        )}
      </main>
    </div>
  );
}

export default App;
