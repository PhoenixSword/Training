import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import { MDBBtn, MDBInput, ToastContainer } from "mdbreact";
import Notification from "./Notification";
import {ListGames} from "./ListGames.js";
import {Game1Settings} from "./Game1Settings";

const Event = () => 
{
  return {id: "00000000-0000-0000-0000-000000000000", name: '', url: '', countLevels: 0}
}

export class TeachersEvents extends Component {
  static displayName = TeachersEvents.name;
  constructor (props) {
    super(props);
    this.state = 
    {
      Events: [],
      listGames: []
    }
    this.service = userService;
    this.teacherService = teacherService;
    this.teacherService.getEvents().then(response => 
    this.setState(state => ({
      Events: response,
      listGames: ListGames()
    })));
    this.add = this.add.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showSettings = this.showSettings.bind(this);
  }

  save(){
    this.teacherService.addEvents(this.state.Events).then(
      (response)=> {
        Notification("Сохранено");
        this.setState(state => ({
          Events: response
        }))
      });
  }

  add(){
    this.setState(prevState => ({
        Events: [...prevState.Events, Event()]}), () => {})
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
    switch(e.target.name)
    {
      case "url":
        var text = e.target.selectedOptions[0].innerText;
        stateCopy.Events[index].url = val;
        stateCopy.Events[index].name = text;
        break;
      case "countLevels":
        stateCopy.Events[index].countLevels = val;
        break;
      default:
        break;
    }
    this.setState(stateCopy);
  }

  showSettings()
  {

  }

  render () {
    return (
      <div>
      <Game1Settings props={this.state}/>
      <ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={3000} />
      <div className="card">
      <h3 className="blue-gradient white-text card-header text-center font-weight-bold text-uppercase py-4 mb-0">Ваши задания</h3>
        <table className="table">
              <thead className="blue-gradient white-text">
                <tr>
                  <th className="">Название игры</th>
                  <th className="">Количество уровней</th>
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
                      <option value="">Выберите игру</option>
                      {this.state.listGames.map((item2, index) =>
                         <option key={index} value={item2.url} disabled={item2.url === null}>{item2.name}</option>
                        )}
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <MDBBtn color="info" onClick={this.showSettings}>Настроить задание</MDBBtn>
                    </div>
                  </td>
                  <td>
                    <MDBInput type="number" name="countLevels" value={item.countLevels.toString()} onChange={this.onChange}/>
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
      </div>
    );
  }
}
