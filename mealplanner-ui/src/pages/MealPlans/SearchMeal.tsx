import React, {useState} from 'react';
import {FormControl, InputLabel, OutlinedInput, InputAdornment, Grid} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { graphql } from 'babel-plugin-relay/macro';
import { SearchMeal_data$key } from './__generated__/SearchMeal_data.graphql';
import { useFragment } from 'react-relay';

const fragment = graphql`
fragment SearchMeal_data on Query {
    meals {
        nodes {
            id
            rowId
            nameEn
            tags
        }
    }
}
`
interface Props {
    data: SearchMeal_data$key
}

export const SearchMeal: React.FC<Props> = ({data}) => {
    
    let searchData = useFragment<SearchMeal_data$key>(fragment, data);
    let [searchText, setSearchText] = useState('');

    let search = (searchText:string) => {
        if (searchText === "") {
            return searchData.meals!.nodes
        }
        return searchData.meals!.nodes.filter(m=> m.nameEn.match(new RegExp(searchText, 'i')));
    }
    return (
        <React.Fragment>
            <Grid sx={{m: 1, height: "100vh"}}>
            <h3>Meal Catalog</h3>
            <FormControl variant="outlined" sx={{width:"100%"}}>
                {/* <InputLabel>Search for meals</InputLabel> */}
                <OutlinedInput 
                label={<h4>Meals</h4>} 
                notched= {true} 
                startAdornment={
                    <InputAdornment position="start"> 
                    <SearchIcon />
                    </InputAdornment>
                }
                value={searchText}
                onChange={(e)=>{setSearchText(e.target.value);}}
                />
            </FormControl>
            {search(searchText).map(m => 
                <Grid>
                {m.nameEn} - {m.tags?.join(', ')}
                </Grid>
            )}
            
            </Grid> 
            
        </React.Fragment>
    )
}