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
import React, { useState } from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router";
import { updateMealPlanName } from "../../state/state";
import { MealPlanHeaderAllUsersQuery } from "./__generated__/MealPlanHeaderAllUsersQuery.graphql";
import { MealPlanHeader_mealPlan$key } from "./__generated__/MealPlanHeader_mealPlan.graphql";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from 'dayjs';

const fragment = graphql`
  fragment MealPlanHeader_mealPlan on MealPlan {
    rowId
    nameEn
    nameFr
    descriptionEn
    tags
    isTemplate
    startDate
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
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              justifyContent: "space-between",
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <IconButton onClick={() => navigate("/mealplans")} color="info">
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
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
                  // padding: "0.5rem",
                  // marginLeft: "1rem",
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
                display="inline-flex"
                justifyContent="space-between"
                padding="0.5rem 0"
                marginLeft="1rem"
                width="9rem"
                maxWidth="9rem"
                whiteSpace="nowrap"
                overflow="hidden"
                color="primary.contrastText"
                variant={"h5"}
                defaultValue={data.nameEn}
                // onClick={(e) => {
                //   setIsEditName(true);
                // }}
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
                      width: "10rem",
                    }}
                    variant="filled"
                  />
                )}
              ></Autocomplete>
            ) : (
              <Typography
                display="inline-flex"
                justifyContent="space-between"
                padding="0.75rem 0"
                color="primary.contrastText"
                variant={"h5"}
                textTransform={"capitalize"}
                fontStyle="normal"
                width="10rem"
                maxWidth="9rem"
                whiteSpace="nowrap"
                overflow="hidden"
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
            )}
          </Box>
          <Box
            sx={{
              paddingLeft: "15%",
              ".css-10rztul-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {!data.isTemplate ? (
                <DatePicker
                  sx={{
                    // borderRadius: "10px",
                    // maxWidth: "60%",
                    ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: `${theme.palette.primary.contrastText}`,
                      padding: "10px",
                    },
                    ".css-i4bv87-MuiSvgIcon-root": {
                      color: `${theme.palette.primary.contrastText}`,
                    },
                    ".css-34wjpk-MuiFormLabel-root-MuiInputLabel-root": {
                      color: `${theme.palette.primary.contrastText}`,
                    },
                  }}
                  label="Edit Date"
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
                ></DatePicker>
              ) : (
                <></>
              )}
            </LocalizationProvider>
          </Box>
        </Box>
        <Box display="inline-flex">
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
