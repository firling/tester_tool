import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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
import CreatePost from "./CreatePost";
import MyPosts from "./MyPosts";
import LatestPosts from "./LatestPosts";

class App extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    redirectAfterLogin: false,
    username: "",
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

    axios.get(`${this.state.startUrl}/username?token=${localStorage.token}`)
      .then( res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        } else {
          this.setState({ username: res.data.username.charAt(0).toUpperCase() + res.data.username.substr(1) })
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
                <Header username={this.state.username} />
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
                <Header username={this.state.username} />
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
                <Header username={this.state.username} />
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
                <Header username={this.state.username} />
                <Title title="Manage User"/>
                <ManageUser />
              </section>
            </StickyContainer>
          </div>
        )} />

        <Route path='/createpost' component={() => (
          <div>
            <StickyContainer>
              <section className="hero is-dark is-fullheight">
                <Header username={this.state.username} />
                <Title title="Create A New Post"/>
                <CreatePost />
              </section>
            </StickyContainer>
          </div>
        )} />

        <Route path='/myposts' component={() => (
          <div>
            <StickyContainer>
              <section className="hero is-dark is-fullheight">
                <Header username={this.state.username} />
                <Title title="My Posts"/>
                <MyPosts />
              </section>
            </StickyContainer>
          </div>
        )} />

        <Route path='/latestposts' component={() => (
          <div>
            <StickyContainer>
              <section className="hero is-dark is-fullheight">
                <Header username={this.state.username} />
                <Title title="Latest Posts"/>
                <LatestPosts />
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
