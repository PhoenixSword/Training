import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBIcon } from "mdbreact";
import {schoolchildService} from "./services/SchoolchildService";
import Game1 from "./Games/Game1";
import GameBlock from "./Games/GameBlock";
import $ from "jquery";

$(document).mouseup(function (e){
  var div = $(".previewGame"); 
  if (!div.is(e.target) && div.has(e.target).length === 0 && e.which === 1) { 
    div.hide(); 
    $('#overlay').hide(); 
  }
});

export class SchoolchildsEvents extends Component {
  static displayName = SchoolchildsEvents.name;
  constructor (props) {
    super(props);
    this.state={
        Events: [],
        previewUrl: null,
        countLevels: 0,
        eventId: 0,
        settings: []
    }
    this.service = schoolchildService;
    this.show = this.show.bind(this);
    this.service.getEvents().then((resp)=> 
      this.setState({
         Events: resp
    }));
  }

  show(url, count, eventId, settings)
  {
    console.log(settings);
    this.setState({
      previewUrl: url,
      countLevels: count,
      eventId: eventId,
      settings: JSON.parse(settings)
    });
    $(".previewGame").show();
    $('#overlay').show();
  }

  render () {
    return (
      <div>
        <MDBContainer>
        <MDBListGroup>
          {this.state.Events.map((item, index) =>
            <MDBListGroupItem style={{width: '250px'}} className="text-center" key={index} onClick={() => this.show(item.url, item.countLevels, item.id, item.settings)}
            hover disabled={item.completed}>{item.name} <p>Количество уровней: {item.countLevels}</p><img className={item.completed ? 'completedEvent' : null} src={`/games/${item.url}/preview.png`} alt={item.name}/>
            {item.completed ? <img width="200" height="127 "src="/completedEvent.png" alt="Завершено" style={{position: 'absolute', right: '24px'}}/> : null}
            {item.completed ? <p style={{color: 'green'}}> <MDBIcon icon="check" /> Получено очков: {item.score}</p> : <p style={{color: 'red'}}> <MDBIcon icon="times" /> Не завершено</p> }
            </MDBListGroupItem>
          )}
        </MDBListGroup>
      </MDBContainer>
      {this.state.previewUrl ? <div className="previewGame"><GameBlock val={this.state.previewUrl} countLevels={this.state.countLevels} eventId={this.state.eventId} settings={this.state.settings} /></div> : null}
      </div>

    );
  }
}
