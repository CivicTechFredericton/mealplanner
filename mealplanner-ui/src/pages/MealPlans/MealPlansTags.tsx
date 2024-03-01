import { Chip, Grid } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { MealPlansTags_tags$key } from "./__generated__/MealPlansTags_tags.graphql";
import { setSelectedMealPlanTags } from "../../state/state";

const MealPlansTagsFragment = graphql`
  fragment MealPlansTags_tags on Query{
    gqLocalState {
      selectedMealPlanTags
    }
    allMealPlanTags(first:100) {
      edges {
        node
      }
    }
  }
`

export const MealPlansTags = ({tags}:{tags: MealPlansTags_tags$key}) => {
    const mptags = useFragment(MealPlansTagsFragment, tags);
    // If nothing is selected, mptags.gqLocalState.selectedMealPlanTags will return a null
    // When it returns a null, we need to assign an empty array.
    const selectedMPTags = mptags.gqLocalState.selectedMealPlanTags || [];
    const handleTagClick = (node: string) => {
        // if tag does not exist, add to the GQLocalState
        if(!selectedMPTags.includes(node)) {
            const selectedTags = selectedMPTags.concat([node])
            setSelectedMealPlanTags(selectedTags);
            return;
        }
        // if tag exists, remove from the GQLocalState
        const index = selectedMPTags.indexOf(node);
        let selectedTags = [...selectedMPTags];
        selectedTags.splice(index, 1);
        setSelectedMealPlanTags(selectedTags);
    }

    return (
        <Grid container direction="column" margin="0rem 2rem">
              <div>
              {mptags.allMealPlanTags?.edges.map((edge, index) => {
                const node = edge?.node;
                if(node !== null) {
                  return (
                  <Chip
                    key={index}
                    label={node}
                    clickable
                    color={selectedMPTags.includes(node) ? "primary" : "default"}
                    onClick={() => handleTagClick(node)}
                    onDelete={selectedMPTags.includes(node) ? () => handleTagClick(node) : undefined}
                  />
                  );
                }})}
              </div>
        </Grid>
    )
}
