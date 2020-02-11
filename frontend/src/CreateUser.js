import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';
import config from "./conf/conf.js"

class CreateUser extends Component {

  state = {
    startUrl: config.startUrl,
    redirect: false,
    rank: [],
    username: "",
    password: "",
    rank_id: 9,
    messageError: "",
    messageSuccess: "",
    is_admin: 0
  }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkTokenAdmin`, {
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

    axios.get(`${this.state.startUrl}/getAllRank`)
      .then( res => {
        this.setState({ rank: res.data })
      })
      .catch( err => {
        console.log("Error while getting ranks")
      })
  }

  changeUsername = (e) => { this.setState({ username: e.target.value }) }
  changePassword = (e) => { this.setState({ password: e.target.value }) }
  changeRank = (e) => { this.setState({ rank_id: e.target.childNodes[e.target.selectedIndex].id }) }
  changeAdmin = (e) => { this.setState({ is_admin: e.target.id }) }


  submitNewUser = (e) => {
    if (!this.state.username || !this.state.password) {
      return this.setState({ messageError: "You have to fill every field." })
    } else {
      this.setState({ messageError: "", messageSuccess: "" })
    }
    axios.post(`${this.state.startUrl}/register`, {
      username: this.state.username,
      password: this.state.password,
      rank: this.state.rank_id,
      admin: this.state.is_admin
    })
    .then( res => {
      this.setState({ messageSuccess: "New user has been saved!" })
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
              <label className="label">Username</label>
              <div className="control">
                <input className="input is-info" type="text" placeholder="Username" value={this.username} onChange={this.changeUsername} />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input is-info" type="text" placeholder="Ayaaa" value={this.password} onChange={this.changePassword} />
              </div>
            </div>

            <div class="field">
              <label className="label">Rank</label>
              <div class="control">
                <div class="select is-info">
                  <select onChange={this.changeRank}>
                    {
                      this.state.rank.map((elt, index) => (
                        <option id={elt.id}>{elt.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Is admin?</label>
              <div class="control is_admin">
                <label class="radio">
                  <input type="radio" name="admin" id="1" checked={this.state.is_admin == 1} onChange={this.changeAdmin} />
                  Yes
                </label>
                <label class="radio">
                  <input type="radio" name="admin" id="0" checked={this.state.is_admin == 0} onChange={this.changeAdmin} />
                  No
                </label>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-success marge-top" onClick={this.submitNewUser}>Save</button>
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

export default CreateUser;
