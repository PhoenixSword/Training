import React from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

const Container = styled.div`
  background: url("https://content.uchi.ru/27398/930/45.png") no-repeat;
  background-size: 200%;
  margin: 0 10%;
  position: absolute;
  left: 33%;
  top: 75%;
  width: 30%;
  min-height: 135px;
  height: 20%;
  z-index: 1;
  transition: background 0s, transform 2s ease-in-out;
  ${p => p.finish ? `transform: translateX(300%);` : ``}
  ${p => (p.isOver? `background-position: 100% 100%;` : `background-position: 0 100%;`)}
  // box-shadow: 0 0 ${p => (p.isOver ? "1.75" : "0.75")}rem 0.1rem rgba(0, 0, 100, 0.5);
  // background-color: ${p => (p.isOver ? "rgba(0, 0, 0, 0.1)" : "")};

  // ::after {
  //       content: "";
  //       background: url(https://content.uchi.ru/27398/930/44.png) no-repeat;
  //       background-size: 100%;
  //       opacity: 0;
  //       transition: opacity 0.5s;
  //       position: absolute;
  //       top: 0;
  //       right: 0;
  //       bottom: 0;
  //       left: 0;

  //   }
    // :hover::after {
    //     opacity: 1;
    //     transition: opacity 0.5s;
    // }
`;

const List = styled.div`
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
`;

const NewsContainer = styled.div`
  background: url("https://content.uchi.ru/27398/930/39.png");
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
