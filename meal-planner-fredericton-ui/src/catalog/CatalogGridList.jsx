import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { QueryRenderer} from 'react-relay';
import environment from '../relay-environment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    //width: 1200,
    //height: 400,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const CatalogGridList = (props) => {
  const classes = useStyles();
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
            query CatalogGridListQuery {
              meals {
                nodes {
                  id
                  nameEn
                  photoUrl
                }
              }
            }
      `}
      render={renderQuery}
      variables={{}}
    />
  );
}

const renderQuery = ({error, props}) => {
  console.log(props);
  
  if (error || props === undefined) {
    return (
      <h2>Error: Catalog Not Found</h2>
    );
  } else if (props) return (
    <div>
      <Box ml={5} mr={5}>
        <GridList cellHeight={180} cols={5}>
          {props.meals.nodes.map((tile) => (
            <GridListTile key={tile.photoUrl}>
              <img src={tile.photoUrl} alt={tile.nameEn} />
              <GridListTileBar
                title={tile.nameEn}
                actionIcon={
                  <div>
                    <IconButton aria-label={`info about ${tile.nameEn}`} type="button">
                      <Link to={/meal/ + tile.id}>
                        <InfoIcon style ={{color: 'rgba(255, 255, 255, 0.54)'}}/>
                      </Link>
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    </div>
  )
  return <div>Loading</div>;
}

export default CatalogGridList;