import { TextField } from '@mui/material';
import {
  Loading,
  useDataProvider,
  useGetMany,
  useList,
  useListContext,
  useRecordContext,
} from 'react-admin';
import { MealType } from './service';
import { useEffect, useState } from 'react';

interface SearchResultsProps {
  searchData: MealType[];
  onGetIds: (ids: string[]) => void; // Define the type for onGetIds
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchData, onGetIds }) => {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const idsArray = searchData.map((search) => search.rowId);
    setIds(idsArray);
    onGetIds(idsArray);
    console.log(idsArray);
  }, [searchData]);

  // const record = useRecordContext();
  const { data, isLoading, error } = useGetMany('meals', { ids: ids });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  return (
  <>
  </>
  );
};

export default SearchResults;
