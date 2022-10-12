import { Search } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
  InputBase,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router";
import { MealNode } from "../../state/types";
import { MealsQuery } from "./__generated__/MealsQuery.graphql";

const mealsQuery = graphql`
  query MealsQuery {
    meals(orderBy: [ID_DESC], first: 1000) {
      nodes {
        rowId
        nameEn
        nameFr
        descriptionEn
        descriptionFr
        categories
        tags
        code
        photoUrl
        videoUrl
      }
    }
  }
`;

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

type MealProps = { node: MealNode };

const MealCard = (props: MealProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const meal = props.node;
  const navigate = useNavigate();
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  const theme = useTheme();
  const tagStyle = {
    color: "white",
    backgroundColor: `${theme.palette.primary.main}`,
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
            {meal.tags?.map((tag) => (
              <span>
                <span style={tagStyle}>{tag}</span>
                &nbsp;
              </span>
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
              <div>{meal.descriptionEn}</div>
              <div>{meal.descriptionFr}</div>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
export const Meals = () => {
  const data = useLazyLoadQuery<MealsQuery>(
    mealsQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );
  return (
    <Grid
      container
      spacing={2}
      columns={2}
      justifyContent="center"
      marginTop="1rem"
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "75%",
          justifyContent: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Meal plan"
          inputProps={{ "aria-label": "Search Meal" }}
        />
        <Search></Search>
      </Paper>
      {data.meals ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          marginTop="1rem"
          columns={4}
        >
          {data.meals?.nodes.map((node) => (
            <MealCard node={node} />
          ))}
        </Grid>
      ) : (
        "No meals"
      )}
    </Grid>
  );
};
