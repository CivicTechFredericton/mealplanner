import { DeleteTwoTone, ShoppingCart } from "@mui/icons-material";
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
  styled,
  Typography,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router";
import { MealPlanNode } from "../../state/types";
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
}

const mealPlansQuery = graphql`
  query MealPlansQuery {
    mealPlans {
      nodes {
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
              {/* {mealplan.person?.fullName} */}
              {getInitials(mealplan.person?.fullName || "")}
            </Avatar>
          }
          action={
            <div>
              <IconButton aria-label="shopping list">
                <ShoppingCart />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteTwoTone />
              </IconButton>
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
  const data = useLazyLoadQuery<MealPlansQuery>(
    mealPlansQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );
  return (
    <div>
      <Grid container spacing={2} margin="1rem" columns={4}>
        {data.mealPlans?.nodes.map((mealplan) => (
          <MealPlanCard mealplan={mealplan} />
        ))}
      </Grid>
    </div>
  );
};
