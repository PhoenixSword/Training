import React from "react";
import { DragSource } from "react-dnd";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  background: url("https://content.uchi.ru/27398/930/39.png");
  width: 30px;
  height: 39px;
  background-size: cover;
  align-self: center;
  padding: 0.5rem;
  z-index: 10;
  & > p {
    font-weight: bold;
    font-size: 13px;
    border-radius: 10px;
    text-align: center;
    margin: 15px 2px 0 2px;
    padding: 1px 0 0 0;
    width: 25px;
    height: 20px;
    background: white;
    color: black;
  }

  ${p => p.error ? `background-position: -46px;` : ""};
  transition: all 0.7s ease-in-out;
  ${p => (`animation: jump_${p.id} 2s infinite`)};

  @keyframes ${p => (`jump_${p.id}`)}
  {
  0%   {top:${p => (p.width + 1)}px;}
  5%  {top:${p => (p.width + 2)}px;}
  10%  {top:${p => (p.width + 3)}px;}
  15%  {top:${p => (p.width + 4)}px;}
  20% {top:${p => (p.width + 5)}px;}
  25%  {top:${p => (p.width + 6)}px;}
  30%  {top:${p => (p.width + 7)}px;}
  35%  {top:${p => (p.width + 8)}px;}
  40% {top:${p => (p.width + 9)}px;}
  45%  {top:${p => (p.width + 8)}px;}
  50%  {top:${p => (p.width + 7)}px;}
  55%  {top:${p => (p.width + 6)}px;}
  60% {top:${p => (p.width + 5)}px;}
  65%  {top:${p => (p.width + 4)}px;}
  70% {top:${p => (p.width + 3)}px;}
  75%  {top:${p => (p.width + 2)}px;}
  80% {top:${p => (p.width + 1)}px;}
  85%  {top:${p => (p.width + 0)}px;}
  90% {top:${p => (p.width -1)}px;}
  95% {top:${p => (p.width + 0)}px;}
  100% {top:${p => (p.width + 0)}px;}
  }
  
  ${p => (p.isDragging ? `display:none;` : "display:flex")};
  ${p => (!p.isDragging ? "top:" + p.width + "px" : null)};
  ${p => (!p.isDragging ? "left:" + p.height + "px" : null)};
`;

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

export default News;