import { DeleteTwoTone, Search, ShoppingCart, ContentCopy } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  ImageList,
  ImageListItem,
  InputBase,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React, { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router";
import { MealPlanNode } from "../../state/types";
import { CreateMealPlan } from "./CreateMealPlan";
import { deleteMealPlan } from "./DeleteMealPlan";
import { duplicateMealPlan } from "./DuplicateMealPlan";
import {getCurrentPerson} from "../../state/state";
import { MealPlansQuery } from "./__generated__/MealPlansQuery.graphql";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface MealPlanCardProps {
  mealplan: MealPlanNode;
  connection: string;
}

const mealPlansQuery = graphql`
  query MealPlansQuery {
    mealPlans(orderBy: [CREATED_AT_DESC], first: 1000)
      @connection(key: "connection_mealPlans") {
      __id
      edges {
        cursor
        node {
          id
          rowId
          nameEn
          descriptionEn
          person {
            fullName
          }
          tags
          mealPlanEntries {
            nodes {
              meal {
                id
                photoUrl
              }
            }
          }
        }
      }
    }
  }
`;

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

const MealPlanCard = (props: MealPlanCardProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const mealplan = props.mealplan;
  const connection = props.connection;
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
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
              >
                <ShoppingCart />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("meal plan id: ", typeof mealplan.rowId);
                  deleteMealPlan(connection, mealplan.rowId);
                }}
              >
                <DeleteTwoTone />
              </IconButton>
              {getCurrentPerson().personRole === "app_admin" || getCurrentPerson().personRole === "app_meal_designer" ? (
                <IconButton
                  aria-label="duplicate"
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateMealPlan(connection, mealplan.rowId);
                  }}
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
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

export const MealPlans = () => {
  const [searched, setSearched] = useState<string>("");
  const data = useLazyLoadQuery<MealPlansQuery>(
    mealPlansQuery,
    {},
    { fetchPolicy: "network-only" }
  );
  return (
    <div>
      <Grid
        container
        spacing={2}
        columns={2}
        justifyContent="right"
        gap="2rem"
        margin="1rem"
        width="95%"
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "75%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Meal plan"
            inputProps={{ "aria-label": "Search Meal Plan" }}
            onChange={(e) => {
              setSearched(e.target.value.toLowerCase());
            }}
          />
          <Search></Search>
        </Paper>
        {data.mealPlans ? (
          <CreateMealPlan connection={data.mealPlans?.__id} />
        ) : (
          <></>
        )}
      </Grid>
      {data.mealPlans ? (
        <Grid container spacing={2} margin="1rem" columns={4}>
          {data.mealPlans?.edges.map(({ node }) => {
            if (node.nameEn.toLowerCase().includes(searched))
              return (
                <MealPlanCard
                  mealplan={node}
                  connection={data.mealPlans!.__id}
                />
              );
          })}
        </Grid>
      ) : (
        "No mealplans"
      )}
    </div>
  );
};
