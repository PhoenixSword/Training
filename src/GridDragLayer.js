import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import News from './News';

function collect(monitor) {
  return {
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

function getItemTransform(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x+props.item.height}px, ${y}px)`;
  return {  
    position: 'fixed', 
    display: 'block',
    zIndex: 1,
    transform: transform,
    cursor: 'move',
  };
}

class GridDragLayer extends Component {
  constructor(props) {
    super(props);
  }

render() {
    const { width, height, item, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div
        id="drag-placeholder"
        style={getItemTransform(this.props)}
      >
        <News
          id={item.id}
          isDragging={isDragging}
          width={width}
          height={height} 
        />
      </div>
    );
  }
}

export default DragLayer(collect)(GridDragLayer);