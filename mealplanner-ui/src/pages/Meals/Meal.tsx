import { ArrowBack, Print } from "@mui/icons-material";
import {
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router";
import { MealQuery } from "./__generated__/MealQuery.graphql";

const mealQuery = graphql`
  query MealQuery($mealId: BigInt!) {
    meal(rowId: $mealId) {
      rowId
      code
      nameEn
      nameFr
      tags
      descriptionEn
      descriptionFr
      categories
      photoUrl
      videoUrl
      method
      totalCost
      servingCost
      tips
      servingsSize
      servingsSizeUnit
      prepTime
      cookTime
      portions
      nutritionRating
      nutrition {
        id
      }
    }
  }
`;

export const Meal = () => {
  const params = useParams();
  const node = useLazyLoadQuery<MealQuery>(
    mealQuery,
    { mealId: params.id },
    { fetchPolicy: "store-or-network" }
  );
  const meal = node.meal;
  const theme = useTheme();
  const tagStyle = {
    color: "white",
    backgroundColor: `${theme.palette.primary.dark}`,
    padding: "0 0.5em",
    borderRadius: "1em",
    margin: "0.3em 0",
    display: "inline-block",
  };

  const displayCost = () => {
    return meal?.totalCost > 0 ? meal?.totalCost + "$" : "Not available";
  };

  const displayTags = () => {
    return meal!.tags?.map((tag) => (
      <span>
        <span style={tagStyle}>{tag}</span>
        &nbsp;
        {/* For the space between tags */}
      </span>
    ));
  };
  return (
    <>
      <Box
        sx={{
          displayPrint: "none",
          width: "100%",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${meal?.photoUrl || "/images/Logo_Meal.png"})`,
        }}
      >
        <IconButton
          onClick={() => window.history.back()}
          color="inherit"
          sx={{ top: 30, left: 50, bgcolor: "white", opacity: "0.9" }}
        >
          <ArrowBack />
        </IconButton>
        <Paper
          sx={{
            textAlign: "center",
            width: "160px",
            opacity: "0.7",
            position: "absolute",
            right: 50,
            top: 150,
            backgroundColor: "black",
          }}
        >
          <Typography variant="caption" color="whitesmoke">
            Estimated price
          </Typography>
          <Typography variant="h5" color="whitesmoke">
            {displayCost()}
          </Typography>
        </Paper>
        <Paper
          sx={{
            textAlign: "center",
            width: "160px",
            opacity: "0.7",
            position: "absolute",
            right: 50,
            top: 250,
            backgroundColor: "black",
          }}
        >
          <Typography variant="caption" color="whitesmoke">
            Nutrition rating
          </Typography>
          <Rating
            name="read-only"
            value={
              meal?.nutritionRating === undefined ? null : meal?.nutritionRating
            }
            readOnly
          />
        </Paper>
        <Typography
          variant="body1"
          lineHeight="2rem"
          position="absolute"
          top="300px"
          left="50px"
        >
          {displayTags()}
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={{ marginTop: "1em" }}>
        <Grid container spacing={2} rowSpacing={4}>
          <Grid
            item
            xs={3}
            sx={{ textAlign: "center", displayPrint: "none" }}
            bgcolor={theme.palette.grey[200]}
          >
            {meal?.videoUrl ? (
              //  Showing youtube video only if it exists
              <div className="video-responsive">
                <iframe
                  width="250px"
                  src={"https://youtube.com/embed/".concat(
                    meal?.videoUrl.slice(meal?.videoUrl.search("=") + 1)
                  )}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            ) : (
              <img
                width="200px"
                src={meal?.photoUrl || "/images/Logo_Meal.png"}
                alt={meal?.nameEn}
              />
            )}
          </Grid>

          <Grid item xs={9} bgcolor={theme.palette.grey[200]}>
            <Typography variant="h3">
              {meal?.nameEn}
              <IconButton
                onClick={() => window.print()}
                sx={{ marginLeft: "1rem", displayPrint: "none" }}
              >
                <Print htmlColor={`${theme.palette.primary.dark}`}></Print>
              </IconButton>
            </Typography>

            <Typography variant="h4">{meal?.nameFr}</Typography>
            <Typography variant="body1">
              {meal?.categories?.map((category) => (
                <span>
                  <span style={tagStyle}>{category}</span>
                  &nbsp;
                </span>
              ))}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "none", displayPrint: "block" }}
            >
              {displayTags()}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "none", displayPrint: "block" }}
            >
              Estimated Price: {displayCost()} Nutrition Rating:{" "}
              {meal?.nutritionRating}
            </Typography>
            <Typography variant="caption">
              Meal Code: {meal?.code} &nbsp; Prep Time:{" "} {meal?.prepTime} mins &nbsp; 
              Cook Time:{" "} {meal?.cookTime} mins &nbsp; Portions: {meal?.portions} &nbsp;
              Serving Size: {meal?.servingsSize} {meal?.servingsSizeUnit} &nbsp;
              Serving Cost: {meal?.servingCost}$
            </Typography>

            {/* Explicitly indicate meal description is not available*/}
            {meal?.descriptionEn ? (
              <Typography paddingTop="1em">
                <b>Description: </b>
                {meal.descriptionEn}{" "}
              </Typography>
            ) : (
              <Typography color="gray">
                No meal description available
              </Typography>
            )}
            <Typography paddingBottom="1em">{meal?.descriptionFr}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6"> Ingredients </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6"> Method of preparation </Typography>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: meal?.method || "no method description",
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Tips</Typography>
            <Typography variant="body1"> {meal?.tips}</Typography>
            Nutrition Details is available with the admin.
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
