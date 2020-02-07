import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';

class Userlogs extends Component {

  state = {
  }

  async componentDidMount () {
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        Aya
      </div>
    );
  }
}

export default Userlogs;
