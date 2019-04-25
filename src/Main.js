import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

import NewsAccumulator from "./NewsAccumulator";
import NewsAccumulator2 from "./NewsAccumulator2";
import NewsAccumulator3 from "./NewsAccumulator3";
import NewsList from "./NewsList";
import GridDragLayer from "./GridDragLayer";

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

function width(index)
{
   return 100 + (index%5*80) + Math.round(20 + Math.random() *50);
}

function height(index)
{
    return 300 + (index%7*80) + Math.round(Math.random() *20);
}

const initialList = [
  { id: rand(1), added: false, width: width(1), height: height(1) },
  { id: rand(1), added: false, width: width(2), height: height(2) },
  { id: rand(1), added: false, width: width(3), height: height(3) },
  { id: rand(2), added: false, width: width(4), height: height(4) },
  { id: rand(2), added: false, width: width(5), height: height(5) },
  { id: rand(2), added: false, width: width(6), height: height(6) },
  { id: rand(3), added: false, width: width(7), height: height(7) },
  { id: rand(3), added: false, width: width(8), height: height(8) },
  { id: rand(3), added: false, width: width(9), height: height(9) }
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
    addedList3: [],
    error: ""
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
    else
    {
      this.setState(state => ({
        error: id
      }));
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
    else
    {
      this.setState(state => ({
        error: id
      }));
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
    else
    {
      this.setState(state => ({
        error: id
      }));
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
    const { error, list, addedList, addedList2, addedList3, finish } = this.state;
    
    return (
      
      <Container>

      <GridDragLayer />

      <Finish finish={finish}>Finish</Finish>
        <NewsAccumulator2
          list={addedList2}
          setNewsToAccumulator={this.handleDropNews2}
          finish={finish}
        />

        <NewsList list={list} error={error}/>

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
