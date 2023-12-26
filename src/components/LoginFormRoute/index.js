import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginFormRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
    passwordType: 'password',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetail = {password, username}
    const url = 'https://apis.ccbp.in/login'
    const options = {body: JSON.stringify(userDetail), method: 'POST'}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onShowPassword = () => {
    const {passwordType} = this.state
    if (passwordType === 'password') {
      this.setState({passwordType: 'text'})
    } else {
      this.setState({passwordType: 'password'})
    }
  }

  render() {
    const {
      username,
      password,
      showErrorMsg,
      errorMsg,
      passwordType,
    } = this.state
    return (
      <div className="bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="logo-image"
          />
          <form onSubmit={this.onSubmitForm} className="form-container">
            <div className="input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                value={username}
                placeholder="Username"
                className="input-box"
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                id="password"
                value={password}
                type={passwordType}
                placeholder="Password"
                className="input-box"
                onChange={this.onChangePassword}
              />
            </div>

            <div className="checkbox-container">
              <input
                id="checkbox"
                type="checkbox"
                className="checkbox"
                onChange={this.onShowPassword}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {showErrorMsg && <p className="error">* {errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginFormRoute
