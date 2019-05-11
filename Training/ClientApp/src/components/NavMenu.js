import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { userService } from "./services/UserService.js";
import {role} from './services/Auth-header';

function Greeting(props) {
    if (userService.authorize()) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function Nav(props) {
    if (role() === "Teacher") {
        return <TeacherNav />;
    }
    if (role() === "Schoolchild") {
        return <SchoolchildNav />;
    }
    return null;
}

function UserGreeting(props) {
    return <React.Fragment>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/profile">{JSON.parse(localStorage.getItem('user')).fio}</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="#" onClick={userService.logout}>Выйти</NavLink>
        </NavItem>
    </React.Fragment>;
}

function TeacherNav(props) {
    return <React.Fragment>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/schoolchilds">Ученики</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/events">Задания</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/games">Все игры</NavLink>
        </NavItem>
    </React.Fragment>;
}

function SchoolchildNav(props) {
    return <React.Fragment>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/events">Задания</NavLink>
        </NavItem>
    </React.Fragment>;
}
function GuestGreeting(props) {
    return <React.Fragment>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/login">Войти</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/register">Регистрация учителя</NavLink>
        </NavItem>
    </React.Fragment>;
}


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);

        this.state = {
            collapsed: true
        };
    }


    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar style={{position: 'fixed', width: '100%', background: 'linear-gradient(40deg, #3291b4, #307a9f)', zIndex: '100', color: 'white'}} className="px-5 navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" dark>
                 
                        <NavbarBrand tag={Link} to="/">React</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <Nav/>
                            </ul>
                            <ul className="navbar-nav flex-grow ml-auto">
                                <Greeting />
                            </ul>
                        </Collapse>
                </Navbar>
            </header>
        );
    }
}
