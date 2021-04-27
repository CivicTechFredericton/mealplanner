import React, { useEffect } from "react";

import { useFormik } from "formik";
// import FormTextArea from "../components/form/FormTextArea";
import FormTextField from "../components/form/FormTextField";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
import Header from "../core/header/Header";
import { Typography } from "@material-ui/core";

import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer, createRefetchContainer, commitMutation } from 'react-relay';
import environment from '../relay-environment';


async function handleSave({
    nutritionableId,
    nutritionableType,
    calcium,
    calories,
    carbohydrate,
    carbohydratePercent,
    carbohydrateUnit
  }) {
    
    // const promises = doCreateNutritionEntry({ 
    //     nutritionableId,
    //     nutritionableType,
    //     calcium,
    //     calories,
    //     carbohydrate,
    //     carbohydratePercent,
    //     carbohydrateUnit});

    try {
    //  await Promise.all(promises); // wait for all mutations to complete
      
    } catch(e) {
      console.error('Error happen creating nutrition entries', e);
    }
  }


// function doCreateNutritionEntry({
//     nutritionableId,
//     nutritionableType,
//     calcium,
//     calories,
//     carbohydrate,
//     carbohydratePercent,
//     carbohydrateUnit
// }) {
//     return new Promise(function createNutritionPromise(resolve, reject) {
//         commitMutation(
//             environment,
//             {
//                 variables: {
//                     nutritionableId,
//                     nutritionableType,
//                     calcium,
//                     calories,
//                     carbohydrate,
//                     carbohydratePercent,
//                     carbohydrateUnit
//                 },
//                 mutation: graphql`
//             mutation NutritionCreateMutation(
//               $nutritionableId: String!
//               $nutritionableType: String!
//               $calcium: String!
//               $calories: String!
//               $carbohydrate: String!
//               $carbohydratePercent: String!
//               $carbohydrateUnit: String!
//             ) {
//                 createNutrition(input: {
//                     nutrition: {
//                         nutritionableId: $nutritionableId, 
//                         nutritionableType: $nutritionableType, 
//                         calcium: $calcium, 
//                         calories: $calories, 
//                         carbohydrate: $carbohydrate, 
//                         carbohydratePercent: $carbohydratePercent, 
//                         carbohydrateUnit:  $carbohydrateUnit
//                     }
//                 })
//                 {
//                     nutrition {
//                         id
//                         rowId
//                       }
//                 }
//             }
//           `,
//                 onCompleted: function onCompleteHandler(response, errors) {
//                     if (errors) {
//                         reject(errors);
//                         return;
//                     }
//                     const { createNutritiony: { nutrition } } = response;
//                     resolve(nutrition);
//                 },
//                 onError: function onErrorHandler(err) {
//                     reject(err);
//                 }
//             }
//         );
//     });
// }

const PracticeFrom = (props) => {

    let { NUTRITIONID } = useParams();


    useEffect(() => {
        if (NUTRITIONID) {
            console.log(NUTRITIONID, "NUTRITIONID");
        }

    }, [NUTRITIONID]);

    const initialValues = {
        "id": "",
        "calcium": "",
        "calories": "",
        "carbohydrate": "",
        "carbohydratePercent": "",
        "carbohydrateUnit": ""
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validate: (values) => validation(values),
        onSubmit: (values) => submit(values)
    });

    const validation = (values) => {
        const errors = {};

        if (!values.calories) {
            errors.calories = "Required";
        }

        if (!values.carbohydrate) {
            errors.carbohydrate = "Required";
        }

        return errors;
    };

    const submit = (values) => {
        console.log("values", values);
       // handleSave(values);
    };

    const onHandleSubmit = () => {
        formik.handleSubmit();
    };

    let title = "Add Nutrition";
    let buttonText = "Add";

    if (NUTRITIONID) {
        title = "Update Nutrition";
        buttonText = "Update";
    }

    return (
        <Box>

            <Header />

            <Box mt={20} mb={20} mr={50} ml={50}>

                <Typography style={{ marginBottom: 20, textAlign: "center" }} component="h5" variant="h5">
                    {title}
                </Typography>

                <FormTextField
                    name="calcium"
                    label="Calcium"
                    formik={formik}
                />

                <FormTextField
                    name="calories"
                    label="Calories"
                    formik={formik}
                />

                <FormTextField
                    name="carbohydrate"
                    label="Carbohydrate"
                    formik={formik}
                />

                <FormTextField
                    name="carbohydratePercent"
                    label="Carbohydrate Percent"
                    formik={formik}
                />

                <FormTextField
                    name="carbohydrateUnit"
                    label="Carbohydrate Unit"
                    formik={formik}
                />

                <Box display="flex" flexDirection="row" justifyContent={"center"} alignContent="center">
                    <Button
                        style={{ width: 200 }}
                        onClick={onHandleSubmit}
                        color="primary"
                        variant="outlined"
                    >
                        {buttonText}
                    </Button>
                </Box>

            </Box>
        </Box>
    );

};


export default PracticeFrom;