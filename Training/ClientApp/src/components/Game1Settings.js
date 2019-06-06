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
    leftResult: 0,
    leftValue: 0,
    rightResult: 0,
    rightValue: 0
  }
}

export class Game1Settings extends Component {
  static displayName = Game1Settings.name;
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
        $(".settingsBlock").hide(); 
        $('#overlay2').hide(); 
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
      case "leftResult":
        stateCopy.settings[index].leftResult = +val;
        break;
      case "leftValue":
        stateCopy.settings[index].leftValue = +val;
        break;
      case "rightResult":
        stateCopy.settings[index].rightResult = +val;
        break;
      case "rightValue":
        stateCopy.settings[index].rightValue = +val;
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
                  <th className="">Количество осьминогов</th>
                  <th className="">Левый осьминог</th>
                  <th className="">Значение левого осьминога</th>
                  <th className="">Правый осьминог</th>
                  <th className="">Значение правого осьминога</th>
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
                    <div className="md-form">
                      <select name="leftResult" className="browser-default custom-select" value={item.leftResult.toString()} onChange={this.onChange}>
                           <option value="0">Сотни</option>
                           <option value="1">Десятки</option>
                           <option value="2">Единицы</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <MDBInput type="number" name="leftValue" value={item.leftValue.toString()} onChange={this.onChange} min="1" max="9"/>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <select name="rightResult" className="browser-default custom-select" value={item.rightResult.toString()} onChange={this.onChange}>
                           <option value="0">Сотни</option>
                           <option value="1">Десятки</option>
                           <option value="2">Единицы</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <MDBInput type="number" name="rightValue" value={item.rightValue.toString()} onChange={this.onChange} min="1" max="9"/>
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
