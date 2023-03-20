import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React, { useState } from "react";
import { useFragment } from "react-relay";
import { clearSelectedMeal, setSelectedMeal } from "../../state/state";
import { SearchedMeal } from "../../state/types";
import { SearchMeal_data$key } from "./__generated__/SearchMeal_data.graphql";

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
    ).slice().sort((a, b) => {
      if (a.nameEn < b.nameEn) {
        return -1;
      }
      if (a.nameEn > b.nameEn) {
        return 1;
      }
      return 0;
    })
  };

  const selectMeal = (meal: SearchedMeal) => {
    console.log(meal.nameEn);
    //setting the Relay state for selected Meal
    setSelectedMeal(meal);
  };

  const theme = useTheme();
  return (
    <React.Fragment>
      <Grid sx={{ m: 1, height: "100vh" }}>
        <Typography
          sx={{ color: `${theme.palette.primary.contrastText}` }}
          padding="0.5rem 0"
          marginLeft="1rem"
          variant={"h5"}
        >
          Select Meal from the list
        </Typography>
        <FormControl
          variant="filled"
          sx={{ width: "100%", color: `${theme.palette.primary.contrastText}` }}
        >
          <InputLabel sx={{ color: `${theme.palette.primary.contrastText}` }}>
            Search for meals
          </InputLabel>
          <OutlinedInput
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: `${theme.palette.primary.contrastText}`,
            }}
            notched={false}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon htmlColor={theme.palette.primary.contrastText} />
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
              <Typography
                sx={{ color: `${theme.palette.primary.contrastText}` }}
              >
                {searchData.gqLocalState.selectedMeal?.nameEn}

                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ margin: "0 1em", padding: "0 0", minWidth: "2em" }}
                  onClick={(e) => {
                    e.preventDefault();
                    clearSelectedMeal();
                  }}
                >
                  x
                </Button>
              </Typography>
            </React.Fragment>
          ) : (
            <></>
          )}
        </p>

        <Box>
          {
          search(searchText).map((m) => {
            return <Button
              sx={{
                textTransform: "capitalize",
                width: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              variant="contained"
              color="primary"
              key={m.id}
              onClick={() => {
                selectMeal(m);
              }}
            >
              <Typography fontWeight={"500"}>{m.nameEn} </Typography>
              <Typography fontSize={"0.8em"}>{m.tags?.join(", ")}</Typography>
            </Button>
            })};
        </Box>
      </Grid>
    </React.Fragment>
  );
};
