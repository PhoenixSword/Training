import React from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

const Container = styled.div`
  background: url("https://content.uchi.ru/27398/930/29.png") no-repeat;
  position: absolute;
  margin: 1rem;
  top: 40%;
  right: -3%;
  width: 347px;
  height: 379px;
  transition: background 0s, transform 3s ease-in-out;
  z-index: 1;
  ${p => p.isOver ? `background-position: -347px;` : ``}
  ${p => p.finish ? `transform: translateY(-300%) translateX(300%) rotate(80deg);` : ``}
  ${p => p.finish ? (`background: url('https://content.uchi.ru/27398/930/31.png') no-repeat;`) : ``}
  ${p => p.finish ? (`animation: animatedright 0.6s steps(19) infinite;`) : ``}
  ${p => p.finish ? (`background-size: auto;`) : ``}
  @keyframes animatedright {
  100% { background-position: -6593px; }
}
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NewsContainer = styled.div`
  background: url("/public/selecteditem.png");
  width: 70px;
  height: 88px;
  background-position: 173px 0;
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
          <div style={{ height: "100%", paddingTop: "0", paddingLeft: "0" }}>
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
