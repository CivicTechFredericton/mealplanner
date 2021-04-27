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
import { createFragmentContainer } from 'react-relay';

import { QueryRenderer, createRefetchContainer, commitMutation } from 'react-relay';
import environment from '../relay-environment';

const PracticeFrom2 = (props) => {
    // let { NUTRITIONID } = useParams();
    // console.log(NUTRITIONID);

    // const initialValues = {
    //     "id": "",
    //     "calcium": "",
    //     "calories": "",
    //     "carbohydrate": "",
    //     "carbohydratePercent": "",
    //     "carbohydrateUnit": ""
    // };

    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: initialValues,
    //     validate: (values) => validation(values),
    //     onSubmit: (values) => submit(values)
    // });

    // const validation = (values) => {
    //     const errors = {};

    //     if (!values.calories) {
    //         errors.calories = "Required";
    //     }

    //     if (!values.carbohydrate) {
    //         errors.carbohydrate = "Required";
    //     }

    //     return errors;
    // };

    // const submit = (values) => {
    //     console.log("values", values);
    // };
    // return (
    //   <QueryRenderer
    //     environment={environment}
    //     query={graphql`
    //               query NutritionQuery($nutritionID: ID!) {
    //                 nutrition(rowId: $nutritionID) {
    //                     calcium
    //                     calories
    //                     carbohydrate
    //                     carbohydratePercent
    //                     carbohydrateUnit
    //                   }
    //               }
    //       `}
    //     render={renderPracticeFrom2}
    //     variables={{
    //         nutritionID: NUTRITIONID,
    //         formik: formik
    //     }}
    //   />
    // );
    return (<div></div>);
  };

const renderPracticeFrom2 = (props, error) => {

    //let { NUTRITIONID } = useParams();
    if (error || props === undefined) {
        return (<></>);
    } else if (props) {
   
    const {nutritionID, formik, NutritionQuery} = props;

    //not quite right fields need to match
    formik.setFields(NutritionQuery);

    const onHandleSubmit = () => {
        formik.handleSubmit();
    };

    let title = "Add Nutrition";
    let buttonText = "Add";

    if (nutritionID) {
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
    } else {
        return <div>Loading</div>;
    }

};



export default PracticeFrom2;