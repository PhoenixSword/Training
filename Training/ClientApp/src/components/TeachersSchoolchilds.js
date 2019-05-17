import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import { MDBBtn, MDBInput, ToastContainer   } from "mdbreact";
import Notification from "./Notification";

const Schoolchild = () => 
{
  return {id: "00000000-0000-0000-0000-000000000000", email: '', password: '', fio: ''}
}

export class TeachersSchoolchilds extends Component {
  static displayName = TeachersSchoolchilds.name;
  constructor (props) {
    super(props);
    this.state = 
    {
      schoolChilds: []
    }
    this.service = userService;
    this.teacherService = teacherService;
    this.teacherService.getSchoolChilds().then(response => 
    this.setState(state => ({
      schoolChilds: response
    })));
    this.add = this.add.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  save(){
    this.teacherService.addSchoolChilds(this.state.schoolChilds).then(
      (response)=> {
        Notification("Сохранено");
      	 this.setState(state => ({
		      schoolChilds: response
		    }))
      });
  }

  add(){
    this.setState(prevState => ({
        schoolChilds: [...prevState.schoolChilds, Schoolchild()]}), () => {})
  }

  remove(id, index){
    this.state.schoolChilds.splice(index, 1)
    this.setState(
      prevState => ({
            schoolChilds: this.state.schoolChilds
          }));
    if (id !== '00000000-0000-0000-0000-000000000000') {
      this.teacherService.removeSchoolChilds(id);
    }
  }

  onChange(e){
    var val = e.target.value;
    var index = e.target.parentNode.parentNode.parentNode.id;
    var stateCopy = Object.assign({}, this.state);
    stateCopy.schoolChilds = stateCopy.schoolChilds.slice();
    stateCopy.schoolChilds[index] = Object.assign({}, stateCopy.schoolChilds[index]);
    switch(e.target.name)
    {
      case "email":
      	if (val.match("^[A-Za-z0-9]+$")) {
        	stateCopy.schoolChilds[index].email = val;
      	}
        break;
      case "password":
        stateCopy.schoolChilds[index].password = val;
        break;
      case "fio":
        stateCopy.schoolChilds[index].fio = val;
        break;
      default:
        break;
    }
    this.setState(stateCopy);
  }
  render () {
    return (
      <div>
      <ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={3000}/>
      <div className="card">
      <h3 className="blue-gradient white-text card-header text-center font-weight-bold text-uppercase py-4 mb-0">Ваши ученики</h3>
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
                <td hidden><input name="id" value={item.id} readOnly hidden/></td>
                  <td>
                    <MDBInput name="email" value={item.email} onChange={this.onChange}/>
                  </td>
                  <td>
                    <MDBInput name="password" value={item.password} onChange={this.onChange}/>
                  </td>
                  <td>
                    <MDBInput name="fio" value={item.fio} onChange={this.onChange}/>
                  </td>
                  <td><MDBBtn style={{padding: "5px 20px"}} onClick={() => this.remove(item.id, index)} color="danger">Удалить</MDBBtn></td>
                </tr>
                )}
              </tbody>
            </table>
              <MDBBtn color="primary" onClick={this.add}>Добавить</MDBBtn>
              <MDBBtn color="success" onClick={this.save}>Сохранить</MDBBtn>

            </div>
      </div>
    );
  }
}