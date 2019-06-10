import React from "react";
import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import {MDBBtn} from 'mdbreact';
import {schoolchildService} from "../services/SchoolchildService";
import '../../styles/game2.css'

var correctCards = 0;
var cardsCount = 0;
var completedLevels = 0;
var levelsCount = 0;
var boxesCount = 0;

const width = (index) => 500 + (index%3*40) + Math.round(20 + Math.random() *50);
const height = (index) => 10 + (index%10*100) + Math.round(Math.random() *20);
const boxesPlace = () =>
{
  switch (boxesCount) {
    case 2:
      return [15, 55];
    case 3:
      return [5, 35, 65];
    case 4:
      return [0, 25, 50, 75];
    case 5:
      return [-2, 18, 38, 58, 78];
    default:
      return [0, 0, 0, 0, 0];
  }
}

function init(mas) { 
  correctCards = 0;
  cardsCount = 0;
  boxesCount = mas.boxesCount;
  cardsCount = mas.cardsCount;
  levelsCount = mas.countLevels;
  completedLevels = mas.currentLevel;
  var places = boxesPlace;

  $('#successMessage').hide();
  $('#cardPile').html( '' );
  $('#fake').html( '' );
  for ( var i=0; i<cardsCount; i++ ) {
    $(`<div style="left: ${height(i)}px;top:${width(i)}px" class="item item${ Math.round(1 + Math.random() * 11)}"></div>`).data( 'number', i ).attr( 'id', 'card' ).appendTo( '#cardPile' ).draggable( {
      stack: '#cardPile div',
      revert: true,
      containment: "#content", scroll: false
    } );
  }

  for ( i=1; i<=boxesCount; i++ ) {
    $(`<div id='box' class='box${i}' style="left: ${places()[i-1]}%;"></div>`).data( 'number', i ).data( 'count', 0 ).appendTo( `#fake` ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
}

function correct(element, ui)
{
  correctCards++;
  element.data( 'count', +element.data( 'count' ) + 1);
  if(element.data('count') >= (+cardsCount / +boxesCount))
  {
    element.droppable( 'disable' );
  }
  ui.draggable.addClass( 'correct' );
  ui.draggable.draggable( 'disable' );
  ui.draggable.draggable( 'option', 'revert', false );
}

// function checkFinish() {
// if (completedLevels === levelsCount) {
//     $('#completedGame').show();
//   }
//   else{
//     $('#successMessage').show();
//   }
// }

function handleCardDrop( event, ui ) {
  //var slotNumber = $(this).data( 'number' );
  correct($(this), ui);
  if (correctCards === cardsCount) {
    //$('#finishButton').show();
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
    var eventId = this.props.eventId;
    if (this.props.settings !== undefined) {
      var settings = this.props.settings;
    }
    else{
      var boxesCount = Math.round(2 + Math.random() * 3);
      var cardsCount = boxesCount * Math.round(2 + Math.random() * 3);
      settings = [{"cardsCount" : cardsCount, "boxesCount" : boxesCount}];
    }
    countLevels = countLevels || Math.round(1 + Math.random() * 2);
    eventId = eventId || 'test';
    this.state = {
      score: 0,
      cardsCount: settings[0].cardsCount,
      boxesCount: settings[0].boxesCount,
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
    var score = this.state.cardsCount * 7;
    this.setState({score: this.state.score + score});
    this.service.save(this.state.eventId, this.state.score + score).then((resp) => {
      if (resp === true) {
        this.setState({redirect: true});
      }
    });
  }

  generateLevel(type)
  {
    var boxesCount = Math.round(2 + Math.random() * 3);
    var cardsCount = boxesCount * Math.round(2 + Math.random() * 3);
    var score;
    type ? score = this.state.cardsCount * 7 + this.state.boxesCount * 5 : score = 0;

    if (this.state.eventId !== "test") {
      cardsCount = this.state.settings[this.state.currentLevel].cardsCount;
      boxesCount = this.state.settings[this.state.currentLevel].boxesCount;
    }

    this.setState({
      score: this.state.score + score,
      cardsCount: cardsCount,
      boxesCount: boxesCount,
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
          <h3 className="subtitle">Посади {this.state.cardsCount} сов на деревья так, чтобы на каждом дереве было по {Math.round(this.state.cardsCount/this.state.boxesCount)}</h3>
        </div>
          <div id="fake"></div>
          <div id="cardPile"></div>
          <div id="successMessage" style={{display: 'none'}} className="text-center">
            <h2>Успех!</h2>
              <MDBBtn color="primary" onClick={() => this.generateLevel(true)}>Перейти на следующий уровень</MDBBtn>
            </div>
             
          {
            //<div id="finishButton" style={{display: 'none'}} className="text-center">
            //<MDBBtn color="primary" onClick={() => checkFinish()}>ОК</MDBBtn>
            //</div>
          }

          <div id="completedGame" style={{display: 'none'}} className="text-center">
            <h2>Задание пройдено!</h2>
              <MDBBtn color="success" onClick={this.save}>Закончить задание</MDBBtn>
          </div>
      </div>
    );
  }
}
export default Game2;
