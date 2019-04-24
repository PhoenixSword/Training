import React from "react";
import { DragSource } from "react-dnd";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  background: url("/public/item.png");
  width: 71px;
  height: 88px;
  background-size: cover;
  align-self: center;
  padding: 0.5rem;

  & > p {
    font-weight: bold;
    font-size: 16px;
    border-radius: 10px;
    text-align: center;
    margin: 30px 0 0 14px;
    padding: 1px 0 0 0;
    width: 42px;
    height: 20px;
    background: white;
    color: black;
  }
  background-position: -92px;
  animation: animateditem 0.6s steps(11) infinite;
   @keyframes animateditem {
  100% { background-position: 880px; }
}

  ${p => ( p.isDragging ? `display:none;` : "display:flex")};
  ${p => (!p.isDragging ? "top:" + p.width + "px" : null)};
  ${p => (!p.isDragging ? "left:" + p.height + "%" : null)};

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