import { Print } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { graphql } from "relay-runtime";
import moment from 'moment';
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router";
import { ShoppingListQuery } from "./__generated__/ShoppingListQuery.graphql";

const shoppingListQuery = graphql`
  query ShoppingListQuery($rowId: BigInt!) {
    mealPlan(rowId: $rowId) {
      nameEn
      descriptionEn
      person {
        fullName
      }
      startDate
      mealPlanEntries {
        nodes {
          meal {
            id
            nameEn
            ingredients {
              nodes {
                id
                name
                quantity
                unit
                productKeyword
                substituteIngredient {
                  name
                }
                substituteReason
                matchedProducts {
                  nodes {
                    id
                    nameEn
                    price
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ShoppingList = () => {
  const params = useParams();
  const node = useLazyLoadQuery<ShoppingListQuery>(
    shoppingListQuery, 
    { rowId: params.id },
    { fetchPolicy: "store-or-network" }
  );
  const mealPlan = node.mealPlan;

  interface SubIngredientDetail {
    substituteName: string;
    substituteReason: string | readonly (string | null)[] | null;
    substituteUnit: string;
    substituteQuantity: number;
  }

  interface Meal {
    id: string;
    name: string;
    matchedProducts: Product[]
    subIngredient: SubIngredientDetail;
  }

  interface Product {
    id: string;
    productName: string;
    price: number;
  }

  interface MealIngredient {
    mealsById: Meal[];
    productKeyword: string;
    quantity: number[];
    unit: string[];
  }
  
  const mealsByIngredient: Map<string, MealIngredient> = new Map<string, MealIngredient>();
  const mealCounts = new Map<string, number>();
  const formattedDate = mealPlan?.startDate ? moment(mealPlan?.startDate).format('MMMM Do, YYYY') : '';

  mealPlan?.mealPlanEntries.nodes.forEach((mealPlanEntry) => {
    const mealId = mealPlanEntry.meal?.id;
    const mealName = mealPlanEntry.meal?.nameEn;

    if (mealId) {
      if (mealCounts.has(mealId)) {
          mealCounts.set(mealId, mealCounts.get(mealId)! + 1);
      } else {
          mealCounts.set(mealId, 1);
        }
    }
    if (mealPlanEntry.meal?.ingredients) {
      mealPlanEntry.meal.ingredients.nodes.forEach((ingredient) => {
        const ingredientName = ingredient.name.toLowerCase();
        const keyword = ingredient.productKeyword.toLowerCase();
        const quantity = ingredient.quantity;
        const unit = ingredient.unit;
        const subIngredient = ingredient.substituteIngredient?.name.toLowerCase() || "";
        const subReason = Array.isArray(ingredient.substituteReason)
        ? (ingredient.substituteReason || []).join(", ")
        : "";
        const matchedProducts = ingredient.matchedProducts.nodes.map(product => ({
          id: product.id,
          productName: product.nameEn, 
          price: product.price
        }));

        let subQuantity = -1;
        let subUnit = "";
        
        if(subIngredient.length > 0){
          const mainIngredientDetails = mealsByIngredient.get(subIngredient);
          if (mainIngredientDetails) {
            const mainIngredientMealIndex = mainIngredientDetails.mealsById.findIndex(meal => meal.id === mealId);
            if (mainIngredientMealIndex >= 0) {
              subQuantity = mainIngredientDetails.quantity[mainIngredientMealIndex];
              subUnit = mainIngredientDetails.unit[mainIngredientMealIndex];
            }
          }

        }

        if (mealId && mealName) {

          if (mealsByIngredient.has(ingredientName)) {
            const existingIngredientDetails = mealsByIngredient.get(ingredientName)!;
            const mealExists = existingIngredientDetails.mealsById.some(meal => meal.id === mealId);

            if (!mealExists) {
              existingIngredientDetails.mealsById.push({ id: mealId, name: mealName, matchedProducts: matchedProducts, subIngredient: { substituteName: subIngredient, substituteReason: subReason, substituteQuantity: subQuantity, substituteUnit: subUnit } });
              existingIngredientDetails.productKeyword = keyword;
              existingIngredientDetails.quantity.push(quantity);
              existingIngredientDetails.unit.push(unit);
              
            }
            mealsByIngredient.set(ingredientName, existingIngredientDetails);
          } else {
            mealsByIngredient.set(ingredientName, {
              mealsById: [{ id: mealId, name: mealName, matchedProducts: matchedProducts, subIngredient: { substituteName: subIngredient, substituteReason: subReason, substituteQuantity: subQuantity, substituteUnit: subUnit } }],
              productKeyword: keyword,
              quantity: [quantity],
              unit: [unit],
            });
          }
        }
      });
    }
  });
  return (
    <>
      {Array.from(mealsByIngredient.entries()).length === 0 ? (
          <h3 style={{ textAlign: "center" }}>There are no meals added to this mealplan </h3>
      ) : (
        <Grid container spacing="5" sx={{ padding: "2rem" }}>
          <Grid xs={12}>
            <Typography variant="subtitle1" sx={{ mr: 5 }}>
              {mealPlan?.person && `Prepared for ${mealPlan.person.fullName}`}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4">
              Shopping List - {mealPlan?.nameEn} &nbsp; 
              <Button
                onClick={() => {
                  window.print();
                }}
              >
                <Print></Print>
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {mealPlan?.startDate && `Start Date: ${formattedDate}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" style={{ marginBottom: '1em' }}>
              <div style={{ fontStyle: 'italic' }}>
                <strong>Disclaimer:</strong>
                The suggested products are intended to be used as reference for informational purposes only. This is not a recommendation of where to buy. Clients need to research and verify which is suitable to their needs independently. Prices are indicative as per the data procured in March 2024. The prices may vary subject to the time of purchase, store, and mode of purchase.
              </div>
            </Typography>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#000" }}>Ingredient</TableCell>
                  <TableCell style={{ color: "#000" }}>Meal - Quantity/Unit</TableCell>
                  <TableCell style={{ color: "#000" }}>Suggested Product</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Array.from(mealsByIngredient.entries()).map(([ingredientName, ingredientDetails], index) => (
                  <TableRow key={ingredientName}  style={((index + 1) % 5 === 0) ? { breakBefore: "always" } : {}} >
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox />
                        <div>
                          {ingredientName}
                          {ingredientName !== ingredientDetails.productKeyword && ` | ${ingredientDetails.productKeyword}`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {ingredientDetails.quantity.map((mealQuantities, index) => (
                        <div key={index}>
                          <li>
                            {ingredientDetails.mealsById[index].name} - {mealQuantities} {ingredientDetails.unit[index]} 
                            {mealCounts.get(ingredientDetails.mealsById[index].id)! > 1 && ` x${mealCounts.get(ingredientDetails.mealsById[index].id)}`}
                            
                            {ingredientDetails.mealsById[index].subIngredient.substituteName !== "" &&
                            <div style={{ fontStyle: 'italic', marginLeft: '2em' }}>
                              Substitutes: {ingredientDetails.mealsById[index].subIngredient.substituteName} - {ingredientDetails.mealsById[index].subIngredient.substituteQuantity} {ingredientDetails.mealsById[index].subIngredient.substituteUnit}
                              {mealCounts.get(ingredientDetails.mealsById[index].id)! > 1 && ` x${mealCounts.get(ingredientDetails.mealsById[index].id)}`}
                            </div>
                            }
                            {ingredientDetails.mealsById[index].subIngredient.substituteReason !== "" && (
                              <div style={{ fontStyle: 'italic', marginLeft: '2em' }}>
                                Reason: {ingredientDetails.mealsById[index].subIngredient.substituteReason}
                              </div>
                            )}
                            {ingredientDetails.mealsById[index].subIngredient.substituteName !== "" && ingredientDetails.mealsById[index].subIngredient.substituteReason === "" && (
                              <div style={{ fontStyle: 'italic', marginLeft: '2em' }}>
                                Reason: not specified
                              </div>
                            )}
                          </li>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {ingredientDetails.mealsById.map((meal, index) => (
                        meal.matchedProducts.length > 0 ? (
                            ingredientDetails.mealsById.length === 1 ? (
                              meal.matchedProducts.slice(0, 3).map((product, productIndex) => (
                              <li key={productIndex}>
                                {product.productName} - ${product.price}
                              </li>
                            ))
                          ) : (
                            <li key={index}>
                              {meal.matchedProducts[0].productName} - ${meal.matchedProducts[0].price}
                            </li>
                          )
                        ) : null
                      ))}
                      {ingredientDetails.mealsById.every(meal => meal.matchedProducts.length === 0) && 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </>
  );
};