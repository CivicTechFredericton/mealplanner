import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useEffect, useState } from "react";
import { RefetchFnDynamic, useLazyLoadQuery } from "react-relay";
import { createMealPlan } from "../../state/state";
import { CreateMealPlanAllUsersQuery } from "./__generated__/CreateMealPlanAllUsersQuery.graphql";
import { OperationType } from "relay-runtime";
import { MealPlansQuery$data } from "./__generated__/MealPlansQuery.graphql";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from 'dayjs';

const query = graphql`
  query CreateMealPlanAllUsersQuery {
    people {
      nodes {
        id
        rowId
        fullName
      }
    }
  }
`;
type userType = {
  label: string;
  rowId: number;
  id: number;
};

export const CreateMealPlan = ({
  connection,
  refetch,
}: {
  connection: string;
  refetch: RefetchFnDynamic<OperationType, MealPlansQuery$data>;
}) => {
  const [open, setOpen] = useState(false);

  const users = useLazyLoadQuery<CreateMealPlanAllUsersQuery>(query, {});

  const allUsers = users.people?.nodes.map((user) => {
    return { label: user.fullName, rowId: user.rowId, id: user.id };
  });

  const initState = {
    userId: null,
    nameEn: "",
    nameFr: "",
    descriptionEn: "",
    descriptionFr: "",
    tags: [],
    disableButton: true,
    startDate: "",
  };

  const [userId, setUserId] = useState<userType | null>(initState.userId);
  const [nameEn, setNameEn] = useState<string>(initState.nameEn);
  const [nameFr, setNameFr] = useState<string>(initState.nameFr);
  const [descriptionEn, setDescriptionEn] = useState<string>(initState.descriptionEn);
  const [descriptionFr, setDescriptionFr] = useState<string>(initState.descriptionFr);
  const [tags, setTags] = useState<string[]>(initState.tags);
  const [disableButton, setDisableButton] = useState(initState.disableButton);
  const [startDate, setStartDate] = useState<String | null>();

  const isValid = nameEn !== "";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUserId(initState.userId);
    setNameEn(initState.nameEn);
    setNameFr(initState.nameFr);
    setDescriptionEn(initState.descriptionEn);
    setDescriptionFr(initState.descriptionFr);
    setTags(initState.tags);
    setDisableButton(initState.disableButton);
    setStartDate(initState.startDate);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Create Meal plan
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Meal Plan</DialogTitle>
        <DialogContent
          style={{
            justifyContent: "space-around",
            alignContent: "space-around",
          }}
        >
          <Grid container columns={6} spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                options={allUsers || []}
                renderInput={(params) => (
                  <TextField {...params} label="Assign user" id="user" variant="filled" />
                )}
                onChange={(e, value) => {
                  setUserId(value?.rowId);
                }}
              ></Autocomplete>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Starting Date"
                  onChange={(newValue: Dayjs | null) => {
                  if (newValue !== null) {
                    const formatedDate = dayjs(newValue).format("YYYY-MM-DD");
                    setStartDate(formatedDate);
                  }
                  }}
                ></DatePicker>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="nameEn"
                label="Meal Plan Name*"
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setNameEn(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="nameFr"
                label="nom du plan de repas"
                margin="dense"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setNameFr(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="descriptionEn"
                label="Description"
                multiline
                variant="filled"
                fullWidth
                onChange={(e) => {
                  setDescriptionEn(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="descriptionFr"
                label="la description"
                multiline
                variant="filled"
                fullWidth
                onChange={(e) => {
                  setDescriptionFr(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                freeSolo
                options={[
                  "vegetarian",
                  "vegan",
                  "gluten-free",
                  "keto",
                  "paleo",
                  "diary-free",
                  "egg-free",
                  "nuts-free",
                ]}
                renderInput={(params) => (
                  <TextField
                    color="primary"
                    {...params}
                    variant="filled"
                    label="tags"
                    placeholder="add tag"
                  />
                )}
                onChange={(e, value) => {
                  setTags(value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginRight: "1rem" }}>
          <Button
            disabled={disableButton && !isValid}
            variant="contained"
            onClick={(e) => {
              setDisableButton(true);
              createMealPlan({
                nameEn: nameEn,
                nameFr: nameFr,
                descEn: descriptionEn,
                descFr: descriptionFr,
                personId: userId || null,
                tags: tags,
                connections: [connection],
              }).then(() => {
                console.log("refetching tags");
                refetch({}, { fetchPolicy: "network-only" });
                handleClose();
              });
            }}
          >
            Create
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
