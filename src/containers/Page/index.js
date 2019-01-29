import React, { Component as Container } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

import Button from "../../components/Button"
import Field from "../../components/Field"

import isEmpty from "lodash/isEmpty"

import "./style.styl"



export class Page extends Container {

  constructor(props) {
    super(props)

    const { match = { params: { pageName: "" } }, pages = {} } = props

    this.state = {
      content: "",
      errors: {},
      name: "",
    }
  }



  componentDidUpdate(prevProps) {
    const { match: { params: { option } } } = this.props
    const { match: { params: { option: prevOption } } } = prevProps

    if ((option === "add") && (prevOption !== option))
      this.setState({ content: "", errors: {}, name: "" })
  }



  cancel() {
    const { history } = this.props
    
    this.setState({ content: "", errors: {}, name: "" })

    history.push("/")
  }



  finish() {
    const { history, match: { params: { pageName, option } } } = this.props
    const { content, name } = this.state

    let errors  = {}
    const pages = this.props.pages ? { ...this.props.pages } : {}

    if (option == "edit")
      delete pages[pageName]

    if (name.length == 0) {
      errors.name = "No page name provided!"
    } else if (Object.keys(pages).includes(name)) {
      errors.name = "Page already exists with this name!"
    }

    this.setState({ errors })

    if (isEmpty(errors)) {
      pages[name] = content

      localStorage.pages = JSON.stringify(pages)

      this.setState({ content: "", name: "" })

      history.push(`/pages/view/${name}`)
    }

  }



  remove() {
    const { history, match: { params: { pageName } } } = this.props

    const pages = this.props.pages ? { ...this.props.pages } : {}

    delete pages[pageName]
    localStorage.pages = JSON.stringify(pages)

    this.setState({ content: "", name: "" })

    history.push("/")
  }



  startEdit() {
    const { history, match: { params: { pageName } }, pages } = this.props

    this.setState({ name: pageName, content: pages[pageName] })

    history.push(`/pages/edit/${pageName}`)
  }



  updateValue(key, value) {
    this.setState({ [key]: value })
  }



  render() {
    const { match: { params: { option, pageName } }, pages, username } = this.props
    const { content, errors, name } = this.state
    const { cancel, finish, remove, startEdit, updateValue } = this

    return (
      <div className="page">
        <div className="page-header">
          {option == "view"
            ? <h1>{pageName}</h1>
            : (
              <Field
                error={errors.name}
                id="name"
                large
                onChange={updateValue.bind(this)}
                placeholder="Page Name"
                type="text"
                value={name}
              />
            )
          }
        </div>

        <div className="page-content">
          {option == "view"
            ? <p>{pages[pageName]}</p>
            : (
              <textarea
                onChange={e => this.setState({ content: e.target.value })}
                placeholder="Page Content"
                value={content}
              />
            )
          }
        </div>

        {username && ( option == "view"
          ? (
            <div className="page-controls">
              <Button colour="red" onClick={remove.bind(this)}>
                Remove
              </Button>
              <Button onClick={startEdit.bind(this)}>
                Edit
              </Button>
            </div>
          ) : (
            <div className="page-controls">
              <Button onClick={cancel.bind(this)}>
                Cancel
              </Button>
              <Button onClick={finish.bind(this)}>
                Finish
              </Button>
            </div>
          )
        )}
      </div>
    )
  }

}



Page.displayName = "Page"



Page.propTypes = {
  history:  PropTypes.object,
  match:    PropTypes.object,
  pages:    PropTypes.object,
  username: PropTypes.string
}



export default withRouter(Page)