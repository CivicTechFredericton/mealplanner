import { TextField } from '@mui/material';
import { useList, useListContext } from 'react-admin';

const SearchResults = () => {
  // const listContext = useList(searchData);
  return (
    <TextField
      id=''
      placeholder=''
      label='Search Results'
      variant='filled'
      helperText='Search Results'
    />
  );
};

export default SearchResults;
