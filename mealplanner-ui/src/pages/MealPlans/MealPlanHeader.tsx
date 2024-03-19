import { KeyboardArrowDown, KeyboardArrowUp, Print } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
import React, { useEffect, useState } from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router";
import { updateMealPlanName } from "../../state/state";
import { MealPlanHeaderAllUsersQuery } from "./__generated__/MealPlanHeaderAllUsersQuery.graphql";
import { MealPlanHeader_mealPlan$key } from "./__generated__/MealPlanHeader_mealPlan.graphql";

const fragment = graphql`
  fragment MealPlanHeader_mealPlan on MealPlan {
    rowId
    nameEn
    nameFr
    descriptionEn
    tags
    isTemplate
    startdate
    person {
      fullName
      rowId
    }
  }
`;

const query = graphql`
  query MealPlanHeaderAllUsersQuery {
    people {
      nodes {
        id
        rowId
        fullName
      }
    }
  }
`;

interface HeaderProps {
  mealPlan: MealPlanHeader_mealPlan$key;
}

export const MealPlanHeader: React.FC<HeaderProps> = ({ mealPlan }) => {
  let data = useFragment<MealPlanHeader_mealPlan$key>(fragment, mealPlan);

  let users = useLazyLoadQuery<MealPlanHeaderAllUsersQuery>(query, {});

  let allUsers = users.people?.nodes.map((user) => {
    return { label: user.fullName, id: user.rowId };
  });
  const theme = useTheme();
  const [editHeader, setEditHeader] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      console.log(data);
    
    }, [])

  return (
    
    <section
      style={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "10px",
        marginBottom: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ displayPrint: "block", display: "none" }}>
        {data.nameEn} - {data.nameFr}
      </Typography>
      <Typography variant="h5" sx={{ displayPrint: "block", display: "none" }}>
        {data.person?.fullName}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        bgcolor="primary.main"
        displayPrint={"none"}
      >
        <Box display="inline-flex" justifyContent={"space-between"}>
          <IconButton onClick={() => navigate("/mealplans")} color="info">
            <ArrowBackIosNewIcon />
          </IconButton>
          {isEditName ? (
            <TextField
              id="filled-basic"
              label="Edit Meal Plan Name"
              variant="filled"
              color="info"
              style={{ backgroundColor: theme.palette.primary.light }}
              defaultValue={data.nameEn}
              onBlur={(e) => {
                e.target.value
                  ? updateMealPlanName(data.rowId, {
                      mealPlanId: data.rowId,
                      descriptionEn: data.descriptionEn,
                      personId: data.person?.rowId,
                      tags: data.tags,
                      mealPlanName: e.target.value,
                    })
                  : (e.target.value = data.nameEn);
                setIsEditName(false);
              }}
            />
          ) : (
            <Typography
              padding="0.5rem 0"
              marginLeft="1rem"
              color="primary.contrastText"
              variant={"h5"}
              defaultValue={data.nameEn}
              onClick={(e) => {
                setIsEditName(true);
              }}
            >
              {data.nameEn}
            </Typography>
          )}
          <Typography padding="0.75rem 1rem"></Typography>
          {isEditUser ? (
            <Autocomplete
              // options={[
              //   { label: "Admin", id: 1 },
              //   { label: "Meal Designer", id: 2 },
              //   { label: "User 1", id: 3 },
              //   { label: "User 2", id: 4 },
              // ]}
              options={allUsers || []}
              onBlur={(e) => {
                setIsEditUser(false);
              }}
              onChange={(e, value) => {
                updateMealPlanName(data.rowId, {
                  mealPlanId: data.rowId,
                  descriptionEn: data.descriptionEn,
                  personId: value?.id,
                  tags: data.tags,
                  mealPlanName: data.nameEn,
                });
                setIsEditUser(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select user"
                  style={{
                    backgroundColor: theme.palette.primary.contrastText,
                    width: "200%",
                  }}
                  variant="filled"
                />
              )}
            ></Autocomplete>
          ) : (
            <Typography
              padding="0.75rem 0"
              color="primary.contrastText"
              textTransform={"capitalize"}
              fontStyle="normal"
              onClick={(e) => setIsEditUser(true)}
            > 
            {data.isTemplate ? "template" : (data.person?.fullName ? data.person.fullName : "No User Assigned")}
              
            </Typography> 
          )}
        </Box>

        <Box display="inline-flex">
          <IconButton
            onClick={() => window.print()}
            sx={{ displayPrint: "none" }}
          >
            <Print htmlColor={`${theme.palette.primary.contrastText}`}></Print>
          </IconButton>
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
            defaultValue={data.descriptionEn!}
            onBlur={(e) => {
              updateMealPlanName(data.rowId, {
                mealPlanId: data.rowId,
                descriptionEn: e.target.value,
                personId: data.person?.rowId,
                tags: data.tags,
                mealPlanName: data.nameEn,
              });
            }}
          />

          <Autocomplete
            multiple
            freeSolo
            defaultValue={data.tags?.map((tag) => tag!)}
            options={data.tags?.map((tag) => tag!) || []}
            onChange={(e, value) => {
              updateMealPlanName(data.rowId, {
                mealPlanId: data.rowId,
                descriptionEn: data.descriptionEn,
                personId: data.person?.rowId,
                tags: value,
                mealPlanName: data.nameEn,
              });
            }}
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
