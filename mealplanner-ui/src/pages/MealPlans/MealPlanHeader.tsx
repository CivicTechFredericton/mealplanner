import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React, { useState } from "react";
import { useFragment } from "react-relay";
import { MealPlanHeader_mealPlan$key } from "./__generated__/MealPlanHeader_mealPlan.graphql";

const fragment = graphql`
  fragment MealPlanHeader_mealPlan on MealPlan {
    nameEn
    nameFr
    descriptionEn
    tags
  }
`;

interface HeaderProps {
  mealPlan: MealPlanHeader_mealPlan$key;
}

export const MealPlanHeader: React.FC<HeaderProps> = ({ mealPlan }) => {
  let data = useFragment<MealPlanHeader_mealPlan$key>(fragment, mealPlan);
  const theme = useTheme();
  const [editHeader, setEditHeader] = useState(false);
  return (
    <section
      style={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "10px",
        marginBottom: "1rem",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        bgcolor="primary.main"
      >
        <Typography
          padding="0.5rem 0"
          marginLeft="1rem"
          color="primary.contrastText"
          variant={"h5"}
        >
          {data.nameEn}
        </Typography>
        <IconButton
          sx={{ minWidth: "1.5em" }}
          onClick={(e) => {
            e.stopPropagation();
            if (!editHeader) {
              setEditHeader(true);
            } else setEditHeader(false);
          }}
        >
          {editHeader ? (
            <KeyboardArrowUp
              htmlColor={`${theme.palette.primary.contrastText}`}
              sx={{ fontSize: "1.5em" }}
            />
          ) : (
            <KeyboardArrowDown
              htmlColor={`${theme.palette.primary.contrastText}`}
              sx={{ fontSize: "1.5em" }}
            />
          )}
        </IconButton>
      </Box>
      {editHeader ? (
        <Box
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignContent: "space-around",
            justifyContent: "space-evenly",
            padding: "1em",
            width: "100%",
          }}
        >
          <TextareaAutosize
            minRows={1}
            aria-label="Description"
            placeholder="Description"
            style={{
              fontFamily: "Roboto",
              width: "100%",
              padding: "1em",
              marginBottom: "10px",
              borderColor: `${theme.palette.primary.light}`,
              borderRadius: "2%",
            }}
            value={data.descriptionEn!}
          />

          <Autocomplete
            multiple
            freeSolo
            defaultValue={data.tags?.map((tag) => tag!)}
            options={data.tags?.map((tag) => tag!) || []}
            renderInput={(params) => (
              <TextField
                color="primary"
                {...params}
                variant="outlined"
                label="tags"
                placeholder="add tag"
              />
            )}
          />
        </Box>
      ) : (
        <></>
      )}
    </section>
  );
};
