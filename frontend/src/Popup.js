import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io("ws://localhost:3001", { path: "/ws" });

class Popup extends Component {

  state = {
    startUrl: "http://localhost:3001",
    username: "",
    post: {},
    com: [],
    cats: {
      "TO BE TESTED": "test",
      "TO SCRIPTERS": "script",
      "TO MAPPERS": "map",
      "TO DEVS": "dev",
      "OTHER": "other",
    },
    is_editing: false,
    imageCreate: "",
    text: "",
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

  getCom = () => {
    axios.get(`${this.state.startUrl}/getComs?post_id=${this.props.id}&token=${localStorage.token}`)
      .then(res => {
        var array = []
        res.data.result.forEach((elem, i) => {
          elem.id_updating = false
          array.push(elem)
        })
        this.setState({
          com: array
        })
      })
      .catch(err => {
        console.log('err get com', err)
      })
  }

  async componentDidMount () {
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
    this.getPost();
    this.getCom();
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

  delImageCreate = (e) => { this.setState({imageCreate: ""}) }

  onPaste = async (e, type) => {
    if(!e.clipboardData.items) { return console.log("null") }
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      let blob = e.clipboardData.items[i].getAsFile()

      if (blob) {
        const reader = new window.FileReader()
        reader.readAsDataURL(blob)

        reader.onloadend = () => {
          if (type == "post") {
            var {post} = this.state
            post["image"] = reader.result
            this.setState({post})
          } else {
            var {imageCreate} = this.state;
            imageCreate = reader.result
            this.setState({imageCreate})
          }
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

  changeComMessage = (e) => { this.setState({text: e.target.value}) }

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

  createCom = () => {
    axios.post(`${this.state.startUrl}/createCom`, {
      post_id: this.props.id,
      com: this.state.text,
      image: this.state.imageCreate,
      token: localStorage.token
    })
    .then(res => {
      this.setState({imageCreate: "", text: ""})
      this.getCom();
    })
    .catch(err => {
      console.log("error while creating the com:", err)
    })
  }

  editCom = (index) => {
    var { com } = this.state;
    com[index].is_updating = true;
    this.setState({ com })
  }

  changeMessageCom = (e, i) => {
    var { com } = this.state;
    com[i].com = e.target.value;
    this.setState({ com })
  }

  delImageCom = (i) => {
    var { com } = this.state;
    com[i].image = "";
    this.setState({ com })
  }

  cancelSaveCom = () => {
    this.getCom();
  }

  deleteCom = (index) => {
    var { com } = this.state
    var id = com[index].id;
    axios.post(`${this.state.startUrl}/deleteCom`, {com_id: id, token: localStorage.token})
      .then((res) => {
        this.getCom();
      })
      .catch((err) => {
        console.log("err deleting com =>", err)
      })
  }

  changeEditMessage = (i) => {
    var { com } = this.state;
    var currentCom = com[i]

    axios.post(`${this.state.startUrl}/updateCom`, {
      com_id: currentCom.id,
      com: currentCom.com,
      image: currentCom.image,
      token: localStorage.token,
    }).then((res) => {
      this.getCom();
    }).catch((err) => {
      console.log('err updating com =>', err)
    })
  }

  onPasteCom = async (e, index) => {
    if(!e.clipboardData.items) { return console.log("null") }
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      let blob = e.clipboardData.items[i].getAsFile()

      if (blob) {
        const reader = new window.FileReader()
        reader.readAsDataURL(blob)

        reader.onloadend = () => {
          var {com} = this.state
          com[index]["image"] = reader.result
          this.setState({com})
        }
      }
    }
  }

  render() {
    socket.on(`Com${this.props.id}`, () => {
      this.getCom();
    });
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
                          <textarea className="textarea" placeholder="Message" onPaste={(e) => this.onPaste(e, "post")} value={this.state.post.message} onChange={this.changeMessage}></textarea>
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
                          <div className="container box" onPaste={(e) => this.onPaste(e, "post")}>
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
                      <div className="block box background-totally-transparent">
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
              <label className="label">Write a sub comment here :</label>
              <div className="control">
                <textarea className="textarea" placeholder="Message" onPaste={(e) => this.onPaste(e, "com")} value={this.state.text} onChange={this.changeComMessage}></textarea>
              </div>
              <div className="control columns is-vcentered" style={{marginTop: "3px"}}>
                <div className="column">
                  <button
                    className="button is-danger"
                    onClick={this.delImageCreate}
                    disabled={this.state.imageCreate == ""}
                  >Delete Image</button>
                </div>
                <div className="column is-four-fifths">
                  <div className="container box has-text-centered" onPaste={(e) => this.onPaste(e, "com")}>
                    {
                      this.state.imageCreate != "" ? (
                        <img src={this.state.imageCreate} style={{maxHeight: "20rem"}}/>
                      ) : <h4 className="title is-4" style={{color: "black"}}>Your pasted image</h4>
                    }
                  </div>
                </div>
              </div>
              <button className="button is-info" style={{marginTop: "3px"}} onClick={this.createCom} disabled={this.state.text == ""}>New message</button>
            </div>
          </div>

          <div className="block box container background-transparent" style={{marginBottom: "2rem"}}>
            {
              this.state.com.length > 0 ? (
                this.state.com.map((elt, i) => (
                  elt.is_updating ? (
                    <div className="block box background-totally-transparent">
                      <div className="control">
                        <textarea className="textarea" placeholder="Message" onPaste={(e) => this.onPasteCom(e, i)} value={elt.com} onChange={(e) => this.changeMessageCom(e, i)}></textarea>
                      </div>
                      <div className="control columns is-vcentered" style={{marginTop: "3px"}}>
                        <div className="column">
                          <button
                            className="button is-danger"
                            onClick={() => this.delImageCom(i)}
                            disabled={elt.image == ""}
                          >Delete Image</button>
                        </div>
                        <div className="column is-four-fifths">
                          <div className="container box has-text-centered" onPaste={(e) => this.onPasteCom(e, i)}>
                            {
                              elt.image != "" ? (
                                <img src={elt.image} style={{maxHeight: "20rem"}}/>
                              ) : <h4 className="title is-4" style={{color: "black"}}>Your pasted image</h4>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="control" style={{ float: "right", marginBottom: "-5rem", zIndex: "15" }}>
                        <button className="button is-danger" onClick={() => this.deleteCom(i)}>Delete</button>
                      </div>
                      <div className="control">
                        <button className="button is-success" onClick={() => this.changeEditMessage(i)} disabled={elt.com == ""}>Save</button>
                        <button className="button is-warning" style={{marginLeft: "30px"}} onClick={this.cancelSaveCom}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="block box background-totally-transparent">
                      <label className="sub-com-username">{elt.username}</label>
                      {
                        elt.com.split('\n').map((elem, i) => (
                          <p className="subtitle">{elem}</p>
                        ))
                      }
                      {
                        elt.image != "" ? <img src={elt.image} style={{maxHeight: "25rem"}}/> : null
                      }
                      <button className="button is-warning sub-com-button-edit" disabled={this.state.username != elt.username} onClick={() => this.editCom(i)}>edit</button>
                    </div>
                  )
                ))
              ) : <h3 className="title is-3">No sub comment</h3>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
