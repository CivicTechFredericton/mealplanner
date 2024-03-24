import { RaRecord, useRecordContext, TabbedShowLayout, Tab, RichTextField, NumberField, TextField, DateField, ReferenceManyField, SingleFieldList } from "react-admin";
import { Link } from "react-router-dom";
import { NutritionShow } from "../Nutrition/NutritionShow";

export const VideoField = (props: Omit<RaRecord, "id">) => {
    const record = useRecordContext(props);
    if (record.videoUrl === null) return null;
    return (
      <div className="video-responsive">
        <iframe
          width="250px"
          src={"https://youtube.com/embed/".concat(
            record.videoUrl.slice(record.videoUrl.search("=") + 1)
          )}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
  };

  export const Details = () => {
    const meal = useRecordContext();
    return (
      <>
        <TabbedShowLayout syncWithLocation={false}>
          <Tab label="Method">
            <RichTextField source="method" />
            <Link to={`/meals/${meal.id}/ingredients`}>Ingredients</Link>
          </Tab>
          <Tab label="Summary">
            <NumberField source="prepTime" />
            <NumberField source="cookTime" />
            <NumberField source="totalCost" />
            <NumberField source="servingCost" />
            <TextField source="tips" />
            <NumberField source="servingsSize" />
            <TextField source="servingsSizeUnit" />
            <NumberField source="portions" />
            <NumberField source="nutritionRating" />
            <TextField source="descriptionEn" />
            <TextField source="descriptionFr" />
  
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
          </Tab>
          <Tab label="Nutrition">
            <ReferenceManyField
              reference="nutrition"
              target="nutritionableId"
              filter={{ nutritionableType: "meal" }}
            >
              <SingleFieldList>
                <NutritionShow />
              </SingleFieldList>
            </ReferenceManyField>
          </Tab>
        </TabbedShowLayout>
      </>
    );
  };
  