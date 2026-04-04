import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { RefetchFnDynamic } from "react-relay";
import { createMealPlan, getCurrentPerson } from "../../state/state";
import { OperationType } from "relay-runtime";
import { MealPlansQuery$data } from "./__generated__/MealPlansQuery.graphql";
import { fetchAllCognitoUsers } from "../../api/cognitoUsers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from 'dayjs';

type userType = {
  label: string;
  uuid: string;
};

export const CreateMealPlan = ({ connection, refetch }: { connection: string, refetch: RefetchFnDynamic<OperationType, MealPlansQuery$data> }) => {
  const [open, setOpen] = useState(false);
  const [planType, setPlanType] = useState('mealPlan');

  const [cognitoUsers, setCognitoUsers] = useState<userType[]>([]);

  useEffect(() => {
    fetchAllCognitoUsers().then(users =>
      setCognitoUsers(users.map(u => ({ label: u.displayName, uuid: u.uuid })))
    );
  }, []);

  const initState = {
    userId: null,
    nameEn: "",
    nameFr: "",
    descriptionEn: "",
    descriptionFr: "",
    tags: [],
    disableButton: true,
    startDate: null,
    isTemplate: false
  }

  const [userId, setUserId] = useState<userType | null>(initState.userId);
  const [nameEn, setNameEn] = useState<string>(initState.nameEn);
  const [nameFr, setNameFr] = useState<string>(initState.nameFr);
  const [descriptionEn, setDescriptionEn] = useState<string>(initState.descriptionEn);
  const [descriptionFr, setDescriptionFr] = useState<string>(initState.descriptionFr);
  const [tags, setTags] = useState<string[]>(initState.tags);
  const [disableButton, setDisableButton] = useState(initState.disableButton);
  const [currentPerson, setCurrentPerson] = useState(getCurrentPerson());
  const [startDate, setStartDate] = useState<string | null>();
  const [isTemplate, setIsTemplate] = useState<boolean>(initState.isTemplate);

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
    setIsTemplate(initState.isTemplate);
    setDisableButton(initState.disableButton);
    setStartDate(initState.startDate);
    setOpen(false);
  };

  const getTooltipTitles = (person: { personRole: string; }) => {
    let titleEn = "Suggestion: Client # Week #";
    let titleFr = "Suggestion: Client n° Semaine #";
    let titleDescEng = "Suggestion: Notes on the discussion with client about their requirements, your suggestions.";
    let titleDescFr = "Suggestion : Notes sur la discussion avec le client concernant ses besoins, vos suggestions.";

    if (person.personRole === "app_user") {
      titleEn = "Suggestion: Family member name Week #"
      titleFr = "Suggestion: Nom du membre de la famille Semaine #"
    }

    return {titleEn, titleFr, titleDescEng, titleDescFr};

  }
  const { titleEn, titleFr, titleDescEng, titleDescFr } = getTooltipTitles(currentPerson);


  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Create Meal plan
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
      <Grid container columns={2} >
      <FormControl component="fieldset">
          <RadioGroup row
            aria-label="planType"
            name="planType"
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
          >
            <FormControlLabel
              value="mealPlan"
              control={<Radio checked={planType === 'mealPlan'}/>}
              label="Create New Meal Plan"
            />
            {getCurrentPerson().personRole !== "app_user" ? (
                <FormControlLabel
                value="template"
                control={<Radio checked={planType === 'template'}/>}
                label="Create New Template"
              />
            ) : null}
          </RadioGroup>
        </FormControl>
        </Grid>
        </DialogTitle>
         
            <DialogContent>
              <Grid container columns={6} spacing={2}>
							{getCurrentPerson().personRole !== "app_user"  ? (
			  					planType === "mealPlan" && (
                	<Grid item xs={6}>
                  	<Autocomplete
                    	options={cognitoUsers}
                    	renderInput={(params) => (
                      	<TextField
                        	{...params}
                        	label="Assign user"
                        	id="user"
                        	variant="filled"
                      	/>
                    	)}
                    	onChange={(e, value) => {
                    		setUserId(value);
                    	}}
                  	></Autocomplete>
                	</Grid>
                	)
								) : null}
                <Grid item xs={6}>
              {planType === "mealPlan" && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    format="DD-MM-YYYY"
                    onChange={(newValue: Dayjs | null) => {
                    if (newValue !== null) {
                      const formatedDate = dayjs(newValue).format("YYYY-MM-DD");
                      setStartDate(formatedDate);
                    }
                    }}
                  ></DatePicker>
                </LocalizationProvider>
              )}
            </Grid>
            <Grid item xs={3}>
                <Tooltip arrow placement="bottom-start" title={titleEn}>
                  <TextField
                    id="nameEn"
                    label="Meal Plan Name*"
                    autoFocus
                    margin="dense"
                    variant="filled"
                    fullWidth
                    onChange={(e) => {
                      setNameEn(e.target.value);
                    }}
                  />
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                <Tooltip arrow placement="bottom-start" title={titleFr}>
                  <TextField
                    id="nameFr"
                    label="nom du plan de repas"
                    margin="dense"
                    variant="filled"
                    fullWidth
                    onChange={(e) => {
                      setNameFr(e.target.value);
                    }}
                  />
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                <Tooltip arrow placement="bottom-start" title={titleDescEng}>
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
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                <Tooltip arrow placement="bottom-start" title={titleDescFr}>
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
                  </Tooltip>
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
                    personId: null,
                    personUuid: userId?.uuid ?? null,
                    tags: tags,
                    startDate: startDate,
                    connections: [connection],
                    isTemplate: planType === 'template' ? true : false
                  }).then(() => {
                    console.log('refetching tags');
                    refetch({}, {fetchPolicy: "network-only"});
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
