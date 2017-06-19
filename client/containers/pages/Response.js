import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponseForm from 'client/containers/forms/Response'
import { createResponse } from 'client/actions/response-copy'
import { getCallout } from 'client/actions/callout'
import { Row, Col, Input, Button } from 'bootstrap'
import { ColumnProps } from 'client/constants/Layout'

class ResponsePage extends Component {
  render() {

    let { calloutId } = this.props.params
    let { callout, createResponse, isSubmitted, isResponding } = this.props;

    const onSubmit =
      (response) =>
        createResponse({...response, CalloutId: calloutId})

    let calloutInfoNode;

    if (callout) {
      calloutInfoNode = (
        <Row>
          <Col {...ColumnProps.General} className="pull-left">
            <h2 className="text-center">Details of situation</h2>
            <strong>Name of client:</strong>
            <br/>
             {callout.Name}
            <br/>
            <strong>Location:</strong>
            <br/>
            {callout.Location}
            <br/>
            <strong>Details:</strong>
            <br/>
            {callout.Details}
            <br/>
            {isSubmitted && isResponding && <div><strong>Phone:</strong> {callout.Phone} <br/></div>}
          </Col>
        </Row>
      )
    }

    if (isSubmitted) {
      return (
        <div>
          {calloutInfoNode}
          <Row>
            <Col className="text-center">
              <h1>Thank you for your submission</h1>
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <div>

        {calloutInfoNode}

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

//

const mapStateToProps = ({ callout, responseSubmissions }) => {
  let isSubmitted = callout && responseSubmissions[callout.CalloutId]
  return {
    callout,
    isSubmitted,
    isResponding: isSubmitted && responseSubmissions[callout.CalloutId].CanRespond === 'yes'
  }
}

export default connect(mapStateToProps, {
  getCallout,
  createResponse
})(ResponsePage)
