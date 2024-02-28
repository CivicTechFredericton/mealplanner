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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  IconButton,
  IconButtonProps,
  InputBase,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React, { useState } from "react";
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
    allMealTags(first:10) {
      edges {
      node
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
  const [searchMeal, setSearchMeal] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchType, setSearchType] = useState('name');
  const data = useLazyLoadQuery<MealsQuery>(
    mealsQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  return (
    <div>
    <Grid
    container
    spacing={2}
    columns={2}
    gap="2rem"
    margin="1rem 2rem"
    width="95%"
    justifyContent="space-between"
  >
       <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="searchType"
        name="searchType"
        value={searchType}
        onChange={(e) => {
          setSearchType(e.target.value);
        }}
      >
       <FormControlLabel
          value="name"
          control={
            <Radio 
              checked={searchType === 'name'}
            />
          }
          label={
            <InputBase
              placeholder="Search Name"
              inputProps={{ "aria-label": "Search By Name" }}
              readOnly={searchType !== 'name'}
              value={searchMeal}
              onChange={(e) => {
                if (searchType === 'name') {
                  setSearchMeal(e.target.value.toLowerCase());
                }
              }}
              style={{ cursor: 'text',
                      borderBottom: '1px solid black', width: '40vw' }}
              />
          }
        />
        <FormControlLabel
          value="favorites"
          control={<Radio />}
          label="Favorites"
          checked={searchType === 'favorites'}
        />
        <FormControlLabel
          value="tags"
          control={<Radio />}
          label="Tags"
          checked={searchType === 'tags'}
        /> 
      </RadioGroup>
    </FormControl>
    </Grid>
    {searchType === 'tags' &&
            <Grid container direction="column" margin="0rem 2rem">
              <div>
              {data.allMealTags?.edges.map((edge, index) => {
                const node = edge?.node;
                if(node !== null) {
                  return (
                  <Chip
                    key={index}
                    label={node}
                    clickable
                    color={selectedTags.includes(node) ? "primary" : "default"}
                    onClick={() => handleTagClick(node)}
                    onDelete={selectedTags.includes(node) ? () => handleTagClick(node) : undefined}
                    style={{ marginRight: '0.2rem' }}
                  />
                  );
                }})}
              </div>
            </Grid>
          }
  {data.meals ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          marginTop="1rem"
          columns={4}
        >
          {data.meals?.nodes.map((node) => {
            if (node.nameEn.toLowerCase().includes(searchMeal))
              return <MealCard node={node} />;
          })}
        </Grid>
      ) : (
        "No meals"
      )}
      </div>
  );
};
