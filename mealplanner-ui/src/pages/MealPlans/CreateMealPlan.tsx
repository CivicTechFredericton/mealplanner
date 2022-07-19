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
import { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { createMealPlan } from "../../state/state";
import { CreateMealPlanAllUsersQuery } from "./__generated__/CreateMealPlanAllUsersQuery.graphql";

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
export const CreateMealPlan = ({ connection }: { connection: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
  }

  const [userId, setUserId] = useState<userType | null>(null);
  const [nameEn, setNameEn] = useState<string>("");
  const [nameFr, setNameFr] = useState<string>("");
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  const [descriptionFr, setDescriptionFr] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [disableButton, setDisableButton] = useState(true);

  const isValid = nameEn !== "";

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
                  <TextField
                    {...params}
                    label="Assign user"
                    id="user"
                    variant="filled"
                  />
                )}
                onChange={(e, value) => {
                  setUserId(value?.rowId);
                }}
              ></Autocomplete>
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
                handleClose();
                setDisableButton(false);
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
