import React from "react";
import { DragSource } from "react-dnd";
import styled from "styled-components";
import throttle from './throttle.js';

const Container = styled.div`
  position: absolute;
  background: url("/public/item.png") no-repeat;
  width: 80px;
  height: 94px;
  background-size: cover;
  z-index: 10;
  transition: all background 0s;
  & > p {
    font-weight: bold;
    font-size: 16px;
    border-radius: 10px;
    text-align: center;
    margin: 35px 0 0 20px;
    padding: 1px 0 0 0;
    width: 42px;
    height: 20px;
    background: white;
    color: black;
  }
 
  ${p => p.error ? `background-position: -46px;` : ""};
  ${p => ( p.isDragging ? `display:none;` : "display:flex")};
  ${p => (!p.isDragging ? "top:" + p.width + "px" : null)};
  ${p => (!p.isDragging ? "left:" + p.height + "px" : null)};
`;
function generatePlaceholder(item) {
  console.log(item);
  const placeholder = document.createElement('div');
  placeholder.id = 'drag-placeholder';
  placeholder.style.cssText =
    'display:none;position:fixed;z-index:100000;pointer-events:none;';
  
  placeholder.innerHTML = ReactDOMServer.renderToStaticMarkup(<SubjectContent { ...item } />);
  return placeholder;
}

function createMouseMoveHandler() {
  let currentX = -1;
  let currentY = -1;

  return function(event) {
    let newX = event.clientX - 8;
    let newY = event.clientY - 2;

    if (currentX === newX && currentY === newY) {
      return;
    }

    const dragPlaceholder = document.getElementById('drag-placeholder');
    const transform = 'translate(' + newX + 'px, ' + newY + 'px) rotate(3deg)';

    dragPlaceholder.style.transform = transform;
    dragPlaceholder.style.display = 'block';
  };
}

const mouseMoveHandler = createMouseMoveHandler();

const throttledMoveHandler = throttle(createMouseMoveHandler(), 16);

const subjectSource = {
  beginDrag(props, monitor, component) {
    document.addEventListener('dragover', throttledMoveHandler);
    document.body.insertBefore(
      generatePlaceholder(props),
      document.body.firstChild
    );
    return props;
  },
  endDrag(props, monitor, component) {
    document.removeEventListener('dragover', throttledMoveHandler);
    let child = document.getElementById('drag-placeholder');
    child.parentNode.removeChild(child);

    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    props.moveSubject(item.data.ID, {
      day: dropResult.xPos,
      period: dropResult.yPos,
    });
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}

@DragSource(
  "NEWS_ITEM",
  {
    // все что тут вернем, получим в drop в DropTarget
    beginDrag: props => props
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)

class News extends React.Component {
  componentDidMount() {
    const img = new Image();
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REY0OTM1NzczOTYzMTFFN0E3MDBBMUQ5N0U1QzgxMkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REY0OTM1NzYzOTYzMTFFN0E3MDBBMUQ5N0U1QzgxMkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDpGQkE5MURDNjYzMzlFNzExOTBGM0IxRjlDRDFERkM0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQkE5MURDNjYzMzlFNzExOTBGM0IxRjlDRDFERkM0RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrL7xCIAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAADElEQVR42mJgAAgwAAACAAFPbVnhAAAAAElFTkSuQmCC';
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { error, id, isDragging, connectDragSource, width, height } = this.props;

    return connectDragSource(
      <div style={{ display: "flex" }}>
        <Container error={error} isDragging={isDragging} width={width} height={height} id={id}>
          <p>{id}</p>
        </Container>
      </div>
    );
  }
}
export default DragSource('subjectItem', subjectSource, collect)(News);
