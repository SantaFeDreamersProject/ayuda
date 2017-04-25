import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalloutForm from 'client/containers/forms/Callout'
import { createCallout } from 'client/actions/callout'

class CalloutPage extends Component {
  render() {

    return (
      <div>
        <h2 className="text-center">Initiate Callout</h2>
        <CalloutForm
          onSubmit={(callout) => this.props.createCallout(callout)}
          submitting={false}
          />

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, {
  createCallout
})(CalloutPage)
