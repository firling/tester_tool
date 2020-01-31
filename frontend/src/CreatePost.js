import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';

class CreatePost extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    image: "",
    message: "",
    title: "",
    cat: "TO BE TESTED",
    messageSuccess: "",
    messageError: "",
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

  cancel = (e) => {
    this.setState({
      image: "",
      message: "",
      title: ""
    })
  }

  createPost = (e) => {
    this.setState({messageSuccess: "", messageError: ""})
    axios.post(`${this.state.startUrl}/createPost`, {
      token: localStorage.token,
      image: this.state.image,
      message: this.state.message,
      to_x: this.state.cat,
      title: this.state.title
    })
      .then( res => {
        this.setState({messageSuccess: "A new post has been added!"})
        this.setState({
          image: "",
          message: "",
          title: ""
        })
      })
      .catch( err => {
        this.setState({messageError: `An error occured while creating the post: ${err}`})
      })
  }

  changeTitle = (e) => { this.setState({title: e.target.value}) }

  changeMessage = (e) => { this.setState({message: e.target.value}) }

  changeSelectCat = (e) => { this.setState({cat: e.target.value}) }

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
                <input className="input" type="text" placeholder="Title" value={this.state.title} onChange={this.changeTitle}/>
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea" placeholder="Message" value={this.state.message} onChange={this.changeMessage} onPaste={this.onPaste}></textarea>
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

            <div className="field">
              <label className="label">Select caterogry</label>
              <div className="control">
                <div className="select" onChange={this.changeSelectCat}>
                  <select className="color-cat">
                    <option className="test">TO BE TESTED</option>
                    <option className="script">TO SCRIPTERS</option>
                    <option className="map">TO MAPPERS</option>
                    <option className="dev">TO DEVS</option>
                    <option className="other">OTHER</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" onClick={this.createPost}>Create</button>
              </div>
              <div className="control">
                <button className="button is-link is-light" onClick={this.cancel}>Cancel</button>
              </div>
            </div>

            <div className="field is-grouped">
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

          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
