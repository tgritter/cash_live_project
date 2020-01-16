import React from "react";
import axios from 'axios';
import '../App.css';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
  }

  handleClick = (e, d) => {
    const {username, password} = this.state;
    axios.post('/auth/', {
      username: username,
      password: password
    })
    .then(res => {
      console.log('test', res)
      if(res.status === 200){
        localStorage.setItem('token', res.data.token);
        this.props.history.push('/todo/')
      }
    })
    .catch(error => {
        this.setState({errorMessage: 'Please enter valid username and password'})
        console.log(error.response)
    });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    const {username, password, errorMessage} = this.state;
    return (
      <div className="login-page">
          <div className="form">
              <div className="login-form">
                  <input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange}/>
                  <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange}/>
                  <p>{errorMessage}</p>
                  <button onClick={this.handleClick}>login</button>
              </div>
          </div>
      </div>
    );
  }
}