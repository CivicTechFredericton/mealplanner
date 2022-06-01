import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const Types = {
  CARD: 'card'
};

const cardSource = {
  beginDrag(props) {
    return props.meal;
  },

  endDrag(props, monitor, component) {
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const useStyles = makeStyles(() => ({
  container: {
    padding: '8px',
    borderBottom: '1px solid #eeee',
    display: 'grid',
    gridTemplateColumns: '50px auto',

  },
  name: {
    position: 'relative',
    top: '10px',
  }
}));


export function MealOption(props) {
  const { isDragging, connectDragSource } = props;
  const styles = useStyles(props);

  return connectDragSource(
    <div className={`mealoption ${styles.container}`}>
      <Avatar
        alt={`${props.meal.nameEn}, photo of`} 
        src={props.meal.photoUrl} 
        className={styles.avatar}
      />
      <Typography className={styles.name}>{props.meal.nameEn}</Typography>
    </div>
  );
}

MealOption.propTypes = {
  meal: PropTypes.object,
};

export default DragSource(Types.CARD, cardSource, collect)(MealOption);