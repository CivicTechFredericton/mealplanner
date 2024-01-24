import { useApolloClient } from '@apollo/client';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const CustomSearchInput = () => {
  const client = useApolloClient();
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
     console.log(searchString);

    // return () => {
    //  console.log(searchString);
    // }
  }, [searchString])
  

  return (
    <>
      <TextField
        id='custom-search-input'
        label='Search'
        placeholder='Search...'
        variant='filled'
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
    </>
  );
};

export default CustomSearchInput;
