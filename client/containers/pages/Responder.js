import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ColumnProps } from 'client/constants/Layout'
import ResponderForm from 'client/containers/forms/Responder'

const colProps = ColumnProps.General

class ResponderPage extends Component {
  render() {

    return (
      <div>
        <h2 className="text-center">New Responder</h2>
        <ResponderForm
          onSubmit={() => {}}
          submitting={false}
          />

      </div>
    )
  }
}

const mapStateToProps = state => {

  //TODO..
  return {}

}
export default connect(mapStateToProps, {
  // someAction,
  // TODO...actions
})(ResponderPage)
