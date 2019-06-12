import React, { Component } from 'react';
import {schoolchildService} from "./services/SchoolchildService";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import $ from "jquery";


export class SchoolchildProfile extends Component {
  static displayName = SchoolchildProfile.name;
  constructor (props) {
    super(props);

    this.state={
        Events: [],
        option: {}
    }
    this.service = schoolchildService;

    var dateArray = [];
    var nameArray = [];
    var date = new Date();
    var dayofMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (var i = 0; i < dayofMonth; i++) {
      dateArray.push(('0' + ((i + 1))).slice(-2) + "." + ('0' + ((date.getMonth()+1))).slice(-2) + "." + date.getFullYear());
    }
    this.service.getCompletedEvents().then((resp)=> {

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
        Events: resp
    })
    });
  }


  render () {
    return (
      <div>
      <div className="card mb-5">
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
              this.state.Events.map((item, index) =>
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
    );
  }
}
