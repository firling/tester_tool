import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './App.css';
import Firling from './img/firling.png'
import { StickyContainer, Sticky } from 'react-sticky';

class Header extends Component {

  state = {
    redirect: false,
  }

  logout = () => {
    localStorage.setItem("token", "");
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    console.log(window.location.pathname)
    return (
      <div className="hero-head">
        <Sticky>
          {({
            style
          }) => (
              <nav className="navbar is-dark" role="navigation" aria-label="main navigation" style={{...style}}>
                <div className="navbar-brand">
                  <Link className="navbar-item" to="/home">
                    <img src={Firling} width="112" height="28" className="is-rounded" />
                  </Link>

                  <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                  <div className="navbar-start">
                    <Link className="navbar-item" to="/home" style={window.location.pathname == "/home" ? {color: "#209CEE"} : {}}>
                      Home
                    </Link>

                    <a className="navbar-item" style={window.location.pathname == "/latestposts" ? {color: "#209CEE"} : {}}>
                      Latest Posts
                    </a>

                    <a className="navbar-item" style={window.location.pathname == "/myposts" ? {color: "#209CEE"} : {}}>
                      My Posts
                    </a>

                    <a className="navbar-item" style={window.location.pathname == "/createpost" ? {color: "#209CEE"} : {}}>
                      Create Post
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                      <Link className="navbar-link" style={window.location.pathname == "/createuser" || window.location.pathname == "/manageuser" || window.location.pathname == "/userlogs" ? {color: "#209CEE"} : {}}>
                        Admin
                      </Link>

                      <div className="navbar-dropdown is-dark">
                        <Link to="/createuser" className="navbar-item" style={window.location.pathname == "/createuser" ? {color: "#209CEE"} : {}}>
                          Create User
                        </Link>
                        <Link to="/manageuser" className="navbar-item" style={window.location.pathname == "/manageuser" ? {color: "#209CEE"} : {}}>
                          Manage User
                        </Link>
                        <hr className="navbar-divider" />
                        <Link to="/userlogs" className="navbar-item" style={window.location.pathname == "/userlogs" ? {color: "#209CEE"} : {}}>
                          User Logs
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="navbar-end">
                    <div className="navbar-item">
                      <div className="buttons">
                        <Link className="button is-info" to="/changepassword">
                          Change Password
                        </Link>
                        <button className="button is-danger" onClick={this.logout}>Log Out</button>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
          )}
        </Sticky>
      </div>
    );
  }
}

export default Header;