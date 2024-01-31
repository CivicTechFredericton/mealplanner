import { useApolloClient } from '@apollo/client';
import { List, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSearchByString, MealType } from './service';
import { MealCreate } from './MealCreate';
import { Datagrid } from 'react-admin';

interface CustomSearchInputProps {
  onSearch: (data: any) => void; // Define the type of onSearch prop
}

const CustomSearchInput = ({ onSearch }: CustomSearchInputProps) => {
  const client = useApolloClient();
  const [searchString, setSearchString] = useState('');
  // const [searchStringResult, setSearchStringResult] = useState<MealType[]>([]);

  useEffect(() => {
    getSearchByString(client, searchString).then((result) => {
      const meals = result?.data?.query?.meals?.edges || [];
      type EdgeType = { node: MealType };
      const extractedMeals: MealType[] = meals.map((edge: EdgeType) => edge.node);
      // setSearchStringResult(extractedMeals);
      onSearch(extractedMeals);

    });
  }, [searchString]);

  // useEffect(() => {
  //   console.log(searchStringResult);
  // }, [searchStringResult]);

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
