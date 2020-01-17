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
                      <a className="navbar-link" style={window.location.pathname.includes("/admin") ? {color: "#209CEE"} : {}}>
                        Admin
                      </a>

                      <div className="navbar-dropdown is-dark">
                        <a className="navbar-item">
                          Create User
                        </a>
                        <a className="navbar-item">
                          Manage User
                        </a>
                        <hr className="navbar-divider" />
                        <a className="navbar-item">
                          User Logs
                        </a>
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
