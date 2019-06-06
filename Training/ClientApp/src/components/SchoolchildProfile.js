import React, { Component } from 'react';
import {schoolchildService} from "./services/SchoolchildService";

export class SchoolchildProfile extends Component {
  static displayName = SchoolchildProfile.name;
  constructor (props) {
    super(props);
    this.state={
        Events: []
    }
    this.service = schoolchildService;
    this.show = this.show.bind(this);
    this.service.getCompletedEvents().then((resp)=> 
      this.setState({
         Events: resp
    }));
  }

  show()
  {
  }

  render () {
    return (
      <div>
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
            </div>
      </div>
    );
  }
}
