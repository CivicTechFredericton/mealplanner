import { useTheme } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActions, IconButton, Collapse, IconButtonProps, styled } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { MealNode } from "../../state/types";
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
  
type MealProps = { node: MealNode };
  
export const MealCard = (props: MealProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);
    const meal = props.node;
    const navigate = useNavigate();
    const handleExpandClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setExpanded(!expanded);
    };
    const handleToggleFavorite = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFavorite(!isFavorite);
      if(isFavorite) {
         removeFavoriteMeal(meal.rowId);
      }
      else {
         addFavoriteMeal(meal.rowId);
      }
    };

    const theme = useTheme();
    const tagStyle = {
      color: "white",
      backgroundColor: "primary",
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
          <IconButton aria-label="toggle favorite" onClick={handleToggleFavorite}>
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
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