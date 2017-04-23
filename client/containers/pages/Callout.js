import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ColumnProps } from 'client/constants/Layout'
import CalloutForm from 'client/containers/forms/Callout'

const colProps = ColumnProps.General

class CalloutPage extends Component {
  render() {

    return (
      <div>
        <h2 className="text-center">Initiate Callout</h2>
        <CalloutForm
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
})(CalloutPage)
