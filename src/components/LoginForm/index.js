import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    console.log('Hello')
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
      console.log(data)
    }
  }

  render() {
    const {usernameInput, passwordInput, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <form onSubmit={this.submitLoginDetails}>
            <div className="input-container">
              <label htmlFor="textInput" className="labelEl">
                USERNAME
              </label>
              <input
                type="text"
                id="textInput"
                className="inputEl"
                placeholder="Username"
                value={usernameInput}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="passwordInput" className="labelEl">
                PASSWORD
              </label>
              <input
                type="password"
                id="passwordInput"
                className="inputEl"
                placeholder="Password"
                value={passwordInput}
                onChange={this.onChangePassword}
              />
            </div>

            <button className="Login-Button" type="submit">
              Login
            </button>
            {showSubmitError === true ? (
              <p className="error-para">{errorMsg}</p>
            ) : null}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
