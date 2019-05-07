import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import $ from "jquery";
import {ListGames} from "./ListGames.js";

$(document).mouseup(function (e){
  var div = $(".previewGame"); 
  if (!div.is(e.target) && div.has(e.target).length === 0 && e.which === 1) { 
    div.hide(); 
    $('#overlay').hide(); 
  }
});

export class Games extends Component {
  static displayName = Games.name;
  constructor (props) {
    super(props);
    this.state={
        listGames: ListGames(),
        previewUrl: null
    }
    this.show = this.show.bind(this);
  }

  show(value)
  {
    console.log(this.state.previewUrl);
    this.setState({
      previewUrl: value
    });
    $(".previewGame").show();
    $('#overlay').show();
  }

  render () {
    return (
      <div>
        <MDBContainer>
        <MDBListGroup>
          {this.state.listGames.map((item, index) =>
            <MDBListGroupItem style={{width: '250px'}} className="text-center" key={index} onClick={() => this.show(item.url)}
                     hover disabled={item.url === null}>{item.name}<img src={`/games/${item.url}/preview.png`}/>
            </MDBListGroupItem>
          )}
        </MDBListGroup>
      </MDBContainer>
        {this.state.previewUrl ? <div className="previewGame"><iframe src={`/${this.state.previewUrl}`} scrolling="no"/></div> : null}
      </div>

    );
  }
}
