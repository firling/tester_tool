import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';
import { Gluejar } from '@charliewilco/gluejar'
import blobToBase64 from 'blob-to-base64';

class CreatePost extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    image: "",
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

  onPaste = async (e) => {
    if(!e.clipboardData.items) { return console.log("null") }
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      let blob = e.clipboardData.items[i].getAsFile()

      if (blob) {
        const reader = new window.FileReader()
        reader.readAsDataURL(blob)

        reader.onloadend = () => {
         this.setState({image: reader.result})
        }
      }
    }
  }

  delImage = (e) => {
    this.setState({image: ""})
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
              <label className="label">Title</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" />
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea" placeholder="Textarea" onPaste={this.onPaste}></textarea>
              </div>
            </div>

            <div className="field">
              <div className="columns is-vcentered">
                <div className="column">
                  <label className="label">Paste your image here or in the area above</label>
                </div>
                <div className="column">
                  <button
                    className="button is-danger"
                    disabled={this.state.image == ""}
                    onClick={this.delImage}
                  >
                  Delete Image</button>
                </div>
              </div>
              <div className="control">
                <div className="container box" onPaste={this.onPaste}>
                  {
                    this.state.image != "" ? (
                      <img src={this.state.image} />
                    ) : null
                  }
                </div>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Create</button>
              </div>
              <div className="control">
                <button className="button is-link is-light">Cancel</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
