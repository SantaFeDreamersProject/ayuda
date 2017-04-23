import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ColumnProps } from 'client/constants/Layout'
import ResponseForm from 'client/containers/forms/Response'

const colProps = ColumnProps.General

class ResponsePage extends Component {
  render() {

    return (
      <div>
        <h2 className="text-center">Respond to Callout</h2>
        <ResponseForm
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
})(ResponsePage)
