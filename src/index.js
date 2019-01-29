import React from "react"
import ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"

import "./stylus/main.styl"

import App from "./containers/App"



ReactDOM.render((
	<MemoryRouter>
		<App />
	</MemoryRouter>
), document.getElementById("app"))