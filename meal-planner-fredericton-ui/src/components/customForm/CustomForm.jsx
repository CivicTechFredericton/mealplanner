import React from 'react';
import { Formik, Form } from 'formik';
import { PropTypes } from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const CustomForm = (props) => {

    const { onValidate, initialValues, onSubmit, children, title, enableReinitialize } = props


    return (
        <Box>
            <Formik
                enableReinitialize={enableReinitialize}
                initialValues={initialValues}
                validate={values => onValidate(values)}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    onSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, values, setFieldValue, errors }) => (

                    <Box>
                        {title &&
                            <Typography component="h5" variant="h5">
                                {title}
                            </Typography>
                        }
                        <Form>
                            <Box>
                                {
                                    React.Children.map(children, child => {
                                        return React.cloneElement(child, {
                                            isSubmitting,
                                            values,
                                            setFieldValue,
                                            errors
                                        })
                                    })
                                }
                            </Box>
                        </Form>
                    </Box>
                )}
            </Formik>
        </Box>
    );
};

CustomForm.defaultprops = {
    enableReinitialize: true
};

CustomForm.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    onValidate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    enableReinitialize: PropTypes.bool
};

export default CustomForm;