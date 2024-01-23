
import * as React from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { useTranslate } from 'ra-core';
import { CommonInputProps, TextInput, TextInputProps } from 'react-admin';


export const MySearchInput = (props: MySearchInputProps) => {
    const { label, ...rest } = props;

    const translate = useTranslate();

    if (label) {
        throw new Error(
            "<SearchInput> isn't designed to be used with a label prop. Use <TextInput> if you need a label."
        );
    }

    return (
        <StyledTextInput
            hiddenLabel
            label=""
            resettable
            placeholder={translate('ra.action.search')}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon color="disabled" />
                    </InputAdornment>
                ),
            }}
            size="small"
            {...rest}
        />
    );
};

export type MySearchInputProps = CommonInputProps & TextInputProps;

const PREFIX = 'RaSearchInput';

const StyledTextInput = styled(TextInput, {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})({
    marginTop: 0,
});
