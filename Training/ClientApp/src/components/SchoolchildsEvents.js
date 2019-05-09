import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import {schoolchildService} from "./services/SchoolchildService";
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
        countLevels: 1
    }
    this.service = schoolchildService;
    this.show = this.show.bind(this);
    this.service.getEvents().then((resp)=> 
      this.setState({
         Events: resp
    }));
  }

  show(url, count)
  {
    this.setState({
      previewUrl: url,
      countLevels: count
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
            <MDBListGroupItem style={{width: '250px'}} className="text-center" key={index} onClick={() => this.show(item.url, item.countLevels)}
            hover disabled={item.url === null}>{item.name} <p>Уровней: {item.countLevels}</p><img src={`/games/${item.url}/preview.png`} alt={item.name}/>
            </MDBListGroupItem>
          )}
        </MDBListGroup>
      </MDBContainer>
        {this.state.previewUrl ? <div className="previewGame"><iframe title="Задание" src={`/${this.state.previewUrl}?countLevels=${this.state.countLevels}`} scrolling="no"/></div> : null}
      </div>

    );
  }
}
