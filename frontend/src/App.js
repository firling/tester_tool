import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import axios from "axios";
import './App.css';
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import ChangePassword from "./ChangePassword";
import Title from "./Title";
import CreateUser from "./CreateUser";
import ManageUser from "./ManageUser";

class App extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    redirectAfterLogin: false,
  }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkToken`, {
      token: localStorage.token
    })
      .then( res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        } else {
          this.setState({ redirectAfterLogin: true })
        }
      })
      .catch(err => {
        this.setState({ redirect: true })
      })
  }

  render() {
    return (
      <Router>

        <Route path='/login' exact component={() => <Login />} />
        <Route path='/home' component={() => (
          <div>
            <StickyContainer>
              <section className="hero is-dark is-fullheight">
                <Header />
                <Title title="Home"/>
                <Home />
              </section>
            </StickyContainer>
          </div>
        )} />

        <Route path='/changepassword' component={() => (
          <div>
            <StickyContainer>
              <section className="hero is-dark is-fullheight">
                <Header />
                <Title title="Change Password"/>
                <ChangePassword />
              </section>
            </StickyContainer>
          </div>
        )} />

        <Route path='/createuser' component={() => (
          <div>
            <StickyContainer>
              <section className="hero is-dark is-fullheight">
                <Header />
                <Title title="Create User"/>
                <CreateUser />
              </section>
            </StickyContainer>
          </div>
        )} />

        <Route path='/manageuser' component={() => (
          <div>
            <StickyContainer>
              <section className="hero is-dark is-fullheight">
                <Header />
                <Title title="Manage User"/>
                <ManageUser />
              </section>
            </StickyContainer>
          </div>
        )} />

        <Route exact path="/">
          {this.state.redirect ? <Redirect to="/login" /> : null}
          {this.state.redirectAfterLogin ? <Redirect to="/home" /> : null}
        </Route>

      </Router>
    );
  }
}

export default App;
