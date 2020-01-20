import React, { Component } from 'react';
import './App.css';

class Title extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="block has-text-centered marge-top">
        <h1 className="title is-1">{this.props.title}</h1>
      </div>
    );
  }
}

export default Title;
