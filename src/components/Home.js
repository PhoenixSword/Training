import React, { Component } from 'react';
import Board from './Board'

export class Home extends Component {
  static displayName = Home.name;

  render () {

    return (
      <div>
        <Board knightPosition={[0, 0]} />
      </div>
    );
  }
}
