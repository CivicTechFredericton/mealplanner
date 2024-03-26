import { gql, useMutation, useQuery } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import React from "react";
import { Button, CreateProps, useGetOne } from "react-admin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductResultType } from "../Products/service";

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

const getMatchesGql = gql`
  query matches($ingredientId: BigInt!) {
    ingredient(rowId: $ingredientId) {
      matches {
        nodes {
          relevance
          product {
            nameEn
            upc
          }
        }
      }
    }
  }
`;

const updateMatchGql = gql`
  mutation updateMatchesMutation($input: UpdateMatchesInput!) {
    updateMatches(input: $input) {
      matches {
        rowId
        ingredientId
        productId
      }
    }
  }
`;

export const Match = (props: CreateProps) => {
  const navigate = useNavigate();
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
  let matchedProductsIds = rowSelectionModel.map((rowId) => rowId as number);
  let relevance: number | null = null;

  const {
    loading: matchLoading,
    error: matchError,
    data: matchedData,
  } = useQuery(getMatchesGql, {
    variables: { ingredientId: ingredientId },
  });

  const [updateMatchFn] = useMutation(updateMatchGql, {
    onCompleted: () => {
      navigate(`/meals/${id}/ingredients`);
    },
  });

  const handleSave = (
    matchedProductsIds: number[],
    ingredientId: number,
    selectedBestProduct: number
  ) => {
    let productIds = [];
    if (selectedBestProduct) {
      productIds.push(selectedBestProduct);
    }
    matchedProductsIds.forEach(
      (productId) =>
        productId !== selectedBestProduct && productIds.push(productId)
    );
    updateMatchFn({
      variables: { input: { ingId: ingredientId, productIds } },
    });
  };

  if (!data || !mealData) return <>loading...</>;

  if (loading || matchLoading) return <p>Loading...</p>;
  if (error || matchError)
    return (
      <p>
        Error :{error?.message} || {matchError?.message}{" "}
      </p>
    );

  return (
    <div style={{ margin: "1em" }}>
      <h2> Match ingredient to relevant products using product keywords</h2>

      <IngredientName data={data} mealData={mealData} />
      <br />
      <>
        {matchedData && (
          <div>
            <h3>Relevant matches of products:</h3>
            {matchedData.ingredient.matches.nodes.map(
              (match: { product: { nameEn: string }; relevance: number }) => (
                <p>
                  <b>{match.relevance}</b>&nbsp; &nbsp;{match.product.nameEn}{" "}
                  {match.relevance == 1 && <b>[best]</b>}
                </p>
              )
            )}
          </div>
        )}
        <p style={{ width: "850px", marginTop: "2em" }}>
          <i>
            To make or change your selection, first select the list (using
            checkbox) of relevant products from the below table. Then select the
            best product from the selected list using the dropdown box.
          </i>
        </p>
        <FormControl sx={{ minWidth: "850px" }}>
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
                .filter((obj: ProductResultType) => obj.rowId === rowId)
                // need to change this any type to legitimate type
                .map(
                  (product: {
                    rowId: number;
                    imageUrl: string;
                    nameEn: string;
                    upc: string;
                  }) => {
                    return (
                      <MenuItem key={product.rowId} value={product.rowId}>
                        <img
                          src={product.imageUrl}
                          width="100"
                          height="100"
                          style={{ marginRight: "1em" }}
                        />
                        <p>{product.nameEn}</p> &nbsp;
                        <b>UPC:</b> {product.upc}
                      </MenuItem>
                    );
                  }
                )
            )}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          style={{
            marginTop: "0.5em",
            marginLeft: "1em",
            alignContent: "center",
            width: "100px",
            height: "50px",
          }}
          label="Save"
          onClick={() =>
            handleSave(
              matchedProductsIds,
              parseInt(ingredientId!),
              selectedBestProduct
            )
          }
        />
      </>
      <br />
      <div style={{ margin: "1em" }}>
        <b>Selected Best Product: </b>
        {selectedBestProduct
          ? products.ingredient.keywordProducts.nodes.filter(
              (obj: ProductResultType) => obj.rowId === selectedBestProduct
            )[0].nameEn
          : "none"}
      </div>
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
    </div>
  );
};

const IngredientName = ({ data, mealData }: { data: any; mealData: any }) => {
  return (
    <>
      <br />
      <b> Ingredient:</b> <i>{data.name}</i>
      <br />
      <b> Meal:</b> <i>{mealData.nameEn}</i>
    </>
  );
};
