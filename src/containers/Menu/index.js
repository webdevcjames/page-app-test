import React from "react"
import PropTypes from "prop-types"

import "./style.styl"



const Menu = ({ children }) => (
  <div className="menu-container">
    <div className="menu-header">
      <h2>Menu</h2>
    </div>
    <ul className="menu">
      {children}
    </ul>
  </div>
)



Menu.displayName = "Menu"



Menu.propTypes = {
  children: PropTypes.node,
}



export default Menu