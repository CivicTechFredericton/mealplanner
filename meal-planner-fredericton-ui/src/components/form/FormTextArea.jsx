import React from "react";
import { PropTypes } from "prop-types";
import FormTextField from "./FormTextField";

const FormTextArea = (props) => {

    const {
        id,
        label,
        name,
        fullWidth,
        margin,
        color,
        type,
        variant,
        autoComplete,
        autoFocus,
        disabled,
        defaultValue,
        style,
        rows,
        multiline,
        formik,
        disableIsSubmitting,
    } = props;

    return (
        <FormTextField
            formik={formik}
            fullWidth={fullWidth}
            multiline={multiline}
            label={label}
            disabled={disabled}
            name={name}
            id={id}
            style={{...style}}
            margin={margin}
            color={color}
            type={type}
            variant={variant}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            rows={rows}
            disableIsSubmitting={disableIsSubmitting}
        />
    );
};

FormTextArea.defaultProps = {
    multiline: true,
    fullWidth: true,
    margin: "normal",
    color: "primary",
    type: "text",
    variant: "outlined",
    autoComplete: "off",
    autoFocus: false,
    disabled: false,
    rows: "2",
    disableIsSubmitting: false,
};

FormTextArea.propTypes = {
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
    label: PropTypes.string.isRequired,
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

export default FormTextArea;
