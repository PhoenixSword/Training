import React from "react";
import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import queryString from 'query-string';
import {MDBBtn} from 'mdbreact';
import {schoolchildService} from "../services/SchoolchildService";
import '../../styles/game2.css'

var positionleft1 = 0;
var positionleft2 = 0;
var positiontop1 = 0;
var positiontop2 = 0;
var correctCards = 0;
var cardsCount = 0;
var completedLevels = 0;
var levelsCount = 0;

const width = (index) => 380 + (index%3*70) + Math.round(20 + Math.random() *50);
const height = (index) => 180 + (index%10*80) + Math.round(Math.random() *20);

function init(mas) { 
  correctCards = 0;
  positionleft1 = 15;
  positionleft2 = 15;
  positiontop1 = 15;
  positiontop2 = 15;
  cardsCount = 0;
  cardsCount = mas.cardsCount;
  levelsCount = mas.countLevels;
  completedLevels = mas.currentLevel;

  $('#successMessage').hide();
  $('#cardPile').html( '' );
  $('#fake').html( '' );
  var randItem = Math.round(1 + Math.random() * 7)
  for ( var i=0; i<cardsCount; i++ ) {
    $(`<div style="left: ${height(i)}px;top:${width(i)}px" class="item item${randItem}"></div>`).data( 'number', i ).attr( 'id', 'card' ).appendTo( '#cardPile' ).draggable( {
      stack: '#cardPile div',
      revert: true,
      containment: "#content", scroll: false
    } );
  }

  for ( i=1; i<=3; i++ ) {
    $(`<div id='box${i}'></div>`).data( 'number', i ).appendTo( `#fake` ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
}

function correct(element, ui, index)
{
    correctCards++;
    if (correctCards >= cardsCount/2 && index === 1) {
      element.droppable( 'disable' );
    }
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    ui.draggable.draggable( 'option', 'revert', false );
    
    switch (index) {
      case 1:
        if (positionleft1 > 70) {
          positionleft1 = 15;
          positiontop1 += 55;
        }
        ui.draggable.animate({ top: 155 + positiontop1 + "px" },
        { duration: 1000, easing: 'easeOutBounce' });

        ui.draggable.position( { of: element, my: `left+${positionleft1} top`, at: 'left top'});
        positionleft1 += 55;
        break;
      case 2:
        if (positionleft2 > 70) {
          positionleft2 = 15;
          positiontop2 += 55;
        }
        ui.draggable.animate({ top: 155 + positiontop2 + "px" },
        { duration: 1000, easing: 'easeOutBounce' });

        ui.draggable.position( { of: element, my: `left+${positionleft2} top`, at: 'left top'});
        positionleft2 += 55;
        break;
      default:
        break;
    }
    
}
function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
switch (slotNumber) {
  case 1:
    correct($(this), ui, 1);
    break;
  case 2:
    correct($(this), ui, 2);
    break;
  default:
    break;
}
  

  if (correctCards === cardsCount/2) {
    $('#box1').addClass('full');
    $('#box2').show();
  }

  if (correctCards === cardsCount) {
    setTimeout(()=>
    {
      $('#cardSlots1').addClass('animated');
      $('#cardSlots2').addClass('animated');
      $('#cardSlots3').addClass('animated');
      $('.leftItem').addClass('animated');
      $('.centerItem').addClass('animated');
      $('.rightItem').addClass('animated');
    }, 500);
    
    if (completedLevels === levelsCount) {
      $('#completedGame').show();
    }
    else{
      $('#successMessage').show();
    }
  }
}

class Game2 extends React.Component {
  constructor(props) {
    super(props);
    this.service = schoolchildService;
    var countLevels = +this.props.countLevels;
    console.log(countLevels);
    var eventId = this.props.eventId;
    if (this.props.settings !== undefined) {
      var settings = this.props.settings;
    }
    else{
      var settings = [];
      settings[0] = 
      {
          "cardsCount" : Math.round(4 + Math.random() * 4)*2
      }
    }
    eventId = eventId || 'test';
    this.state = {
      score: 0,
      cardsCount: settings[0].cardsCount,
      countLevels: countLevels,
      eventId: eventId,
      currentLevel: 0,
      redirect: false,
      settings : settings
    };
    this.generateLevel = this.generateLevel.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount()
  {
    this.generateLevel();
  }

  save()
  {
    if (this.state.eventId === 'test') {
      this.setState({redirect: true});
      return false;
    }
    var score = this.state.cardsCount * 10;
    this.setState({score: this.state.score + score});
    this.service.save(this.state.eventId, this.state.score + score).then((resp) => {
      if (resp === true) {
        this.setState({redirect: true});
      }
    });
  }

  generateLevel(type)
  {
    var cardsCount = Math.round(4 + Math.random() * 4)*2;
    var score;
    type ? score = this.state.cardsCount * 7 : score = 0;

    if (this.state.eventId !== "test") {
      cardsCount = this.state.settings[this.state.currentLevel].cardsCount;
    }

    this.setState({
      score: this.state.score + score,
      cardsCount: cardsCount,
      currentLevel: this.state.currentLevel+1
    }, ()=> init(this.state));
  }

  render() {
    if (this.state.redirect) {
       window.top.location.reload();
     }
    if (this.state.countLevels === 0 || this.state.eventId === 0) {
      return (<div></div>);
    }
    else
    return (
      <div id="content" className="game2" style={{background: `url('/games/game2/background.png') no-repeat center center fixed`}}>
      <div className="progress">
          <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width:`${this.state.currentLevel*100/this.state.countLevels}%`}}>Уровень {this.state.currentLevel}/{this.state.countLevels}</div>
      </div>
        <div className="game2Name text-center text-black">
          <h3 className="subtitle">Раздели {this.state.cardsCount} кристаллов по ящикам так, чтобы в каждом ящике было по {this.state.cardsCount/2}</h3>
        </div>
          <div id="fake"></div>
          <div id="cardPile"></div>
          <div id="successMessage" style={{display: 'none'}} className="text-center">
            <h2>Успех!</h2>
              <MDBBtn color="primary" onClick={() => this.generateLevel(true)}>Перейти на следующий уровень</MDBBtn>
            </div>
          <div id="completedGame" style={{display: 'none'}} className="text-center">
            <h2>Задание пройдено!</h2>
              <MDBBtn color="success" onClick={this.save}>Закончить задание</MDBBtn>
          </div>
      </div>
    );
  }
}
export default Game2;
