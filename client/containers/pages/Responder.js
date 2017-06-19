import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponderForm from 'client/containers/forms/Responder'
import { createResponder } from 'client/actions/responder'

class ResponderPage extends Component {

  render() {

    let { responderSubmitted } = this.props;

    if (responderSubmitted) {
      return (
        <div>
          <h1 className="text-center">Responder Created.</h1>
          <a href="/responders">OK</a>
        </div>
      )
    }

    return (
      <div>
        <h2 className="text-center">New Responder</h2>
        <ResponderForm
          onSubmit={(responder) => {
            delete responder.Agree
            this.props.createResponder(responder)
          }}
          submitting={false}
          />

      </div>
    )
  }

}

const mapStateToProps = ({ responderSubmitted }) => ({responderSubmitted})

export default connect(mapStateToProps, {
  createResponder
})(ResponderPage)
