import React from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

const Container = styled.div`
  background: url("https://content.uchi.ru/27398/930/32.png") no-repeat;
  background-size: 200%;
  position: absolute;
  margin: 1rem;
  left: 1%;
  width: 20%;
  height: 50%;
  min-height:210px;
  transition: background 0s, transform 2s ease-in-out;
  ${p => p.finish ? `transform: rotateZ(-5deg) translateX(-300%) translateY(-300%);` : ``}
  ${p => (p.isOver? `background-position: 100% 100%;` : `background-position: 0 100%;`)}
  // box-shadow: 0 0 ${p => (p.isOver ? "1.75" : "0.75")}rem 0.1rem rgba(0, 0, 100, 0.5);
  // background-color: ${p => (p.isOver ? "rgba(0, 0, 0, 0.1)" : "")};
  // ${p => p.finish ? (`background: url("https://content.uchi.ru/27398/930/31.png") no-repeat;`) : ``}
  // ${p => p.finish ? (`animation: animated 3s infinite`) : ``}
  // @keyframes animated {
  // from {
  //   background-position: 0px 0px; }

  // to {
  //   background-position: 100% 0px; } 
  // }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NewsContainer = styled.div`
  background: url("https://content.uchi.ru/27398/930/39.png");
  background-position: 46px 0;
  width: 30px;
  height: 39px;
  background-size: cover;
  align-self: center;
  margin: 0.5rem;
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
  @keyframes fade-out {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  flex: 1;
`;

@DropTarget(
  "NEWS_ITEM",
  {
    drop: (props, monitor) => {
      const { id } = monitor.getItem();
      if (props.list.some(news => news.id === id)) {
        alert("already added");
        return;
      }
      props.setNewsToAccumulator(id);
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver()
  })
)
class NewsAccumulator extends React.Component {
  render() {
    const { finish, list, canDrop, isOver, connectDropTarget } = this.props;
    return (
      <Container finish={finish} canDrop={canDrop} isOver={isOver}>
        {connectDropTarget(
          <div style={{ height: "100%" }}>
            <Header>
            </Header>
            <List>
              {list.map(({ id }) => (
                <NewsContainer key={id}>
                  <p>{id}</p>
                </NewsContainer>
              ))}
            </List>
          </div>
        )}
      </Container>
    );
  }
}

export default NewsAccumulator;
