import React from "react"
import PropTypes from "prop-types"

import classNames from "classnames"

import "./style.styl"



const MenuItem = ({ children, large }) => (
  <li className={classNames({ "menu-item": true , large })}>
    {children}
  </li>
)



MenuItem.displayName = "MenuItem"



MenuItem.propTypes = {
  children: PropTypes.node,
  large:    PropTypes.bool,
}



export default MenuItem