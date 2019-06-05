import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import { MDBBtn, MDBInput, ToastContainer } from "mdbreact";

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
    var settings = this.props.settings;
    console.log(settings);
    this.state = 
    {
      settings: 
      [
        {
          cardsCount: 2,
          leftResult: 1,
          leftValue: 3,
          rightResult: 1,
          rightValue: 6
        },{
          cardsCount: 5,
          leftResult: 2,
          leftValue: 5,
          rightResult: 2,
          rightValue: 4
        },{
          cardsCount: 1,
          leftResult: 1,
          leftValue: 6,
          rightResult: 1,
          rightValue: 1
        }
      ]
    }
    console.log(this.state.settings);

    this.service = userService;
    this.teacherService = teacherService;
    this.add = this.add.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  save(){
    this.teacherService.addEvents(this.state.settings).then(
      (response)=> {
        Notification("Сохранено");
        this.setState(state => ({
          settings: response
        }))
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
    // if (id !== '00000000-0000-0000-0000-000000000000') {
    //   this.teacherService.removeEvents(id);
    // }
  }

  onChange(e){
    var val = e.target.value;
    var index = e.target.parentNode.parentNode.parentNode.parentNode.id;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.settings = stateCopy.settings.slice();
    stateCopy.settings[index] = Object.assign({}, stateCopy.settings[index]);
    switch(e.target.name)
    {
      case "cardsCount":
        stateCopy.settings[index].cardCount = val;
        break;
      case "leftResult":
        stateCopy.settings[index].leftResult = val;
        break;
      case "leftValue":
        stateCopy.settings[index].leftValue = val;
        break;
      case "rightResult":
        stateCopy.settings[index].rightResult = val;
        break;
      case "rightValue":
        stateCopy.settings[index].rightValue = val;
        break;
      default:
        break;
    }
    console.log(stateCopy.settings[index]);
    this.setState(stateCopy);
  }
  render () {
    return ( 
      <div>
        <table className="table">
              <thead className="blue-gradient white-text">
                <tr>
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
                    <div className="md-form">
                      <MDBInput type="number" name="cardsCount" value={item.cardsCount.toString()} onChange={this.onChange}/>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <select name="leftResult" className="browser-default custom-select" value={item.leftResult} onChange={this.onChange}>
                        <option value="">Случайно</option>
                           <option value="1">Сотни</option>
                           <option value="2">Десятки</option>
                           <option value="3">Единицы</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <MDBInput type="number" name="leftValue" value={item.leftValue.toString()} onChange={this.onChange}/>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <select name="rightResult" className="browser-default custom-select" value={item.rightResult} onChange={this.onChange}>
                        <option value="">Выберите игру</option>
                           <option value="1">Сотни</option>
                           <option value="2">Десятки</option>
                           <option value="3">Единицы</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="md-form">
                      <MDBInput type="number" name="rightValue" value={item.rightValue.toString()} onChange={this.onChange}/>
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
