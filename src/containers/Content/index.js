import React from "react"
import PropTypes from "prop-types"

import "./style.styl"



const Content = ({ children }) => (
  <div className="content-container">
    {children}
  </div>
)



Content.displayName = "Content"



Content.propTypes = {
  children: PropTypes.node,
}



export default Content