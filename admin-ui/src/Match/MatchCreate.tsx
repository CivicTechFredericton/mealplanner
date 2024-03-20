import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Create,
  CreateProps,
  useGetOne
} from "react-admin";
import { Link, redirect, useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import React from "react";

const getProducts = gql`
  query ingredientProducts($ingredientId: BigInt!) {
    ingredient(rowId: $ingredientId) {
      rowId
      name
      meal {
        rowId
        nameEn
      }
      productKeyword
      keywordProducts {
        nodes {
          rowId
          nameEn
          price
          quantity
          imageUrl
          sourceUrl
          upc
        }
      }
    }
  }
`;

const createMatchGql = gql`
  mutation createMatchMutation($input: MatchInput!) {
    createMatch(input: { match: $input }) {
      product {
        nameEn
      }
      ingredient {
        name
      }
    }
  }
`;

export const MatchCreate = (props: CreateProps) => {
  const { ingredientId, id } = useParams();

  const {
    loading,
    error,
    data: products,
  } = useQuery(getProducts, {
    variables: { ingredientId: ingredientId },
  });

  // Get the meal record given the meal id.
  // This record is needed to get the meal name
  const { data } = useGetOne("ingredients", { id: ingredientId });
  const { data: mealData } = useGetOne("meals", { id: id });
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [selectedBestProduct, setSelectedBestProduct] =
    React.useState<any>(null);
  let matchedProductsIds = rowSelectionModel.map((rowId) => rowId);
  let relevance: number | null = null;
  const [createMatchFn] = useMutation(createMatchGql);
  console.log("matchedProduct ids: ", matchedProductsIds);

  const handleSave = (
    matchedProductsIds,
    ingredientId,
    selectedBestProduct
  ) => {
    console.log("matchedProductsIds", matchedProductsIds);
    console.log("ingredientId", ingredientId);
    console.log("selectedBestProduct", selectedBestProduct);
    createMatchFn({
      variables: {
        input: { ingredientId, productId: selectedBestProduct, relevance: 1 },
      },
    });
    matchedProductsIds.map((productId) =>
      createMatchFn({
        variables: {
          input: {
            ingredientId,
            productId,
            relevance: 2,
          },
        },
      })
    );
    redirect(`/meals/${id}/ingredients`);
  };

  if (!data || !mealData) return <>loading...</>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <Create
      {...props}
      resource="match"
      redirect={`/meals/${data.mealId}/ingredients`}
    >
      <Button
        label="Save"
        onClick={() =>
          handleSave(matchedProductsIds, ingredientId, selectedBestProduct)
        }
      />
      {/* <SaveButton onClick={() => handleSave(matchedProductsIds, ingredientId, selectedBestProduct)} /> */}
      <IngredientName data={data} mealData={mealData} />
      <br />
      <div>
        <FormControl fullWidth>
          <InputLabel>
            Select the best product matched to the ingredient
          </InputLabel>
          <Select
            onChange={(e: SelectChangeEvent) =>
              setSelectedBestProduct(e.target.value as string)
            }
          >
            {rowSelectionModel.map((rowId) =>
              products.ingredient.keywordProducts.nodes
                .filter((obj) => obj.rowId === rowId)
                .map((product: any) => {
                  return (
                    <MenuItem key={product.rowId} value={product.rowId}>
                      <img src={product.imageUrl} width="100" height="100" />
                      <b>Product Name:</b> {product.nameEn}
                      <b>UPC:</b> {product.upc}
                    </MenuItem>
                  );
                })
            )}
          </Select>
        </FormControl>
      </div>
      Best Product:{" "}
      {selectedBestProduct &&
        products.ingredient.keywordProducts.nodes.filter(
          (obj) => obj.rowId === selectedBestProduct
        )[0].nameEn}
      <DataGrid
        getRowId={(r) => r.rowId}
        rows={products?.ingredient?.keywordProducts?.nodes}
        columns={[
          { field: "nameEn", headerName: "Product Name", width: 500 },
          { field: "price", headerName: "Price", width: 200 },
          { field: "quantity", headerName: "Quantity", width: 200 },
          {
            field: "imageUrl",
            headerName: "Image",
            width: 200,
            renderCell: (params) => (
              <img src={params.value} width="100" height="100" />
            ),
          },
          {
            field: "sourceUrl",
            headerName: "Source URL",
            width: 200,
            renderCell: (params) => (
              <Link to={params.value} target="_blank">
                {params.value}
              </Link>
            ),
          },
          { field: "upc", headerName: "UPC", width: 200 },
        ]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          console.log("newRowSelectionModel", newRowSelectionModel);
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </Create>
  );
};

const IngredientName = ({ data, mealData }: { data: any; mealData: any }) => {
  return (
    <>
      <br />
      &nbsp;&nbsp;<b> Ingredient:</b> <i>{data.name}</i>
      <br />
      &nbsp;&nbsp;<b> Meal:</b> <i>{mealData.nameEn}</i>
    </>
  );
};
