import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';
import config from "./conf/conf.js"

class ChangePassword extends Component {

  state = {
    startUrl: config.startUrl,
    redirect: false,
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
    messageError: "",
    messageSuccess: "",
  }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkToken`, {
      token: localStorage.token
    })
      .then( res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        }
      })
      .catch(err => {
        this.setState({ redirect: true })
      })
  }

  changeOldPassword = (e) => { this.setState({oldPassword: e.target.value}) }
  changeNewPassword = (e) => { this.setState({newPassword: e.target.value}) }
  changeNewPasswordAgain = (e) => { this.setState({newPasswordAgain: e.target.value}) }

  save = () => {
    if (!this.state.oldPassword || !this.state.newPassword || !this.state.newPasswordAgain) {
      this.setState({ messageError: "Every input must have a value!" })
    } else if (this.state.newPassword !== this.state.newPasswordAgain) {
      this.setState({ messageError: "New Password and New Password Again must have the same value." })
    } else if (this.state.newPassword.length < 7){
      this.setState({ messageError: "The lenght of the new password must be 7 or more." })
    } else {
      this.setState({ messageError: "" })
    }

    axios.post(`${this.state.startUrl}/changePassword`, {
      token: localStorage.token,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    })
    .then( res => {
      if (res.status === 200) {
        this.setState({ messageSuccess: "Your password has been updated!" })
      } else {
        this.setState({ messageSuccess: res.data.error })
      }
    })
    .catch( err => {
      this.setState({ messageError: err.response.data.error })
    })

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <div className="field">
              <label className="label">Old Password</label>
              <div className="control">
                <input className="input" type="password" placeholder="Old Password" value={this.oldPassword} onChange={this.changeOldPassword} />
              </div>
            </div>

            <div className="field">
              <label className="label">New Password</label>
              <div className="control">
                <input className="input" type="password" placeholder="New Password" value={this.newPassword} onChange={this.changeNewPassword} />
              </div>
            </div>

            <div className="field">
              <label className="label">New Password Again</label>
              <div className="control">
                <input className="input" type="password" placeholder="New Password Again" value={this.newPasswordAgain} onChange={this.changeNewPasswordAgain} />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-success marge-top" onClick={this.save}>Save</button>
              </div>
            </div>

            {
              this.state.messageError || this.state.messageSuccess ? (
                <div className="field">
                  <div className="control">
                    {
                      this.state.messageError ? (
                        <p className="subtitle has-text-danger">{this.state.messageError}</p>
                      ) : (
                        <p className="subtitle has-text-success">{this.state.messageSuccess}</p>
                      )
                    }
                  </div>
                </div>
              ) : null
            }

          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
