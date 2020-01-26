import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Popup extends Component {

  state = {
    startUrl: "http://localhost:3001",
    post: {},
  }

  async componentDidMount () {
    axios.get(`${this.state.startUrl}/getPost?id=${this.props.id}`)
      .then(res => {
        console.log(res.data.result)
        this.setState({
          post: res.data.result
        })
      })
      .catch(err => {
        console.log('err get post', err)
      })

  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="block is-right">
            <button className="button is-danger" onClick={this.props.closePopup}>X</button>
          </div>
          {
            this.state.post.title ? (
              <div className="column">
                <div className="box background-transparent">
                  <p className="subtitle is-right">Created at {this.state.post.created_at.replace('T', ' ').replace('.000Z', '')}</p>
                  <h2 className="title is-2">{this.state.post.title}</h2>
                  <p className="subtitle">{this.state.post.message}</p>
                  <div className="block">
                    <img src={this.state.post.image}/>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default Popup;
