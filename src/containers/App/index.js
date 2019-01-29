import React, { Component as Container } from "react"
import PropTypes from "prop-types"
import { NavLink, Route, Switch, withRouter } from "react-router-dom"

import classNames from "classnames"
import isEmpty from "lodash/isEmpty"
import map from "lodash/map"

import "./style.styl"

import Content from "../Content"
import Menu from "../Menu"
import MenuItem from "../../components/MenuItem"
import Login from "../Login"
import Page from "../Page"



const HomePage = () => (
  <div className="page">
    <div className="page-header">
      <h1>Home</h1>
    </div>

    <div className="page-content">
      <p>
        Welcome!
      </p>
    </div>
  </div>
)



export class App extends Container {

	constructor(props) {
		super(props)

		this.state = {
			pages: {},
			username: null,
		}
	}



	goToLogin(e) {
		const { history } = this.props

		e.preventDefault()

		history.push("/login")
	}



	static getDerivedStateFromProps(_, state) {
		state = { ...state }
		
		const pages = JSON.parse(localStorage.pages || "{}")
		
		if (!isEmpty(pages)) state.pages = pages
		state.username = localStorage.username

		return state
	}



	logIn(username) {
		const { history } = this.props

		localStorage.username = username
		this.setState({ username })

		history.push("/")
	}



	logOut(e) {
		const { history } = this.props

		e.preventDefault()

		localStorage.removeItem("username")

		history.push("/")
	}



	render() {
		const { location } = this.props
		const { pages, username } = this.state
		const { goToLogin, logIn, logOut, onLogIn } = this

		const links = Object.keys(pages).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

		return (
			<div className="app-container">
				<Menu>
					<MenuItem>
						<NavLink to="/" exact activeClassName="active">
							Home
						</NavLink>
					</MenuItem>
					{map(links, link => (
						<MenuItem key={link}>
							<NavLink to={`/pages/view/${link}`} activeClassName="active">
								{link}
							</NavLink>
						</MenuItem>
					))}
					{username && (
						<MenuItem large>
							<NavLink to={`/pages/add`} activeClassName="active">
								Add Page
							</NavLink>
						</MenuItem>
					)}
					<MenuItem large>
						<a
							href="#"
							className={classNames(location.pathname == "/login" && "active")}
							onClick={username ? logOut.bind(this) : goToLogin.bind(this)}
						>
							{username ? `Logout ${username}` : "Login"}
						</a>
					</MenuItem>
				</Menu>
				<Content>

					<Switch>
						<Route
							path="/pages/:option/:pageName?"
							render={props => <Page pages={pages} username={username} {...props} />}
						/>
						<Route
							path="/login"
							render={() => <Login onLogIn={logIn.bind(this)} />}
						/>
						<Route path="/" render={() => <HomePage />}	/>
					</Switch>

				</Content>				
			</div>
		)
	}

}



App.displayName = "App"



App.propTypes = {
	history:  PropTypes.object,
	location: PropTypes.object,
}



export default withRouter(App)