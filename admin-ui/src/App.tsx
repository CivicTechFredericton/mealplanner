import { useApolloClient } from "@apollo/client";
import pgDataProvider from "ra-postgraphile";
import { useEffect, useState } from "react";
import {
  Admin,
  CustomRoutes,
  DataProvider,
  Layout,
  Resource,
} from "react-admin";
import { Route } from "react-router-dom";
import { useAuth } from "./Auth";
import { IngredientCreate } from "./Ingredients/IngredientCreate";
import { IngredientEdit } from "./Ingredients/IngredientEdit";
import { IngredientList } from "./Ingredients/IngredientList";
import { Match } from "./Match/Match";
import { MealCreate } from "./Meals/MealCreate";
import { MealEdit } from "./Meals/MealEdit";
import { MealList } from "./Meals/MealList";
import { MealShow } from "./Meals/MealShow";
import { NutritionCreate } from "./Nutrition/NutritionCreate";
import { NutritionEdit } from "./Nutrition/NutritionEdit";
import { NutritionList } from "./Nutrition/NutritionList";
import { PersonEdit } from "./People/PersonEdit";
import { PersonList } from "./People/PersonList";
import { Register } from "./People/Register";
import { ResetPassword } from "./People/ResetPassword";
import { ProductCreate } from "./Products/ProductCreate";
import { ProductEdit } from "./Products/ProductEdit";
import { ProductList } from "./Products/ProductList";

function App() {
  const auth = useAuth();
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    // Need to add the id of all tables so that when we fetch id it fetches the rowId
    // If we don't give this it will try to fetch id apart from rowId.
    pgDataProvider(client, {
      typeMap: {
        Meal: { excludeFields: ["id"], expand: true },
        Product: { excludeFields: ["id"] },
        Measure: { excludeFields: ["id"] },
        Nutrition: { excludeFields: ["id"] },
        Person: { excludeFields: ["id"] },
        Ingredient: { excludeFields: ["id"] },
        Match: { excludeFields: ["id"] },
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
              show={MealShow}
            >
              <Route path=":id/ingredients" element={<IngredientList />} />
              <Route
                path=":id/ingredients/create"
                element={<IngredientCreate />}
              />
              <Route
                path=":id/ingredients/:ingredientId"
                element={<IngredientEdit />}
              />

              <Route
                path=":id/ingredients/:ingredientId/match"
                element={<Match />}
              />
            </Resource>

            <Resource
              name="products"
              list={ProductList}
              edit={ProductEdit}
              create={ProductCreate}
            />

            <Resource
              name="nutrition"
              list={NutritionList}
              edit={NutritionEdit}
              create={NutritionCreate}
            />
            {auth.currentPerson?.role === "app_admin" && (
              <>
                <Resource
                  name="people"
                  options={{ label: "Users" }}
                  list={PersonList}
                  edit={PersonEdit}
                />

                <CustomRoutes>
                  <Route path="people/register" element={<Register />} />
                  <Route
                    path="people/:rowId/reset"
                    element={<ResetPassword />}
                  />
                </CustomRoutes>
              </>
            )}
          </Admin>
        ) : (
          "loading..."
        )}
      </main>
    </div>
  );
}

export default App;
