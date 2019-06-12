import React, { Component } from 'react';
import {userService} from "./services/UserService";
import {teacherService} from "./services/TeacherService";
import { MDBBtn, MDBInput, ToastContainer   } from "mdbreact";
import Notification from "./Notification";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import $ from "jquery";


$(document).mouseup(function (e){
  var div = $(".profile"); 
  if (!div.is(e.target) && div.has(e.target).length === 0 && e.which === 1) { 
    div.hide(); 
    $('#overlay3').hide(); 
  }
});

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
      schoolChilds: [],
      Profile: [],
      options: {}
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

  getProfile(id){
    var dateArray = [];
    var nameArray = [];
    var date = new Date();
    var dayofMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (var i = 0; i < dayofMonth; i++) {
      dateArray.push(('0' + ((i + 1))).slice(-2) + "." + ('0' + ((date.getMonth()+1))).slice(-2) + "." + date.getFullYear());
    }
     this.teacherService.getProfile(id).then((resp) => {
      for (var i = 0; i < resp.length; i++) {
          var score = [];
          for (var j = 0; j < dayofMonth; j++) {
              score.push(0);
          }
          var index = $.trim(resp[i].date[0] + "" + resp[i].date[1])-1;
          score[+index] = resp[i].score
          nameArray.push({
          name: resp[i].name,
          data: score
        })
      }
    this.setState({
        options: {
          title: {
            display: true,
            text: 'Образовательная траектория'
          },
          plotOptions: {
              line: {
                 dataLabels: {
                      enabled: true,
                      formatter: function() {
                          if (this.y > 0)
                              return this.y;
                          else
                              return null;
                      }
                  }
              }
          },
          series: nameArray,
          yAxis: [{
            title: {
                text: 'Количество очков'
            }
          }],
          xAxis: [{
            categories: dateArray,
            title: {
                text: 'Дата'
            }
          }],
        },
        Profile: resp
    })
    $(".profile").show(),
    $('#overlay3').show()
    });
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
                  <th className="">Профиль ученика</th>
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
                  <td><MDBBtn style={{padding: "5px 20px"}} onClick={() => this.getProfile(item.id)} color="primary">Профиль ученика</MDBBtn></td>
                  <td><MDBBtn style={{padding: "5px 20px"}} onClick={() => this.remove(item.id, index)} color="danger">Удалить</MDBBtn></td>
                </tr>
                )}
              </tbody>
            </table>
              <MDBBtn color="primary" onClick={this.add}>Добавить</MDBBtn>
              <MDBBtn color="success" onClick={this.save}>Сохранить</MDBBtn>
            </div>
            <div className="profile scrollBlock">
              <div className="card">
            <h3 className="blue-gradient white-text card-header text-center font-weight-bold text-uppercase py-4 mb-0">Выполненные задания</h3>
              <table className="table">
                    <thead className="blue-gradient white-text">
                      <tr>
                        <th className="">Название игры</th>
                        <th className="">Количество уровней</th>
                        <th className="">Дата выполнения</th>
                        <th className="">Количество очков</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.Profile.map((item, index) =>
                      <tr key={index} id={index}>
                        <td>
                          <div className="md-form">
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td>
                          <div className="md-form">
                            <span>{item.countLevels}</span>
                          </div>
                        </td>
                        <td>
                          <div className="md-form">
                            <span>{item.date}</span>
                          </div>
                        </td>
                        <td>
                          <div className="md-form">
                            <span>{item.score}</span>
                          </div>
                        </td>
                      </tr>
                      )
                    }
                    </tbody>
                  </table>
                  <hr/>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                  />
                  </div>
            </div>
      </div>
    );
  }
}