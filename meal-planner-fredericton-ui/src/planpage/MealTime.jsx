import React from 'react'
import { PropTypes } from 'prop-types'
import { DropTarget } from 'react-dnd'

const dropTargetHandlers = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    props.onMealDropped(item)
    return item
  }
}

/**
 * Component a selected meal can be dropped onto
 */
export function MealTime(props) {
  const { hovered, connectDropTarget } = props
  const fontWeight = hovered ? 500 : 'normal'
  const background = hovered ? 'rgb(225, 228, 250)' : 'transparent'
  return connectDropTarget(
    <div style={{
      background,
      fontWeight,
      color: 'black',
      borderLeft: 'none',
      borderBottom: 'none',
      minHeight: '80px',
      width: '100%',
    }}>
      {props.children}
    </div>
  )
}
MealTime.propTypes = {
  onMealDropped: PropTypes.func,
}

function collect(connect, monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver(),
    connectDropTarget: connect.dropTarget()
  }
}

export default DropTarget(
  'card',
  dropTargetHandlers,
  collect
)(MealTime)