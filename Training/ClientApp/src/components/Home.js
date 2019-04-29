import React, { Component } from 'react';
import {userService} from "./services/UserService";
import Main from "../Main";

export class Home extends Component {
  static displayName = Home.name;
  constructor (props) {
    super(props);
    this.service = userService;
  }

  render () {
    return (
      <div>
        {
          <iframe src="/main" scrolling="no"/>
        }
      </div>
    );
  }
}
