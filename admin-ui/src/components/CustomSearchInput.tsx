import { useApolloClient } from '@apollo/client';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSearchByString } from '../Products/service';

interface CustomSearchInputProps {
  onSearch: (data: any) => void;
}

const CustomSearchInput = ({ onSearch }: CustomSearchInputProps) => {
  const client = useApolloClient();
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    getSearchByString(client, searchString)
      .then((idsArray) => {
        onSearch(idsArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchString]);

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
