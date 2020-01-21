import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';

class Home extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    rank: [],
    rankObj: {},
    users: [],
    usersNew: {},
    messageSuccess: "",
    messageError: "",
  }

  getAllUser = () => {
    axios.get(`${this.state.startUrl}/getAllUsers`)
      .then( res => {
        var obj = {}
        res.data.forEach(elt => {
          elt.is_updating = false;
          obj[elt.id] = elt
        })
        this.setState({ users: res.data, usersNew: obj })
      })
      .catch( err => {
        console.log("Error while getting users.")
      })
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

    axios.get(`${this.state.startUrl}/getAllRank`)
      .then( res => {
        this.setState({ rank: res.data })
        var obj = {}
        res.data.forEach(elt => {
          obj[elt.id] = elt
        })
        this.setState({ rank: res.data, rankObj: obj })
      })
      .catch( err => {
        console.log("Error while getting ranks")
      })
      this.getAllUser();
  }

  update = (id) => {
    var usersNew = this.state.usersNew
    usersNew[id].is_updating = true
    this.setState({usersNew})
  }

  cancel = (id) => {
    var usersNew = this.state.usersNew
    usersNew[id].is_updating = false
    this.setState({usersNew})
  }

  resetPassword = (id) => {
    this.setState({
      messageSuccess: "",
      messageError: ""
    })
    axios.post(`${this.state.startUrl}/resetPassword`, {id})
      .then( res => {
        this.setState({messageSuccess: `The user's password with the id ${id} has been reseted to \"changeit\".`})
      })
      .catch( err => {
        this.setState({messageError: `An error occured, error: ${err}`})
      })
  }

  banAcc = (id, value) => {
    this.setState({
      messageSuccess: "",
      messageError: ""
    })
    var valu = value == 1 ? 0 : 1
    axios.post(`${this.state.startUrl}/banAcc`, {id, value: valu})
      .then( res => {
        this.setState({messageSuccess: `The user with the id ${id} has been ${value == 1 ? "un": ""}banned.`})
        var usersNew = this.state.usersNew
        console.log(value)
        usersNew[id].banned = value == 0 ? 1 : 0
        console.log(usersNew[id].banned)
        this.setState({usersNew})
      })
      .catch( err => {
        this.setState({messageError: `An error occured, error: ${err}`})
      })
  }

  saveAcc = (id) => {
    axios.post(`${this.state.startUrl}/updateAcc`, {
      id,
      username: this.state.usersNew[id].username,
      rank_id: this.state.usersNew[id].rank_id,
      is_admin: this.state.usersNew[id].is_admin
    })
      .then( res => {
        this.setState({messageSuccess: `The user with the id ${id} has been updated`})
        this.getAllUser();
      })
      .catch( err => {
        this.setState({messageError: `An error occured, error: ${err}`})
      })
  }

  changeUsernameUpdating = (e, id) => {
    var { usersNew } = this.state
    usersNew[id].username = e.target.value
    this.setState({usersNew});
  }

  changeRankUpdating = (e, id) => {
    var { usersNew } = this.state
    usersNew[id].rank_id = e.target.childNodes[e.target.selectedIndex].id
    this.setState({usersNew});
  }

  changeAdminUpdating = (e, id) => {
    var { usersNew } = this.state
    usersNew[id].Admin = e.target.value
    this.setState({usersNew});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        <div className="container">
          <div className="column">
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
            <table className="manage_user">
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Rank</th>
                <th>Is Admin</th>
                <th>Update</th>
                <th>Cancel</th>
                <th>Reset Password</th>
                <th>Ban / Unban</th>
              </tr>
              {
                this.state.users.map((elt, index) => (
                  <tr>
                    <td>{elt.id}</td>
                    <td>
                      {
                        !this.state.usersNew[elt.id].is_updating ? elt.username : (
                          <input className="input" value={this.state.usersNew[elt.id].username} onChange={(e) => this.changeUsernameUpdating(e, elt.id)}/>
                        )
                      }
                    </td>
                    <td>
                      {
                        !this.state.usersNew[elt.id].is_updating ? this.state.rankObj[this.state.usersNew[elt.id].rank_id].name : (
                          <div class="select is-info">
                            <select onChange={(e) => this.changeRankUpdating(e, elt.id)}>
                              {
                                this.state.rank.map((elem, index) => (
                                  <option id={elem.id} selected={elem.id == this.state.usersNew[elt.id].rank_id}>{elem.name}</option>
                                ))
                              }
                            </select>
                          </div>
                        )
                      }
                    </td>
                    <td>
                      {
                        !this.state.usersNew[elt.id].is_updating ? elt.is_admin : (
                          <input className="input" value={this.state.usersNew[elt.id].is_admin} onChange={(e) => this.changeAdminUpdating(e, elt.id)}/>
                        )
                      }
                    </td>
                    <td>
                      {
                        !this.state.usersNew[elt.id].is_updating ? (
                          <button className="button is-info" onClick={() => this.update(elt.id)}>Update</button>
                        ) : (
                          <button className="button is-info" onClick={() => this.saveAcc(elt.id)}>Save</button>
                        )
                      }
                    </td>
                    <td><button className="button is-warning" id={elt.id} disabled={!this.state.usersNew[elt.id].is_updating} onClick={() => this.cancel(elt.id)}>Cancel</button></td>
                    <td><button className="button is-info" id={elt.id} disabled={this.state.usersNew[elt.id].is_updating} onClick={() => this.resetPassword(elt.id)}>Reset Password</button></td>
                    <td>
                      <button className="button is-danger" id={elt.id} disabled={this.state.usersNew[elt.id].is_updating} onClick={() => this.banAcc(elt.id, this.state.usersNew[elt.id].banned)}>{this.state.usersNew[elt.id].banned == 0 ? "Ban" : "Unban"}</button>
                    </td>
                  </tr>
                ))
              }
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
