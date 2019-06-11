import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import { MDBBtn, ToastContainer } from "mdbreact";
import Notification from "./Notification";
import {ListGames} from "./ListGames.js";
import {Game1Settings} from "./Game1Settings";
import {Game2Settings} from "./Game2Settings";
import {Game3Settings} from "./Game3Settings";
import $ from "jquery";

const Event = () => 
{
  return {id: "00000000-0000-0000-0000-000000000000", name: 'Осьминоги', url: 'Game1', countLevels: 1}
}

$(document).mousedown(function (e){
  var div = $(".settingsBlock"); 
  if (!div.is(e.target) && div.has(e.target).length === 0 && e.which === 1) { 
    div.hide(); 
    $('#overlay2').hide(); 
  }
});

export class TeachersEvents extends Component {
  static displayName = TeachersEvents.name;
  constructor (props) {
    super(props);
    this.state = 
    {
      Events: [],
      listGames: [],
      test: null,
      settingsBlocks: [],
      currentSettings: null
    }
    this.service = userService;
    this.teacherService = teacherService;
    this.teacherService.getEvents().then(response => 
    this.setState(state => ({
      Events: response,
      listGames: ListGames()
    }),() => {
      this.getSettings();
    }));
    this.add = this.add.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.getSettings = this.getSettings.bind(this);
  }

  save(){
    this.teacherService.addEvents(this.state.Events).then(
      (response)=> {
        Notification("Сохранено"); 
        this.setState(state => ({
          Events: response
        }),()=>{ this.getSettings() });
       });
  }

  getSettings()
  {
    var settingsArray = []
      for (var i = 0; i < this.state.Events.length; ++i) {
      switch (this.state.Events[i].url) {
        case "Game1":
          settingsArray[i] = <Game1Settings event={this.state.Events[i]}/>;
          break;
        case "Game2":
          settingsArray[i] = <Game2Settings event={this.state.Events[i]}/>;
          break;
        case "Game3":
          settingsArray[i] = <Game3Settings event={this.state.Events[i]}/>;
          break;
        default:
          settingsArray[i] = <Game1Settings event={this.state.Events[i]}/>;
          break;
      }
      this.setState({
        settingsBlocks: settingsArray
      })
    }
  }

  add(){
    this.setState(prevState => ({
        Events: [...prevState.Events, Event()]}), () => {
          this.save();
    })

  }

  remove(id, index){
    this.state.Events.splice(index, 1)
    this.setState(
      prevState => ({
            Events: this.state.Events
          }));
    if (id !== '00000000-0000-0000-0000-000000000000') {
      this.teacherService.removeEvents(id);
    }
  }

  onChange(e){
    var val = e.target.value;
    var index = e.target.parentNode.parentNode.parentNode.id;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.Events = stateCopy.Events.slice();
    stateCopy.Events[index] = Object.assign({}, stateCopy.Events[index]);
    var text = e.target.selectedOptions[0].innerText;
    stateCopy.Events[index].url = val;
    stateCopy.Events[index].name = text;
    this.setState(stateCopy, () => {
          this.save();
    });
  }

  showSettings(index)
  {
    this.setState({currentSettings: null}, () => {this.setState({currentSettings: this.state.settingsBlocks[index]});});
    $(".settingsBlock").show();
    $('#overlay2').show();
  }

  render () {
    return (
      <div>
      <ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={3000} />
      <div className="card">
      <h3 className="blue-gradient white-text card-header text-center font-weight-bold text-uppercase py-4 mb-0">Ваши задания</h3>
        <table className="table">
              <thead className="blue-gradient white-text">
                <tr>
                  <th className="">Название игры</th>
                  <th className="">Настройка задания</th>
                  <th className="">Ученики выполнившие задание</th>
                  <th className="">Удалить</th>
                </tr>
              </thead>
              <tbody>
              {
              this.state.Events.map((item, index) =>
                <tr key={index} id={index}>
                <td hidden><input name="id" value={item.id} readOnly hidden/></td>
                  <td>
                    <div className="md-form">
                      <select name="url" className="browser-default custom-select" value={item.url} onChange={this.onChange}>
                      {this.state.listGames.map((item2, index) =>
                         <option key={index} value={item2.url} disabled={item2.url === null}>{item2.name}</option>
                        )}
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <MDBBtn color="info" onClick={() => this.showSettings(index)}>Настроить задание</MDBBtn>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                    {item.completedCount !== 0 && item.completedCount !== undefined ? <span className={item.completedCount === item.count ? "text-green" : "text-danger"}>Количество учеников: {item.completedCount || 0}/{item.count || 0} </span> : <span>Задание никто не выполнил</span>}
                    </div>
                  </td>
                  <td><div className="md-form"><MDBBtn style={{padding: "5px 20px"}} onClick={() => this.remove(item.id, index)} color="danger">Удалить</MDBBtn></div></td>
                </tr>
                )
              }
              </tbody>
            </table>
              <MDBBtn color="primary" onClick={this.add}>Добавить</MDBBtn>
              <MDBBtn color="success" onClick={this.save}>Сохранить</MDBBtn>
            </div>
            <div className="settingsBlock">{this.state.currentSettings}</div>
      </div>
    );
  }
}
