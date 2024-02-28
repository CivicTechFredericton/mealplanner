import { DeleteTwoTone, Search, ShoppingCart } from "@mui/icons-material";
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
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router";
import { MealPlanNode } from "../../state/types";
import { CreateMealPlan } from "./CreateMealPlan";
import { deleteMealPlan } from "./DeleteMealPlan";
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
    allMealPlanTags(first:10) {
      edges {
      node
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchType, setSearchType] = useState('name');
  const [fetchKey, setFetchKey] = useState(0);

  const refresh = useCallback(() => {
    setFetchKey(prevFetchKey => prevFetchKey + 1);
  }, []);

  const data = useLazyLoadQuery<MealPlansQuery>(
    mealPlansQuery,
    {},
    { fetchPolicy: "network-only", fetchKey }
  );

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    refresh();
  }, [searchType]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        columns={2}
        gap="2rem"
        margin="1rem 2rem 0.5rem"
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
                  value={searched}
                  onChange={(e) => {
                    if (searchType === 'name') {
                      setSearched(e.target.value.toLowerCase());
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
        <span>
        {data.mealPlans ? (
          <CreateMealPlan connection={data.mealPlans?.__id} />
        ) : (
          <></>
        )}
        </span>
        </Grid>
        {searchType === 'tags' &&
            <Grid container direction="column" margin="0rem 2rem">
              <div>
              {data.allMealPlanTags?.edges.map((edge, index) => {
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
                    style={{ margin: '0.1rem' }}
                  />
                  );
                }})}
              </div>
            </Grid>
          }
      {data.mealPlans ? (
        <Grid container spacing={2} margin="1rem" columns={4}>
          {data.mealPlans?.edges.map(({ node }) => {
          if ((searchType === 'name' && node.nameEn.toLowerCase().includes(searched)) || (searchType === 'tags' && selectedTags.every(tag => node.tags?.includes(tag)))) {
              return (
                <MealPlanCard
                  mealplan={node}
                  connection={data.mealPlans!.__id}
                />
              );
          }})}
        </Grid>
      ) : (
        "No mealplans"
      )}
    </div>
  );
};
