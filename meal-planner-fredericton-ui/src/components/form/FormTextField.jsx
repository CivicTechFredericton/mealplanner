import React from "react";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles({
    root: {
        marginTop: 5,
        marginBottom: 15
    },
    text: {
        marginBottom: 0,
        paddingBottom: 0,
        fontSize: 12
    }
});
const FormTextField = (props) => {
    const {
        id,
        label,
        name,
        style,
        fullWidth,
        margin,
        color,
        type,
        variant,
        autoComplete,
        autoFocus,
        disabled,
        defaultValue,
        rows,
        multiline,
        formik,
        disableIsSubmitting,
        InputProps
    } = props;

    const fieldId = id || name;
    const classes = useStyles();

    const handleErrors = () => {
        if (!!formik.errors[name] && formik.touched[name]) {
            return true;
        }
        return false;
    };

    const handleErrorText = () => {
        if (handleErrors()) {
            return formik.errors[name];
        }
        return "";
    };

    const isDisabled = () => {
        if (!disableIsSubmitting) {
            return formik.isSubmitting || disabled;
        }
        return disabled;
    };

    return (
        <Box >
            <Typography className={classes.text}>
                {label}
            </Typography>

            <TextField
                fullWidth={fullWidth}
                multiline={multiline}
               // disabled={isDisabled()}
                className={classes.root}
                name={name}
                value={formik.values[name] || ""}
                id={fieldId}
                margin={margin}
                color={color}
                type={type}
                style={{...style}}
                variant={variant}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                defaultValue={defaultValue}
                error={handleErrors()}
                helperText={handleErrorText()}
                rows={rows}
                InputProps={{...InputProps}}
            />
        </Box>
    );
};

FormTextField.defaultProps = {
    fullWidth: true,
    margin: "normal",
    color: "primary",
    type: "text",
    variant: "outlined",
    autoComplete: "off",
    autoFocus: false,
    disabled: false,
    disableIsSubmitting: false
};

FormTextField.propTypes = {
    fullWidth: PropTypes.bool,
    margin: PropTypes.string,
    variant: PropTypes.string,
    id: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    formik: PropTypes.object.isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    rows: PropTypes.string,
    multiline: PropTypes.bool,
    disableIsSubmitting: PropTypes.bool,
    style: PropTypes.object
};

export default FormTextField;










