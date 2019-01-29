import React from "react"
import PropTypes from "prop-types"

import classNames from "classnames"

import "./style.styl"



const Field = ({
  error, id, label, large, onChange, onKeyDown, placeholder, type, value
}) => (
  <div className="field-container">
    {label && <label htmlFor={id}>{label}</label>}
  
    <div className="field">
      <input
        type={type}
        id={id}
        className={classNames({ large })}
        placeholder={placeholder}
        onChange={e => onChange(id, e.target.value)}
        onKeyDown={e => onKeyDown && onKeyDown(e)}
        value={value}
      />

      {error && <label htmlFor={id} className="error">{error}</label>}
    </div>
  </div>
)



Field.displayName = "Field"



Field.defaultProps = {
  type: "text",
}



Field.propTypes = {
  error:       PropTypes.string,
  id:          PropTypes.string.isRequired,
  label:       PropTypes.string,
  large:       PropTypes.bool,
  onChange:    PropTypes.func,
  onKeyDown:   PropTypes.func,
  placeholder: PropTypes.string,
  type:        PropTypes.oneOf(["text", "password"]),
  value:       PropTypes.string,
}



export default Field