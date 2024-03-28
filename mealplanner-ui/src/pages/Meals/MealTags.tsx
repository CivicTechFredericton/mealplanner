import { Chip, Grid, Stack } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { MealTags_tags$key } from "./__generated__/MealTags_tags.graphql";
import { setSelectedMealTags } from "../../state/state";

export const MealTagsFragment = graphql`
  fragment MealTags_tags on Query
    @refetchable(queryName: "MealTagsRefetchQuery") {
        gqLocalState {
            selectedMealTags
        }
        allMealTags(first:100) {
            edges {
                node
            }
        }
  }
`;

export const MealTags = ({ tags }: { tags: MealTags_tags$key }) => {
  const mealTags = useFragment(MealTagsFragment, tags);
  // If nothing is selected, mealTags.gqLocalState.selectedMealTags will return a null
  // When it returns a null, we need to assign an empty array.
  const selectedMTags = mealTags.gqLocalState.selectedMealTags || [];
  const handleTagClick = (node: string) => {
    // if tag does not exist, add to the GQLocalState
    if (!selectedMTags.includes(node)) {
      const selectedTags = selectedMTags.concat([node]);
      setSelectedMealTags(selectedTags);
      return;
    }
    // if tag exists, remove from the GQLocalState
    const index = selectedMTags.indexOf(node);
    let selectedTags = [...selectedMTags];
    selectedTags.splice(index, 1);
    setSelectedMealTags(selectedTags);
  };

  return (
    <Grid container direction="column" margin="0rem 2rem">
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', width: '100%' }}>
        {mealTags.allMealTags?.edges.map((edge, index) => {
          const node = edge?.node;
          if (node !== null && node !== undefined) {
            return (
              <Chip
                key={index}
                label={node}
                clickable
                color={selectedMTags.includes(node) ? "primary" : "default"}
                onClick={() => handleTagClick(node)}
                onDelete={
                  selectedMTags.includes(node)
                    ? () => handleTagClick(node)
                    : undefined
                }
              />
            );
          }
        })}
      </Stack>
    </Grid>
   );
};