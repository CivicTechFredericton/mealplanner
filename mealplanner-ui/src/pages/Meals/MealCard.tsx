import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { RefetchFnDynamic } from "react-relay";
import { useNavigate } from "react-router-dom";
import { OperationType } from "relay-runtime";
import { MealNode } from "../../state/types";
import { MealsDataQuery$data } from "./__generated__/MealsDataQuery.graphql";
import { addFavoriteMeal } from "./AddFavoriteMeal";
import { removeFavoriteMeal } from "./RemoveFavoriteMeal";

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

interface MealProps {
  node: MealNode;
  refetch: RefetchFnDynamic<OperationType, MealsDataQuery$data>;
  selectedFavs: readonly string[];
}

export const MealCard = (props: MealProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const meal = props.node;
  const selectedPFMeals = props.selectedFavs;
  const isFavorite = selectedPFMeals.includes(meal.rowId);
  const navigate = useNavigate();

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleToggleFavorite = (id: string) => {
    if (!selectedPFMeals.includes(id)) {
      addFavoriteMeal(id).then(() => {
        props.refetch({}, { fetchPolicy: "network-only" });
      });
      return;
    }
    removeFavoriteMeal(id).then(() => {
      props.refetch({}, { fetchPolicy: "network-only" });
    });
  };

  const theme = useTheme();
  const tagStyle = {
    color: "white",
    backgroundColor: `${theme.palette.primary.dark}`,
    padding: "0 0.5em",
    borderRadius: "1em",
    margin: "0.3em 0",
    display: "inline-block",
  };
  return (
    <Grid item xs="auto">
      <Card
        sx={{ width: 300 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(`/meals/${meal.rowId}`);
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.cursor = "pointer";
        }}
      >
        <CardHeader
          action={<div></div>}
          title={meal.nameEn}
          subheader={meal.nameFr}
        />
        <CardMedia
          component="img"
          height="194"
          image={meal.photoUrl || "/images/Logo_Meal.png"}
          alt={meal.nameEn}
          style={{ objectFit: meal.photoUrl ? "cover" : "contain" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" lineHeight="2rem">
            {meal.tags?.map((tag: any) => (
              <span>
                <span style={tagStyle}>{tag}</span>
                &nbsp;
              </span>
            ))}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Toggle Favorite" placement="right">
            <IconButton
              aria-label="toggle favorite"
              sx={{ color: theme.palette.secondary.dark }}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(meal.rowId);
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          <ExpandMoreFn
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMoreFn>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>
              {" "}
              <div>{meal.descriptionEn}</div>
              <div>{meal.descriptionFr}</div>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
