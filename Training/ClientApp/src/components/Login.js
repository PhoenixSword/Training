import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

import {userService} from "./services/UserService.js";
import {Alert} from "./Alert.js";
import { Formik } from 'formik';
import * as Yup from 'yup';

export class Login extends Component {
  static displayName = Login.name;
  constructor (props) {
    super(props);
    this.service = userService;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {alert: null, redirect: false};
    this.temp = "";
  }

  handleSubmit(data){
    this.service.login(data).then(response => 
    this.setState(state => ({
      alert: response,
      redirect: true
    })));
  }

  render () {
    if (this.state.redirect && !this.state.alert) {
      return <Redirect to='/'/>;
    }
    return (
      <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
           <Alert message={this.state.alert} />
            <MDBCardBody>
              <MDBCardHeader className=" form-header aqua-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Войти:
                </h3>
              </MDBCardHeader>
               <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    this.handleSubmit(values);
                }}
                validationSchema={Yup.object().shape({
                   email: Yup.string()
                     .required('Заполните поле'),
                  password: Yup.string()
                    .required('Заполните поле'),
                })}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                    <div className="grey-text pt-3 login">
                      <div className="input-group justify-content-center">
                        <MDBInput
                          id="email"
                          label="Введите логин"
                          type="text"
                          icon="envelope"
                          group
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required 
                          ref={node => (this.email = node)}
                          className={
                            errors.email && touched.email ? 'form-control text-input text-danger error' : 'form-control text-input'
                          }
                          validate
                          error="wrong"
                          success="right"
                          style={{width: '400px'}}
                        />
                         {errors.email &&
                        touched.email && <div className="text-danger input-feedback">{errors.email}</div>}
                        </div>
                       <div className="input-group m-0 justify-content-center">   
                        <MDBInput
                            id="password"
                            label="Введите пароль"
                            type="password"
                            icon="key"
                            group
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required 
                            ref={node => (this.password = node)}
                            className={
                              errors.password && touched.password ? 'form-control text-input text-danger error' : 'form-control text-input'
                            }
                            validate
                            error="wrong"
                            success="right"
                            style={{width: '400px'}}
                          /> 
                        {errors.password &&
                          touched.password && <div className="text-danger input-feedback">{errors.password}</div>}
                        </div>
                        </div>
                    <div className="text-center mt-4">
                      <MDBBtn
                        color="light-blue"
                        className="mb-3"
                        type="submit"
                        >
                        Login
                      </MDBBtn>
                    </div>
                    </form>
                  );
                }}
              </Formik>
              <hr/>
              <div className=" text-center">
                <div className="font-weight-light">
                <p>Не зарегистрированы? <Link to="/register"> Зарегистрироваться УЧИТЕЛЮ</Link></p>
                  <p className="blue text-white" style={{border: '2px solid white', borderRadius: '10px'}}>Ученики должны получить логин и пароль у учителя</p>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
  }
}
