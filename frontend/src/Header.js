import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Firling from './img/firling.png'
import { StickyContainer, Sticky } from 'react-sticky';

class Header extends Component {

  state = {
    startUrl : "http://localhost:3001",
    redirect: false,
    is_admin: false
  }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkTokenAdmin`, {
      token: localStorage.token
    })
      .then( res => {
        if (res.status !== 200) {
          this.setState({ is_admin: false })
        } else {
          this.setState({ is_admin: true })
        }
      })
      .catch(err => {
        this.setState({ is_admin: false })
      })
  }

  logout = () => {
    localStorage.setItem("token", "");
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
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

                    <Link className="navbar-item" to="/latestposts" style={window.location.pathname == "/latestposts" ? {color: "#209CEE"} : {}}>
                      Latest Posts
                    </Link>

                    <Link className="navbar-item" to="/myposts" style={window.location.pathname == "/myposts" ? {color: "#209CEE"} : {}}>
                      My Posts
                    </Link>

                    <Link className="navbar-item" to="/createpost" style={window.location.pathname == "/createpost" ? {color: "#209CEE"} : {}}>
                      Create Post
                    </Link>

                    {
                      this.state.is_admin ? (
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
                      ) : null
                    }

                  </div>

                  <div className="navbar-end">
                    <div className="navbar-item">
                      <div className="username">
                        <label>Logged as { this.props.username }</label>
                      </div>
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
