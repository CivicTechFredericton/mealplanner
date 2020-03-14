import React, { PureComponent } from 'react';

import { Field } from 'formik';
import { PropTypes } from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';
import { createStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';

const styles = createStyles({
    root: {
        marginTop: 3,
        marginBottom: 16
    },
    text: {
        marginBottom: 0,
        paddingBottom: 0,
        fontSize: 12
    }
});

class FormTextField extends PureComponent {

    render() {
        const { id, label, name, isSubmitting,
            values, setFieldValue, errors,
            fullWidth, margin, color, type,
            variant, autoComplete, autoFocus 
        } = this.props;

        const fieldID = id || name;

        const inputProps = {
            classes: {
                input: classes.inputRoot
            },
        };


        return (
            <Box>

                <Typography className={classes.text}>
                    {label}
                </Typography>

                <Field
                    fullWidth={fullWidth}
                    id={fieldID}
                    className={classes.root}
                    margin={margin}
                    color={color}
                    type={type}
                    component={TextField}
                    inputProps={inputProps}
                    variant={variant}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                />
            </Box>
        );
    };
};

FormTextField.defaultProps = {
    fullWidth: false,
    margin: "normal",
    color: "primary",
    type: "text",
    variant: "outlined",
    autoComplete: "off",
};

FormTextField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool,
    values: PropTypes.object,
    setFieldValue: PropTypes.func,
    errors: PropTypes.object,
    fullWidth: PropTypes.bool,
    margin: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string,
    autoComplete: PropTypes.string,
    autoComplete: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(FormTextField);

