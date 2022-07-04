import { useApolloClient } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import { useEffect, useState } from "react";
import { Admin, CustomRoutes, DataProvider, Layout, Resource } from "react-admin";
import { Route } from "react-router-dom";
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
import { Register } from "./People/Register";
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
        Nutrition: { excludeFields: ["id"] },
        Person: { excludeFields: ["id"] },
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
            <Resource
              name="meals"
              list={MealList}
              edit={MealEdit}
              create={MealCreate}
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

            <Resource
              name="nutrition"
              list={NutritionList}
              edit={NutritionEdit}
              create={NutritionCreate}
            />
            <Resource
              name="people"
              options={{ label: "Users" }}
              list={PersonList}
            />
            <CustomRoutes>
              <Route path="people/register" element={<Register/>}/>
            </CustomRoutes>
          </Admin>
        ) : (
          "loading..."
        )}
      </main>
    </div>
  );
}

export default App;
