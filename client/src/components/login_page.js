import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { loginUser } from '../actions/index';

import 'style/auth';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    loginUser({
      username: this.state.username,
      password: this.state.password
    });
  }

  // Generalized handler for username/password
  handleChange(name, e) {
    // Work around to allow the string value of the variable name
    // to be the object key.
    const newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="auth-container">
        <Card className="card">
          <h2>Login</h2>
          <CardText>
            <TextField
              hintText='User'
              className='input-field'
              value={this.state.username}
              onChange={this.handleChange.bind(this, 'username')}
            />
            <TextField
              hintText='Password'
              type="password"
              className='input-field'
              value={this.state.password}
              onChange={this.handleChange.bind(this, 'password')}
            />
            <RaisedButton
              label="Login"
              primary={true}
              className="submit-form"
              type="submit"
            />
          </CardText>
        </Card>
      </form>
    );
  }
}

export default connect(null, { loginUser })(LoginPage);
