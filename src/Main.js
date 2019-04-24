import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

import NewsAccumulator from "./NewsAccumulator";
import NewsAccumulator2 from "./NewsAccumulator2";
import NewsAccumulator3 from "./NewsAccumulator3";
import NewsList from "./NewsList";

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  transition: all 3.5s ease-in-out;
`;


const Finish = styled.div`
  position: absolute;
  padding: 15% 15%;
  width: 100%;
  height: 100%;
  font-size: 250px;
  color: white;
  transition: all 2s ease-in-out;
  ${p => p.finish ? `opacity: 1` : `opacity: 0`};
`;


function rand(type) {
  switch (type) {
    case 1:
      return 5 + "" + Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9);
      break;
    case 2:
      return Math.round(Math.random() * 9) + "" + 2 + "" + Math.round(Math.random() * 9);
      break;
    case 3:
      return Math.round( 2 + Math.random() * 7) + "" + Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9);
    break;
    default:
      break;
  }
  return Math.round(0 + Math.random() * 300);
}

const initialList = [
  { id: rand(1), added: false },
  { id: rand(1), added: false },
  { id: rand(1), added: false },
  { id: rand(2), added: false },
  { id: rand(2), added: false },
  { id: rand(2), added: false },
  { id: rand(3), added: false },
  { id: rand(3), added: false },
  { id: rand(3), added: false }
];

function splitToDigits(number) {
  var digits = [];
  while (number) {
    digits.push(number % 10);
    number = Math.floor(number/10);
  }
  return digits;
}

class Main extends React.Component {
  state = {
    list: initialList,
    finish: false,
    addedList: [],
    addedList2: [],
    addedList3: []
  };

  handleDropNews = id => {
    if (splitToDigits(id)[2] === 5){
      this.setState(state => ({
        addedList: state.addedList.concat([
          state.list.find(news => news.id === id)
        ]),
        list: state.list.filter(news => news.id !== id)
      }));
      this.checkFinish();
    }
  };
  handleDropNews2 = id => {
    if (splitToDigits(id)[1] === 2) {
      this.setState(state => ({
        addedList2: state.addedList2.concat([
          state.list.find(news => news.id === id)
        ]),
        list: state.list.filter(news => news.id !== id)
      }));
      this.checkFinish();
    }
  };

  handleDropNews3 = id => {
    if ((splitToDigits(id)[1] !== 2) && (splitToDigits(id)[2] !== 5)) {
      this.setState(state => ({
        addedList3: state.addedList3.concat([
          state.list.find(news => news.id === id)
        ]),
        list: state.list.filter(news => news.id !== id)
      }));
      this.checkFinish();
    }
  };


  checkFinish()
  {
    this.state.list.length === 0 ? 
    (
      this.setState(state => ({
        finish: true
      }))
    ) : "";
  }
  render() {
    const { list, addedList, addedList2, addedList3, finish } = this.state;
    
    return (
      
      <Container>
      <Finish finish={finish}>Finish</Finish>
        <NewsAccumulator2
          list={addedList2}
          setNewsToAccumulator={this.handleDropNews2}
          finish={finish}
        />

        <NewsList list={list} />

        <NewsAccumulator
          list={addedList}
          setNewsToAccumulator={this.handleDropNews}
          finish={finish}
        />
        <NewsAccumulator3
          list={addedList3}
          setNewsToAccumulator={this.handleDropNews3}
          finish={finish}
        />
      </Container>
     
    );
  }
}

export default Main;
