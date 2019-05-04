import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

export class Games extends Component {
  static displayName = Games.name;
  constructor (props) {
    super(props);
    this.state={
      game1: false,
      game2: false,
      game3: false,
      game4: false
    }
    this.show = this.show.bind(this);
  }

  show(value)
  {
    switch (value) {
      case 1:
      this.setState({
        game1: !this.state.game1,
        game2: false,
        game3: false,
        game4: false,
      });
        break;
      case 2:
     this.setState({
        game1: false,
        game2: !this.state.game2,
        game3: false,
        game4: false,
      });
        break;
      default:
        break;
    }
  }
  render () {
    return (
      <div>
        <MDBContainer>
        <MDBListGroup>
          <MDBListGroupItem className={this.state.game1 ? `active` : null} onClick={()=> this.show(1)} hover>Осьминоги</MDBListGroupItem>
          <MDBListGroupItem className={this.state.game2 ? `active` : null} onClick={()=> this.show(2)} hover>Осьминоги - копия</MDBListGroupItem>
          <MDBListGroupItem className={this.state.game3 ? `active` : null} onClick={()=> this.show(3)} disabled>Не доступно</MDBListGroupItem>
          <MDBListGroupItem className={this.state.game4 ? `active` : null} onClick={()=> this.show(4)} disabled>Не доступно</MDBListGroupItem>
        </MDBListGroup>
      </MDBContainer>
        {
          this.state.game1 ? <iframe title="Осьминоги" src="/game1" scrolling="no"/>: null
        }
        {
          this.state.game2 ? <iframe title="Осьминоги - копия" src="/game2" scrolling="no"/>: null
        }
        {
          this.state.game3 ? <iframe title="Не доступно" src="/game3" scrolling="no"/>: null
        }
        {
          this.state.game4 ? <iframe title="Не доступно" src="/game4" scrolling="no"/>: null
        }
      </div>
    );
  }
}
