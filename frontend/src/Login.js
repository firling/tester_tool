import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import axios from "axios";
import './App.css';
import Firling from './img/firling.png'

class Login extends Component {

    state = {
      startUrl: "http://localhost:3001",
      redirect: false,
      messageError: "",
      username: "",
      password: "",
      pathName: ""
    }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkToken`, {
      token: localStorage.token
    })
    .then( res => {
      if (res.status === 200) {
        this.setState({ redirect: true })
      }
    })
  }

  submit = (e) => {
    e.preventDefault();
    if (!this.state.username) {
      return this.setState({ messageError: "The username is required." })
    } else if (!this.state.password) {
      return this.setState({ messageError: "The password is required." })
    } else {
      this.setState({ messageError: "" })
    }

    axios.post(`${this.state.startUrl}/authenticate`, {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      if(res.status === 200) {
        localStorage.setItem("token", res.data.token);
        this.setState({
          messageError: "Authentication successful! You'll be redirected soon.",
          redirect: true
       })
      } else {
        this.setState({ messageError: "Incorrect username or password." })
      }
    })
    .catch(err => {
      console.log(err)
      this.setState({ messageError: "Incorrect username or password." })
    })
  }

  changeUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  changePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <section className="hero is-primary is-fullheight">
          <div className="hero-body">
              <div className="container has-text-centered">
                  <div className="column is-4 is-offset-4">
                      <h3 className="title has-text-black">Login</h3>
                      <hr className="login-hr" />
                      <p className="subtitle has-text-black">Please login to proceed.</p>
                      <div className="box App">
                          <figure className="image is-128x128 has-image-centered">
                              <img src={Firling} className="is-rounded"/>
                          </figure>
                          <form>
                              <div className="field">
                                  <div className="control">
                                      <input className="input is-large" placeholder="Username" autoFocus="" onChange={this.changeUsername} />
                                  </div>
                              </div>

                              <div className="field">
                                  <div className="control">
                                      <input className="input is-large" type="password" placeholder="Your Password" onChange={this.changePassword}/>
                                  </div>
                              </div>
                              <button className="button is-block is-info is-large is-fullwidth" onClick={this.submit}>Login <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                          </form>
                        	{
                            this.state.messageError ? (
                              <div className="block marge-top">
                                <p className="subtitle has-text-danger">{this.state.messageError}</p>
                              </div>
                            ) : null
                          }
                      </div>
                  </div>
              </div>
          </div>
      </section>
    );
  }
}

export default Login;
