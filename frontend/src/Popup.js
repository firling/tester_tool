import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Popup extends Component {

  state = {
    startUrl: "http://localhost:3001",
    post: {},
    cats: {
      "TO BE TESTED": "test",
      "TO SCRIPTERS": "script",
      "TO MAPPERS": "map",
      "TO DEVS": "dev",
      "OTHER": "other",
    },
    is_editing: false,
  }

  getPost = () => {
    this.setState({post: {}})
    axios.get(`${this.state.startUrl}/getPost?id=${this.props.id}`)
      .then(res => {
        this.setState({
          post: res.data.result
        })
      })
      .catch(err => {
        console.log('err get post', err)
      })
  }

  async componentDidMount () {
    this.getPost();
  }

  edit = (e) => {
    this.setState({is_editing: !this.state.is_editing})
  }

  cancel = async () => {
    await this.getPost()
    this.setState({is_editing: false})
  }

  delImage = (e) => {
    var {post} = this.state
    post["image"] = ""
    this.setState({post})
  }

  onPaste = async (e) => {
    if(!e.clipboardData.items) { return console.log("null") }
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      let blob = e.clipboardData.items[i].getAsFile()

      if (blob) {
        const reader = new window.FileReader()
        reader.readAsDataURL(blob)

        reader.onloadend = () => {
          var {post} = this.state
          post["image"] = reader.result
          this.setState({post})
        }
      }
    }
  }

  changeSelectCat = (e) => {
    var {post} = this.state
    post["to_x"] = e.target.value
    this.setState({post})
  }

  changeTitle = (e) => {
    var {post} = this.state
    post["title"] = e.target.value
    this.setState({post})
  }

  changeMessage = (e) => {
    var {post} = this.state
    post["message"] = e.target.value
    this.setState({post})
  }

  save = (e) => {
    var {post} = this.state
    post["token"] = localStorage.token;
    axios.post(`${this.state.startUrl}/updatePost`, post)
      .then(res => {
        console.log(res.data.result)
        this.setState({
          post: res.data.result,
          is_editing: false
        })
      })
      .catch(err => {
        console.log("error while saving the post:", err)
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
                {
                  this.state.is_editing ? (
                    <div className="box background-transparent">
                      <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                          <input className="input" type="text" placeholder="Title" value={this.state.post.title} onChange={this.changeTitle}/>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                          <textarea className="textarea" placeholder="Message" onPaste={this.onPaste} value={this.state.post.message} onChange={this.changeMessage}></textarea>
                        </div>
                      </div>

                      <div className="field">
                        <div className="columns is-vcentered">
                          <div className="column is-one-third">
                            <label className="label">Paste your image here or in the area above</label>
                          </div>
                          <div className="column">
                            <button
                              className="button is-danger"
                              onClick={this.delImage}
                              disabled={this.state.post.image == ""}
                            >
                            Delete Image</button>
                          </div>
                        </div>
                        <div className="control">
                          <div className="container box" onPaste={this.onPaste}>
                            {
                              this.state.post.image != "" ? (
                                <img src={this.state.post.image} />
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
                              <option className="test" selected={this.state.post.to_x == "TO BE TESTED"}>TO BE TESTED</option>
                              <option className="script" selected={this.state.post.to_x == "TO SCRIPTERS"}>TO SCRIPTERS</option>
                              <option className="map" selected={this.state.post.to_x == "TO MAPPERS"}>TO MAPPERS</option>
                              <option className="dev" selected={this.state.post.to_x == "TO DEVS"}>TO DEVS</option>
                              <option className="other" selected={this.state.post.to_x == "OTHER"}>OTHER</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="field is-grouped">
                        <div className="control">
                          <button className="button is-link" onClick={this.save}>Save</button>
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
                  ) : (
                    <div className="box background-transparent back-color-cat">
                      <div className={`cat ${this.state.cats[this.state.post.to_x]}`}>
                        <p className="subtitle" style={{color: "rgba(0, 0, 0, 0.9)"}}>{this.state.post.to_x}</p>
                      </div>
                      <p className="subtitle is-right">Created at {this.state.post.created_at.replace('T', ' ').replace('.000Z', '')}</p>
                      <h2 className="title is-2">{this.state.post.title}</h2>
                      <div className="block">
                        {
                          this.state.post.message.split('\n').map((elem, i) => (
                            <p className="subtitle">{elem}</p>
                          ))
                        }
                      </div>
                      <div className="block">
                        <img src={this.state.post.image}/>
                      </div>
                      <div className="block buttons is-right">
                        <button className="button is-warning" onClick={this.edit}>edit</button>
                      </div>
                    </div>
                  )
                }
              </div>
            ) : null
          }
          <div className="block container">
            <div className="field">
              <label className="label">Write an answer here :</label>
              <div className="control">
                <textarea className="textarea" placeholder="Message" onPaste={this.onPasteCom} value={this.state.messageCom} onChange={this.changeMessageCom}></textarea>
              </div>
              <button className="button is-info" style={{marginTop: "1px"}}>New message</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
