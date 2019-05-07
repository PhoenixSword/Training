import React, { Component } from 'react';
import { MDBBtn, MDBInput, Button, ToastContainer   } from "mdbreact";

export class SchoolchildsEvents extends Component {
  static displayName = SchoolchildsEvents.name;
  constructor (props) {
    super(props);
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
              // this.state.schoolChilds.map((item, index) =>
              //   <tr key={index} id={index}>
              //   <td hidden><input name="id" value={item.id} readOnly hidden/></td>
              //     <td>
              //       <MDBInput name="email" value={item.email} onChange={this.onChange}/>
              //     </td>
              //     <td>
              //       <MDBInput name="password" value={item.password} onChange={this.onChange}/>
              //     </td>
              //     <td>
              //       <MDBInput name="fio" value={item.fio} onChange={this.onChange}/>
              //     </td>
              //     <td><MDBBtn style={{padding: "5px 20px"}} onClick={this.remove} color="danger">Удалить</MDBBtn></td>
              //   </tr>
              //   )
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
