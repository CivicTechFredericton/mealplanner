import { useApolloClient } from '@apollo/client';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSearchByString, MealType } from '../Meals/service';

interface CustomSearchInputProps {
  onSearch: (data: any) => void;  
}

const CustomSearchInput = ({ onSearch }: CustomSearchInputProps) => {
  const client = useApolloClient();
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    getSearchByString(client, searchString).then((result) => {
      const meals = result?.data?.query?.meals?.edges || [];
      type EdgeType = { node: MealType };
      const extractedMeals: MealType[] = meals.map((edge: EdgeType) => edge.node);
      const idsArray = extractedMeals.map((id) => id.rowId);
      onSearch(idsArray);
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
