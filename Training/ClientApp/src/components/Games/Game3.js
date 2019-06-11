import React from "react";
import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import {MDBBtn} from 'mdbreact';
import {schoolchildService} from "../services/SchoolchildService";
import '../../styles/game3.css'

var completedLevels = 0;
var levelsCount = 0;
var type = true;
function rand() {
     return Math.round(0 + Math.random() * 999);
}

function sort( a, b ) {
    if ( +a < +b) {
        return -1;
    }
    if ( +a > +b) {
        return 1; 
    }
    return 0;   
}

function reverse( a, b ) {
    if ( +a < +b) {
        return 1;
    }
    if ( +a > +b) {
        return -1; 
    }
    return 0;   
}
function init(mas) { 
  levelsCount = mas.countLevels;
  completedLevels = mas.currentLevel;
  type = mas.type;
  $( "#sortable" ).sortable({
      items: "> li",
      revert: true,
      axis: "x",
      update: function( event, ui ) {
        var mas = $( "#sortable" ).sortable( "toArray" ); 
        var masSortable = mas.slice().sort((a, b) => sort(a, b))
        if(!type) masSortable = masSortable.reverse();
        if(mas.toString() === masSortable.toString()){
          if (completedLevels === levelsCount) {
            $('#completedGame').show();
          }
          else{
            $('#successMessage').show();
          }
        }
    }
  });
  $('#sortable').html('');
  $('#sortable').disableSelection();
  $('#successMessage').hide();
  for ( var i=0; i<5; i++ ) {
    var value = rand();
    $(`<li class="ui-state-default item item${i+1}"><p>${value}</p></li>`).data( 'number', value ).attr( 'id', value ).appendTo( '#sortable' );
  }
}

class Game3 extends React.Component {
  constructor(props) {
    super(props);
    this.service = schoolchildService;
    var countLevels = +this.props.countLevels;
    var eventId = this.props.eventId;
    countLevels = countLevels || Math.round(1 + Math.random() * 2);
    eventId = eventId || 'test';
    if (this.props.settings !== undefined) {
      var settings = this.props.settings;
    }
    else{
      settings = [];
      for (var i = countLevels - 1; i >= 0; i--) {
        if (Math.round(Math.random() * 1) > 0) {
          var type = true;
        }
        else{
          type = false;
        }
        settings.push({"type" : type});
      }
    }
    this.state = {
      score: 0,
      type: settings[0].type,
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
    var score = Math.round(1 + Math.random() * 9) + 5;
    this.setState({score: this.state.score + score});
    this.service.save(this.state.eventId, this.state.score + score).then((resp) => {
      if (resp === true) {
        this.setState({redirect: true});
      }
    });
  }

  generateLevel(newlevel)
  {
    var score;
    newlevel ? score = Math.round(1 + Math.random() * 9) + 5 : score = 0;
    type = this.state.settings[this.state.currentLevel].type;
    this.setState({
      score: this.state.score + score,
      type: type,
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
      <div id="content" className="game3" style={{background: `url('/games/game3/background.png') no-repeat center center fixed`}}>
      <div className="progress">
          <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width:`${this.state.currentLevel*100/this.state.countLevels}%`}}>Уровень {this.state.currentLevel}/{this.state.countLevels}</div>
      </div>
        <div className="game3Name text-center text-black">
          <h1 className="title">Расположи рыбок по {this.state.type ? "возрастанию" : "убыванию"}</h1>
        </div>
          <ul id="sortable">
          </ul>
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
export default Game3;
