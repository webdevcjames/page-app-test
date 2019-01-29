import React from "react"
import PropTypes from "prop-types"

import classNames from "classnames"

import "./style.styl"



const Button = ({ children, colour, onClick }) => (
  <a
    href="#"
    className={classNames("button", colour)}
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
  >
    {children}
  </a>
)



Button.displayName = "Button"



Button.propTypes = {
  children: PropTypes.node,
  colour:   PropTypes.string,
  onClick:  PropTypes.func,
}



export default Button