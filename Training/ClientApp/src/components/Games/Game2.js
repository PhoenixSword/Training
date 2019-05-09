import React from "react";
import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import queryString from 'query-string';
import {schoolchildService} from "../services/SchoolchildService";

var position1 = 0;
var position2 = 0;
var position3 = 0;
var correctCards = 0;
var cardsCount = 0;
var leftResult = 0;
var leftValue = 0;
var rightResult = 0;
var rightValue = 0;
var completedLevels = 0;
var levelsCount = 0;

function rand(type) {
  switch (type) {
    case 1:
    switch (leftResult) {
      case 0: return Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9) + "" + leftValue;
      case 1: return Math.round(Math.random() * 9) + "" + leftValue + "" + Math.round(Math.random() * 9);
      case 2: return leftValue + "" + Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9);
      default:
      break;
    }
    break;
    case 2:
    switch (rightResult) {
      case 0: return Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9) + "" + rightValue;
      case 1: return Math.round(Math.random() * 9) + "" + rightValue + "" + Math.round(Math.random() * 9);
      case 2: return rightValue + "" + Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9);
      default:
      break;
    }
    break;
    case 0:
      return Math.round(Math.random() * 999);
    default:
      break;
  }
}

const width = (index) => 130 + (index%4*80) + Math.round(20 + Math.random() *50);
const height = (index) => 300 + (index%6*80) + Math.round(Math.random() *20);

function init(mas) { 
  correctCards = 0;
  position1 = 50;
  position2 = -50;
  position3 = 10;
  cardsCount = 0;
  leftResult = 0;
  leftValue = 0;
  rightResult = 0;
  rightValue = 0;

  cardsCount = mas.cardsCount;
  leftResult = mas.leftResult;
  leftValue = mas.leftValue;
  rightResult = mas.rightResult;
  rightValue = mas.rightValue;
  levelsCount = mas.countLevels;
  completedLevels = mas.currentLevel;

  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: '200px',
    height: '100px'
  } );

  $('#cardPile').html( '' );
  $('#fake').html( '' );
 
  for ( var i=0; i<cardsCount; i++ ) {
    var number = rand((i+1)%3);
    $(`<div style="left: ${height(i)}px;top:${width(i)}px" class="item"><p>${number}</p></div>`).data( 'number', number ).attr( 'id', 'card'+number ).appendTo( '#cardPile' ).draggable( {
      stack: '#cardPile div',
      revert: true,
      containment: "#content", scroll: false
    } );
  }

  for ( i=1; i<=3; i++ ) {
    var text = "";
    switch (i) {
      case 1:
      text = mas.textLeft;
        break;
      case 2:
      text = mas.textRight;
        break;
      default:
        break;
    }
    $(`<div id='cardSlots${i}'><p>${text}</p></div>`).data( 'number', i ).appendTo( `#fake` ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
}

function splitToDigits(number) {
  var digits = [];
  while (number) {
    digits.push(number % 10);
    number = Math.floor(number/10);
  }
  return digits;
}

function correct(element, ui, index)
{
    //element.droppable( 'disable' );
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
    switch (index) {
      case 1:
        ui.draggable.position( { of: element, my: `left+${position1} top`, at: 'left top'});
        ui.draggable.addClass( 'leftItem' );
        position1+=90;
        break;
      case 2:
        ui.draggable.position( { of: element, my: `left+${position2} top`, at: 'left top'});
        ui.draggable.addClass( 'rightItem' );
        position2+=90;
        break;
      case 3:
        ui.draggable.position( { of: element, my: `left+${position3} top`, at: 'left top'});
        ui.draggable.addClass( 'centerItem' );
        position3+=90;
        break;
      default:
        break;
    }
}
function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  var masDigits = splitToDigits(cardNumber);
  switch (slotNumber) {
    case 1:
      if ( masDigits[leftResult] === leftValue ) {
        correct($(this), ui, 1);
      }
      else
      {
        ui.draggable.addClass( 'invalidItem' );
        setTimeout(function(){
          ui.draggable.removeClass( 'invalidItem' );
        }, 500);
      }
      break;
    case 2:
      if ( masDigits[rightResult] === rightValue ) {
        correct($(this), ui, 2);
      }
      else
      {
        ui.draggable.addClass( 'invalidItem' );
        setTimeout(function(){
          ui.draggable.removeClass( 'invalidItem' );
        }, 500);
      }
      break;
    case 3:
      if ( ( masDigits[leftResult] !== leftValue ) && ( masDigits[rightResult] !== rightValue )  ) {
        correct($(this), ui, 3);
      }
      else
      {
        ui.draggable.addClass( 'invalidItem' );
        setTimeout(function(){
          ui.draggable.removeClass( 'invalidItem' );
        }, 500);
      }
      break;
    default:
      break;
  }

  if (correctCards === cardsCount) {
    $('#cardSlots1').addClass('animated');
    $('#cardSlots2').addClass('animated');
    $('#cardSlots3').addClass('animated');
    $('.leftItem').addClass('animated');
    $('.centerItem').addClass('animated');
    $('.rightItem').addClass('animated');
    if (completedLevels === levelsCount) {
      $('#completedGame').show();
      console.log('a');
    }
    else{
      $('#successMessage').show();
      console.log('b');
    }
  }
}
function getText(value)
  {
    switch (value) {
      case 0:
        return "единицы";
      case 1:
        return "десятки";
      case 2:
        return "сотни";
      default:
        break;
    }
  }
class Game2 extends React.Component {
  constructor(props) {
    super(props);
    this.service = schoolchildService;
    let countLevels = +queryString.parse(this.props.location.search).countLevels;
    this.state = {
      score: 0,
      cardsCount: 0,
      leftResult: 0,
      leftValue: 0,
      rightResult: 0,
      rightValue: 0,
      textLeft: "",
      textRight: "",
      countLevels: countLevels,
      currentLevel: 0
    };
    this.generateLevel = this.generateLevel.bind(this);
  }

  componentDidMount()
  {
    this.generateLevel();
  }

  generateLevel(type)
  {
    var countLevels = this.state.countLevels;
    var score;
    type ? score = this.state.cardsCount * 10 : score = 0;
    this.setState({
      score: this.state.score + score,
      cardsCount: Math.round(3 + Math.random() * 7),
      leftResult: Math.round(Math.random() * 2),
      leftValue: Math.round(Math.random() * 9),
      rightResult: Math.round(Math.random() * 2),
      rightValue: Math.round(Math.random() * 9),
      countLevels: countLevels,
      currentLevel: this.state.currentLevel+1
    }, () =>  
    {
      this.setState({textLeft: `У моих осьминожек ${getText(this.state.leftResult)} равны ${this.state.leftValue}`}, () =>  
        {
          this.setState({textRight: `У моих осьминожек ${getText(this.state.rightResult)} равны ${this.state.rightValue}`}, () =>  
            {
              init(this.state)
            });
        });
    });
  }

  render() {
    return (
      <div id="content" style={{background: `url('https://content.uchi.ru/27398/930/28.png') no-repeat center center fixed`}}>
      <div className="progress">
          <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width:`${this.state.currentLevel*100/this.state.countLevels}%`}}>Уровень {this.state.currentLevel}/{this.state.countLevels}</div>
      </div>
        <div className="game1Name text-center text-black">
          <h1 className="title">Помоги папам-осьминогам найти своих детей</h1>
          <h2 className="subtitle">Чужих детей посади на черепаху</h2>
        </div>
          <div id="fake"></div>
          <div id="cardPile"></div>

          <div id="successMessage" style={{display: 'none'}}>
            <h2>Успех!</h2>
            <button onClick={() => this.generateLevel(true)}>Перейти на следующий уровень</button>
          </div>
          <div id="completedGame" style={{display: 'none'}}>
            <h2>Успех!</h2>
            <button>успех</button>
          </div>
      </div>
    );
  }
}
export default Game2;
