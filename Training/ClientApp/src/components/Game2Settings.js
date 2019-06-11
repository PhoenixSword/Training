import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import { MDBBtn, MDBInput } from "mdbreact";
import Notification from "./Notification";
import $ from "jquery";

const Settings = () => 
{
  return {
    cardsCount: 0,
    boxesCount: 2
  }
}

export class Game2Settings extends Component {
  static displayName = Game2Settings.name;
  constructor (props) {
    super(props);
      var settings = this.props.event.settings !== null ? JSON.parse(this.props.event.settings) : [];
    this.state = 
    {
      eventId: this.props.event.id,
      settings : settings
    }
    this.service = userService;
    this.teacherService = teacherService;
    this.add = this.add.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  save(){
    this.teacherService.saveSettings(this.state.eventId, this.state.settings).then(
      (response)=> {
        Notification("Сохранено");
      });
  }

  add(){
    this.setState(prevState => ({
        settings: [...prevState.settings, Settings()]}), () => {})
  }

  remove(id, index){
    this.state.settings.splice(index, 1)
    this.setState(
      prevState => ({
            settings: this.state.settings
          }));
  }

  onChange(e){
    var val = e.target.value;
    if (e.target.localName === "select")
      var index = e.target.parentNode.parentNode.parentNode.id;
    else 
      index = e.target.parentNode.parentNode.parentNode.parentNode.id;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.settings = stateCopy.settings.slice();
    stateCopy.settings[index] = Object.assign({}, stateCopy.settings[index]);
    switch(e.target.name)
    {
      case "cardsCount":
        stateCopy.settings[index].cardsCount = +val;
        break;
      case "boxesCount":
        stateCopy.settings[index].boxesCount = +val;
        break;
      default:
        break;
    }
    this.setState(stateCopy);
  }
  render () {
    return ( 
      <div>
        <table className="table">
              <thead className="blue-gradient white-text">
                <tr>
                  <th className="">Уровень</th>
                  <th className="">Количество сов</th>
                  <th className="">Количество деревьев</th>
                  <th className="">Удалить</th>
                </tr>
              </thead>
              <tbody>
              {
              this.state.settings.map((item, index) =>
                <tr key={index} id={index}>
                  <td>
                    <div className="md-form text-center">
                      <MDBInput readOnly type="number" name="levelNumber" value={(index+1).toString()} disabled/>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <MDBInput type="number" name="cardsCount" value={item.cardsCount.toString()} onChange={this.onChange} min="1" max="11"/>
                    </div>
                  </td>
                  <td>
                    <div className="md-form text-center">
                      <select name="boxesCount" className="browser-default custom-select" value={item.boxesCount} onChange={this.onChange}>
                         <option value="2">2 дерева</option>
                         <option value="3">3 дерева</option>
                         <option value="4">4 дерева</option>
                         <option value="5">5 деревьев</option>
                      </select>
                    </div>
                  </td>
                  <td><MDBBtn style={{padding: "5px 20px"}} onClick={() => this.remove(item.id, index)} color="danger">Удалить</MDBBtn></td>
                </tr>
                )
              }
              </tbody>
            </table>
              <MDBBtn color="primary" onClick={this.add}>Добавить уровень</MDBBtn>
              <MDBBtn color="success" onClick={this.save}>Сохранить</MDBBtn>
        </div>
    );
  }
}
