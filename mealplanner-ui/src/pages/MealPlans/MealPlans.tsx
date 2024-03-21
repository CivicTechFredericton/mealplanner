import {
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { Suspense, useState } from "react";
import { useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { CreateMealPlan } from "./CreateMealPlan";
import { MealPlanCard } from "./MealPlanCard";
import { MealPlansTags, MealPlansTagsFragment } from "./MealPlansTags";
import { MealPlansQuery } from "./__generated__/MealPlansQuery.graphql";



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
          isTemplate
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
    # fragment name from MealPlansTags
    ...MealPlansTags_tags
    gqLocalState {
      selectedMealPlanTags
    }
  }
`;

export const MealPlans = () => {
  const [searched, setSearched] = useState<string>("");
  const [searchType, setSearchType] = useState('name');

  const data = useLazyLoadQuery<MealPlansQuery>(
    mealPlansQuery,
    {},
    { fetchPolicy: "network-only" }
  );

  const [_, refetch] = useRefetchableFragment(MealPlansTagsFragment, data);
  
  const selectedTags = data.gqLocalState.selectedMealPlanTags || [];

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
              value="template"
              control={<Radio />}
              label="Template"
              checked={searchType === 'template'}
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
          <CreateMealPlan connection={data.mealPlans?.__id} refetch={refetch}  />
        ) : (
          <></>
        )}
        </span>
        </Grid>
        {searchType === 'tags' &&
          <Suspense fallback={"loading tags..."}>
            <MealPlansTags tags={data}/>
          </Suspense>
        }
      {data.mealPlans ? (
        <Grid container spacing={2} margin="1rem" columns={4}>
          {data.mealPlans?.edges.map(({ node }) => {
          if ((searchType === 'name' && node.nameEn.toLowerCase().includes(searched)) && !(node.isTemplate)|| (searchType === 'tags' && selectedTags.every(tag => node.tags?.includes(tag)))) {
              return (
                <MealPlanCard
                  mealplan={node}
                  refetch={refetch}
                  connection={data.mealPlans!.__id}
                />
              );
          }
          else if (searchType === 'template' && node.isTemplate) {
            return (
              <MealPlanCard
                mealplan={node}
                refetch={refetch}
                connection={data.mealPlans!.__id}
              />
            );
          }
        })}
        </Grid>
      ) : (
        "No mealplans"
      )}
    </div>
  );
};
