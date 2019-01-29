import React, { Component as Container } from "react"
import PropTypes from "prop-types"

import Button from "../../components/Button"
import Field from "../../components/Field"

import isEmpty from "lodash/isEmpty"

import "./style.styl"



const sampleCredentials = {
  "username": "password",
  "admin":    "012abc345",
}



export class Login extends Container {

  constructor(props) {
    super(props)

    this.state = {
      errors:   {},
      password: "",
      username: "",
    }
  }



  logIn() {
    const { onLogIn } = this.props
    const { password, username } = this.state

    let errors = {}

    if (!sampleCredentials[username] || sampleCredentials[username] !== password)
      errors.credentials = "The credentials you have provided do not match an existing user!"
    
    this.setState({ errors })

    if (isEmpty(errors))
      onLogIn(username)
  }



  submit(e) {
    if (e.key === "Enter") this.logIn()
  }



  updateValue(key, value) {
    this.setState({ [key]: value })
  }



  render() {
    const { errors, password, username } = this.state
    const { logIn, submit, updateValue } = this

    return (
      <div className="page">
        <div className="page-header">
          <h1>Login</h1>
        </div>
        <div className="page-content middle">
          <form>
            <fieldset>
              <Field
                id="username"
                label="Username"
                onChange={updateValue.bind(this)}
                onKeyDown={submit.bind(this)}
                placeholder="Username"
                type="text"
                value={username}
              />
              <Field
                id="password"
                label="Password"
                onChange={updateValue.bind(this)}
                onKeyDown={submit.bind(this)}
                placeholder="Password"
                type="password"
                value={password}
              />
            </fieldset>

            <fieldset>
              {errors.credentials && <label className="error">{errors.credentials}</label>}
              <Button onClick={logIn.bind(this)}>
                Log In
              </Button>
            </fieldset>
          </form>
        </div>
      </div>

    )
  }

}



Login.displayName = "Login"



Login.propTypes = {
  onLogIn: PropTypes.func,
}



export default Login