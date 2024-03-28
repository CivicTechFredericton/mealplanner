import React from "react";
import { MealPlanNode } from "../../state/types";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, IconButtonProps, ImageList, ImageListItem, Typography, styled, useTheme, useMediaQuery } from "@mui/material";
import { ShoppingCart, DeleteTwoTone, ContentCopy, ExpandMore, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { getCurrentPerson } from "../../state/state";
import { deleteMealPlan } from "./DeleteMealPlan";
import { duplicateMealPlan } from "./DuplicateMealPlan";
import { RefetchFnDynamic } from "react-relay";
import { OperationType } from "relay-runtime";
import { MealPlansQuery$data } from "./__generated__/MealPlansQuery.graphql";

interface MealPlanCardProps {
    mealplan: MealPlanNode;
    connection: string;
    refetch: RefetchFnDynamic<OperationType, MealPlansQuery$data>;
  }

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMoreFn = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
const getInitials = (name: string) => {
    let initials = "";
    let names: string[] = (name && name.length > 1 && name.split(" ")) || [
      "No",
      "Name",
    ];
    names.forEach((n) => {
      initials += n[0];
    });
    return initials;
  };

export const MealPlanCard = (props: MealPlanCardProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const navigate = useNavigate();
    const mealplan = props.mealplan;
    const connection = props.connection;
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down('md'));
    const handleExpandClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setExpanded(!expanded);
    };
    const handleClickOpen = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenDialog(true);
    };

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenDialog(false);
    };

    const handleDelete =(e: React.MouseEvent) => {
      e.stopPropagation();
      deleteMealPlan(connection, mealplan.rowId).then(() => {
        //refetch here for fetching tags after delete
        props.refetch({}, {fetchPolicy: "network-only"})
      })
      setOpenDialog(false);
    };
  
    return (
      <Grid item xs="auto">
        <Card
          sx={{ maxWidth: 332 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/mealplans/${mealplan.rowId}`);
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.cursor = "pointer";
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "green", width: "fit" }} aria-label="user">
                {getInitials(mealplan.person?.fullName || "")}
              </Avatar>
            }
            action={
              <div>
                <IconButton
                  aria-label="shopping list"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("stopped propagation");
                    navigate(`/mealplans/${mealplan.rowId}/shopping-list`);
                  }}
                  sx={{ "& :hover": { color: theme.palette.primary.main } }}
                >
                  <ShoppingCart />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick = {handleClickOpen}
                  sx={{ "& :hover": { color: theme.palette.primary.main } }}
                >
                  <DeleteTwoTone />
                </IconButton>
                <Dialog
                  fullScreen={fullScreenDialog}
                  open={openDialog}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClose={handleClose}
                  aria-labelledby="delete-dialog"
                >
                  <DialogTitle id="delete-dialog">
                    {"Delete this meal plan?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to <b>delete</b> the meal plan <b>{mealplan.nameEn}</b>?
                    </DialogContentText>
                  </DialogContent>
  
                  <DialogActions>
                    <Button 
                      onClick={handleDelete}
                      autoFocus
                      startIcon={<DeleteTwoTone />}
                      color = "error"
                    >
                      Delete
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
                {getCurrentPerson().personRole === "app_admin" || getCurrentPerson().personRole === "app_meal_designer" ? (
                  <IconButton
                    aria-label="duplicate"
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateMealPlan(connection, mealplan.rowId);
                    }}
                    sx={{ "& :hover": { color: theme.palette.primary.main } }}
                  >
                    <ContentCopy />
                  </IconButton>
                ):null}
              </div>
            }
            title={mealplan.nameEn}
            subheader={mealplan.person?.fullName}
          />
          <ImageList sx={{ width: 350, height: 150 }} cols={3} rowHeight={164}>
            {mealplan.mealPlanEntries.nodes.map((meal) =>
              meal.meal?.photoUrl !== null ? (
                <ImageListItem key={meal.meal?.id}>
                  <img
                    src={`${meal.meal?.photoUrl}`}
                    srcSet={`${meal.meal?.photoUrl}`}
                    alt={meal.meal?.photoUrl || "no image"}
                    loading="lazy"
                  />
                </ImageListItem>
              ) : (
                <></>
              )
            )}
          </ImageList>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {mealplan.tags?.map((tag) => (
                <span>{tag} &nbsp;</span>
              ))}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <IconButton 
            aria-label="add to favorites"
            sx={{ "& :hover": { color: theme.palette.secondary.dark } }}
          >
              <Favorite />
            </IconButton>
  
            <ExpandMoreFn
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMore />
            </ExpandMoreFn>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>
                {" "}
                <div>{mealplan.descriptionEn}</div>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
  };