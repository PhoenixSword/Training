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
  render() {
    const { id, isDragging, connectDragSource, width, height } = this.props;

    return connectDragSource(
      <div style={{ display: "flex" }}>
        <Container isDragging={isDragging} width={width} height={height} id={id}>
          <p>{id}</p>
        </Container>
      </div>
    );
  }
}

export default News;