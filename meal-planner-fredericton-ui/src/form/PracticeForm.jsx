import React from "react";

import { useFormik } from "formik";
// import FormTextArea from "../components/form/FormTextArea";
import FormTextField from "../components/form/FormTextField";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const PracticeFrom = (props) => {

    const { name } = props;

    const initialValues = {
        name: "",
        description: "",
        location: "",
        country: ""
    };

    const formik = useFormik({
        //enableReinitialize: true,
        // validateOnChange: false,
        initialValues: initialValues,
        validate: (values) => validation(values),
        onSubmit: (values) => submit(values)
    });

    const validation = (values) => {
        const errors = {};

        // if (!values.name) {
        //     errors.name = "Required";
        // }

        return errors;
    };

    const submit = (values) => {
        console.log("values", values);
    };

    const onHandleSubmit = () => {
        formik.handleSubmit();
    };

    return (
        <Box mt={30} ml={60} >

            <Box >
                {name}
            </Box>

            <FormTextField
                name="country"
                label="Country Here"
                formik={formik}
            />
            <Button
                onClick={onHandleSubmit}
                color="primary"
                variant="outlined"
            >
                start
                </Button>
        </Box>
    );

};

export default PracticeFrom;