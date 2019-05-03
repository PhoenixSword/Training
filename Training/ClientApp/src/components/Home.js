import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import Game1 from "../Game1";
import { MDBBtn } from "mdbreact";

const Schoolchild = () => 
{
  return {id: "00000000-0000-0000-0000-000000000000", fio: '', email: '', password: ''}
}

export class Home extends Component {
  static displayName = Home.name;
  constructor (props) {
    super(props);
    this.state = 
    {
      schoolChilds: []
    }
    this.service = userService;
    this.teacherservice = teacherService;
    this.teacherservice.getSchoolChilds().then(response => 
      this.setState(state => ({
      schoolChilds: response
    })));
    this.add = this.add.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  save(){
    this.service.save(this.state.schoolChilds).then(
      (response)=> {
        //this.setState(state => ({redirect: true}))
      });
  }

  add(){
    this.setState(prevState => ({
          schoolChilds: [...prevState.schoolChilds, Schoolchild()]}), () => {})
  }

  remove(e){
    var index = e.target.parentNode.parentNode.id;
    console.log(e.target.parentNode.id);
    this.state.schoolChilds.splice(index, 1)
    this.setState(prevState => ({
              schoolChilds: this.state.schoolChilds
            }))
  }

  render () {
    return (
      <div>
        <table className="table">
        
              <thead className="blue-gradient white-text">
                <tr>
                  <th className="">Логин</th>
                  <th className="">Пароль</th>
                  <th className="">ФИО</th>
                  <th className="">Удалить</th>
                </tr>
              </thead>
              <tbody>
              {this.state.schoolChilds.map((item, index) =>
                <tr key={index} id={index}>
                  <input name="id" value={item.id} readonly hidden/>
                  <td>
                    <input name="email" value={item.email}/>
                  </td>
                  <td>
                    <input name="password" type="number"/>
                  </td>
                  <td>
                    <input name="username" type="number" value={item.username}/>
                  </td>
                  <td><MDBBtn style={{padding: "5px 20px"}} onClick={this.remove} color="danger">Удалить</MDBBtn></td>
                </tr>
                )}
              </tbody>
              <MDBBtn color="success" onClick={this.add}>Добавить</MDBBtn>
            </table>
      </div>
    );
  }
}
