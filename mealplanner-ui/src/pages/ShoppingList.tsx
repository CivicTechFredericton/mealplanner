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
import { graphql } from "babel-plugin-relay/macro";
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

  const mealsByIngredient = new Map<string, {
    keyword: string,
    totalByUnit: Record<string, number>,
    recipes: { name: string, quantity: number, unit: string, subName: string, subReason: string }[],
    matchedProducts: { name: string, price: number }[]
  }>();

  const formattedDate = mealPlan?.startDate ? moment(mealPlan?.startDate).format('MMMM Do, YYYY') : '';

  mealPlan?.mealPlanEntries.nodes.forEach((mealPlanEntry: any) => {
    const mealName = mealPlanEntry.meal?.nameEn;

    mealPlanEntry.meal?.ingredients.nodes.forEach((ingredient: any) => {
      const name = ingredient.name.toLowerCase();
      const keyword = ingredient.productKeyword.toLowerCase();
      const quantity = typeof ingredient.quantity === 'string' ? parseFloat(ingredient.quantity) : ingredient.quantity;
      const unit = ingredient.unit;
      const subName = ingredient.substituteIngredient?.name?.toLowerCase() || "";
      const subReason = Array.isArray(ingredient.substituteReason) ? (ingredient.substituteReason || []).join(", ") : "";
      const matchedProducts = ingredient.matchedProducts.nodes.map((product: any) => ({
        name: product.nameEn,
        price: product.price
      }));

      if (!mealsByIngredient.has(name)) {
        mealsByIngredient.set(name, {
          keyword,
          totalByUnit: {},
          recipes: [],
          matchedProducts
        });
      }

      const entry = mealsByIngredient.get(name)!;
      entry.totalByUnit[unit] = (entry.totalByUnit[unit] || 0) + quantity;

      if (!entry.recipes.find(r => r.name === mealName && r.unit === unit && r.quantity === quantity)) {
        entry.recipes.push({ name: mealName, quantity, unit, subName, subReason });
      }
    });
  });

  const sortedIngredients = Array.from(mealsByIngredient.entries()).sort(([a], [b]) => a.localeCompare(b));

  return (
    <Grid container spacing={5} sx={{ padding: "2rem" }}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          {mealPlan?.person && `Prepared for ${mealPlan.person.fullName}`}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h4">
          Shopping List - {mealPlan?.nameEn} &nbsp;
          <Button onClick={() => window.print()}>
            <Print />
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          {mealPlan?.startDate && `Start Date: ${formattedDate}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
          <strong>Disclaimer:</strong> The suggested products are intended to be used as reference for informational purposes only. This is not a recommendation of where to buy. Clients need to research and verify which is suitable to their needs independently. Prices are indicative as per the data procured in March 2024. The prices may vary subject to the time of purchase, store, and mode of purchase.
        </Typography>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell>Quantity/Unit</TableCell>
              <TableCell>Recipe</TableCell>
              <TableCell>Suggested Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedIngredients.map(([ingredientName, data]) => (
              <TableRow key={ingredientName}>
                <TableCell>
                  <Checkbox /> {ingredientName} {ingredientName !== data.keyword && ` | ${data.keyword}`}
                </TableCell>
                <TableCell>
                  {Object.entries(data.totalByUnit).map(([unit, qty], i) => (
                    <div key={i}><strong>{qty} {unit}</strong></div>
                  ))}
                </TableCell>
                <TableCell>
                  {data.recipes.map((recipe, i) => (
                    <div key={i}>
                      {recipe.name} - {recipe.quantity} {recipe.unit}
                      {recipe.subName && (
                        <div style={{ marginLeft: '1em', fontStyle: 'italic' }}>
                          Substitutes: {recipe.subName} - Reason: {recipe.subReason || 'not specified'}
                        </div>
                      )}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {data.matchedProducts.length > 0 ? (
                    <ul style={{ paddingLeft: '1em' }}>
                      {data.matchedProducts.slice(0, 3).map((product, i) => (
                        <li key={i}>{product.name} - ${product.price}</li>
                      ))}
                    </ul>
                  ) : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
