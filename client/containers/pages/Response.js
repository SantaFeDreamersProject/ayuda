import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponseForm from 'client/containers/forms/Response'
import { createResponse } from 'client/actions/response-copy'
import { getCallout } from 'client/actions/callout'

class ResponsePage extends Component {
  render() {

    let { calloutId } = this.props.params

    const onSubmit =
      (response) =>
        this.props.createResponse({...response, CalloutId: calloutId})

    return (
      <div>
        <h2 className="text-center">Respond to Callout</h2>
        <ResponseForm
          onSubmit={onSubmit}
          submitting={false}
          />

      </div>
    )
  }

  componentDidMount() {
    this.props.getCallout(this.props.params.calloutId)
  }
}

const mapStateToProps = ({ callout }) => ({
  callout
})

export default connect(mapStateToProps, {
  getCallout,
  createResponse
})(ResponsePage)
