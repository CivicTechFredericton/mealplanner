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
import { graphql } from "relay-runtime";
import React, { useState } from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router";
import { updateMealPlanName, getCurrentPerson } from "../../state/state";
import { MealPlanHeaderAllUsersQuery } from "./__generated__/MealPlanHeaderAllUsersQuery.graphql";
import { MealPlanHeader_mealPlan$key } from "./__generated__/MealPlanHeader_mealPlan.graphql";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const fragment = graphql`
  fragment MealPlanHeader_mealPlan on MealPlan {
    rowId
    nameEn
    nameFr
    descriptionEn
    tags
    isTemplate
    startDate
    personUuid
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
  let startDate = dayjs(data.startDate).format("YYYY-MM-DD");

  let users = useLazyLoadQuery<MealPlanHeaderAllUsersQuery>(query, {});

  let allUsers = users.people?.nodes.map((user) => {
    return { label: user.fullName, id: user.rowId };
  });
  const theme = useTheme();
  const [editHeader, setEditHeader] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const navigate = useNavigate();

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
        displayPrint={"none"}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "flex-start",
            minWidth: "80%",
          }}
        >
          <Box
            sx={{
              justifyContent: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <IconButton onClick={() => navigate("/mealplans")} color="info">
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>{" "}
            {isEditName ? (
              <TextField
                id="filled-basic"
                label="Edit Meal Plan Name"
                variant="filled"
                color="info"
                style={{
                  backgroundColor: theme.palette.primary.light,
                  width: "10rem",
                  maxWidth: "10rem",
                }}
                defaultValue={data.nameEn}
                onBlur={(e) => {
                  e.target.value
                    ? updateMealPlanName(data.rowId, {
                        mealPlanId: data.rowId,
                        descriptionEn: data.descriptionEn,
                        personId: data.person?.rowId,
                        tags: data.tags,
                        startDate: data.startDate,
                        mealPlanName: e.target.value,
                      })
                    : (e.target.value = data.nameEn);
                  setIsEditName(false);
                }}
              />
            ) : (
              <Typography
                padding="0.5rem 0"
                overflow="hidden"
                maxWidth={"60%"}
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
            {isEditUser && getCurrentPerson().personRole !== "app_user"  ? (
              <Autocomplete
                sx={{
                  ".css-i4bv87-MuiSvgIcon-root": {
                    color: "primary.contrastText",
                  },
                  ".css-19nwk72-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                    color: "primary.contrastText",
                  },
                  color: "white",
                  backgroundColor: theme.palette.primary.light,
                }}
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
                    startDate: data.startDate,
                    mealPlanName: data.nameEn,
                  });
                  setIsEditUser(false);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select user"
                    sx={{
                      width: "12rem",
                    }}
                    variant="filled"
                  />
                )}
              ></Autocomplete>
            ) : getCurrentPerson().personRole !== "app_user" ? ( 
              <Typography
                padding="0.75rem 0"
                color="primary.contrastText"
                variant={"h5"}
                width="12rem"
                maxWidth="12rem"
                onClick={(e) => {
                  if (!data.isTemplate) {
                    setIsEditUser(true);
                  }
                }}
              >
                {data.isTemplate
                  ? "Template"
                  : data.person?.fullName
                  ? data.person.fullName
                  : "No User Assigned"}
              </Typography>
            ): null }
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {!data.isTemplate ? (
                <DatePicker
                  sx={{
                    maxWidth: "12rem",
                    minWidth: "11rem",
                    marginLeft: "1rem",
                    margin: "0 0.5rem",

                    ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: `${theme.palette.primary.contrastText}`,
                      padding: "0.5rem",
                    },
                    ".css-i4bv87-MuiSvgIcon-root": {
                      color: `${theme.palette.primary.contrastText}`,
                    },
                    ".css-34wjpk-MuiFormLabel-root-MuiInputLabel-root": {
                      color: `${theme.palette.primary.contrastText}`,
                    },
                  }}
                  format={startDate === "Invalid Date" ? "DD-MM-YYYY" : "DD-MMM-YYYY"}
                  value={dayjs(startDate)}
                  onChange={async (newDate: Dayjs | null) => {
                    if (newDate !== null) {
                      const formatedDate = await dayjs(newDate).format("MM-DD-YYYY");
                      formatedDate ? (
                        await updateMealPlanName(data.rowId, {
                          mealPlanId: data.rowId,
                          descriptionEn: data.descriptionEn,
                          personId: data.person?.rowId,
                          tags: data.tags,
                          startDate: formatedDate,
                          mealPlanName: data.nameEn,
                        })
                      ) : (
                        <></>
                      );
                    }
                  }}
                />
              ) : (
                <></>
              )}
            </LocalizationProvider>
          </Box>{" "}
        </Box>{" "}
        <Box display="inline-flex" id="icons">
          <IconButton onClick={() => window.print()} sx={{ displayPrint: "none" }}>
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
        </Box>{" "}
      </Box>{" "}
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
                startDate: data.startDate,
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
                startDate: data.startDate,
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
