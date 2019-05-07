import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import { MDBBtn, MDBInput, Button, ToastContainer, MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";
import Notification from "./Notification";
import {ListGames} from "./ListGames.js";

const Event = () => 
{
  return {id: "00000000-0000-0000-0000-000000000000", name: '', countLevels: 0}
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
  }

  save(){
    this.teacherService.addEvents(this.state.Events).then(
      ()=> {
        Notification("Сохранено");
      });
  }

  add(){
    this.setState(prevState => ({
        Events: [...prevState.Events, Event()]}), () => {})
  }

  remove(e){
    var id = e.target.parentElement.parentElement.children[0].children[0].value;
    var index = e.target.parentNode.parentNode.id;
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
    console.log(e.target.value)
    var val = e.target.value;
    var index = e.target.parentNode.parentNode.parentNode.id;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.Events = stateCopy.Events.slice();
    stateCopy.Events[index] = Object.assign({}, stateCopy.Events[index]);
    switch(e.target.name)
    {
      case "name":
        stateCopy.Events[index].name = val;
        break;
      case "countLevels":
        stateCopy.Events[index].countLevels = val;
        break;
      default:
        break;
    }
    this.setState(stateCopy);
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
                  <th className="">Количество уровней</th>
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
                      <select name="name" className="browser-default custom-select" value={item.name} onChange={this.onChange}>
                      <option value="">Выберите игру</option>
                      {this.state.listGames.map((item2, index) =>
                         <option key={index} value={item2.url} disabled={item2.url === null}>{item2.name}</option>
                        )}
                      </select>
                    </div>
                  </td>
                  <td>
                    <MDBInput type="number" name="countLevels" value={item.countLevels.toString()} onChange={this.onChange}/>
                  </td>
                  <td><MDBBtn style={{padding: "5px 20px"}} onClick={this.remove} color="danger">Удалить</MDBBtn></td>
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
