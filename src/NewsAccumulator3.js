import React from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

const Container = styled.div`
  background: url("https://content.uchi.ru/27398/930/45.png") no-repeat;
  margin: 0 10%;
  position: absolute;
  left: 25%;
  bottom: 0%;
  width: 380px;
  height: 185px;
  transition: background 0s, transform 3s ease-in-out;

  ${p => p.isOver ? `background-position: -380px;` : ``}
  ${p => p.finish ? `transform: translateY(-100%) translateX(300%) rotate(-40deg);` : ``}
  ${p => p.finish ? (`background: url('https://content.uchi.ru/27398/930/44.png') no-repeat;`) : ``}
  ${p => p.finish ? (`animation: animatedcenter 0.6s steps(14) infinite;`) : ``}
  ${p => p.finish ? (`background-size: auto;`) : ``}
  @keyframes animatedcenter {
  100% { background-position: 0 -2828px; }
}

`;

const List = styled.div`
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
`;

const NewsContainer = styled.div`
  
  background: url("/public/selecteditem.png");
  width: 70px;
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
          <div style={{ height: "100%", paddingTop: "10px", paddingLeft: "30px" }}>
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
