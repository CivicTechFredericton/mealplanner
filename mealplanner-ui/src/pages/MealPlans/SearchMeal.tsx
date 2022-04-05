import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { graphql } from "babel-plugin-relay/macro";
import { SearchMeal_data$key } from "./__generated__/SearchMeal_data.graphql";
import { useFragment } from "react-relay";
import { SearchedMeal } from "../../state/types";
import { clearSelectedMeal, setSelectedMeal } from "../../state/state";

const fragment = graphql`
  fragment SearchMeal_data on Query {
    gqLocalState {
      selectedMeal {
        nameEn
        rowId
        id
      }
    }
    meals {
      nodes {
        id
        rowId
        nameEn
        tags
      }
    }
  }
`;
interface Props {
  data: SearchMeal_data$key;
}

export const SearchMeal: React.FC<Props> = ({ data }) => {
  let searchData = useFragment<SearchMeal_data$key>(fragment, data);
  let [searchText, setSearchText] = useState("");

  let search = (searchText: string) => {
    if (searchText === "") {
      return searchData.meals!.nodes;
    }
    return searchData.meals!.nodes.filter((m) =>
      m.nameEn.match(new RegExp(searchText, "i"))
    );
  };

  const selectMeal = (meal: SearchedMeal) => {
    console.log(meal.nameEn);
    //setting the Relay state for selected Meal
    setSelectedMeal(meal);
  };
  return (
    <React.Fragment>
      <Grid sx={{ m: 1, height: "100vh" }}>
        <h3>Meal Catalog</h3>
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>Search for meals</InputLabel>
          <OutlinedInput
            label={<h4>Search for Meals</h4>}
            notched={true}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </FormControl>

        <p>
          {searchData.gqLocalState.selectedMeal?.nameEn ? (
            <React.Fragment>
              {searchData.gqLocalState.selectedMeal?.nameEn}
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  clearSelectedMeal();
                }}
              >
                x
              </Button>
            </React.Fragment>
          ) : (
            <></>
          )}
        </p>

        <Box>
          {search(searchText).map((m) => (
            <Button
              key={m.id}
              onClick={() => {
                selectMeal(m);
              }}
            >
              {m.nameEn} - {m.tags?.join(", ")}
            </Button>
          ))}
        </Box>
      </Grid>
    </React.Fragment>
  );
};
