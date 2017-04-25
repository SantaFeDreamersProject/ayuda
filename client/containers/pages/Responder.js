import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponderForm from 'client/containers/forms/Responder'
import { createResponder } from 'client/actions/responder'

class ResponderPage extends Component {

  render() {

    return (
      <div>
        <h2 className="text-center">New Responder</h2>
        <ResponderForm
          onSubmit={(responder) => this.props.createResponder(responder)}
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
  createResponder
})(ResponderPage)
