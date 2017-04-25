import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponderList from 'client/components/ResponderList'
import { getResponders } from 'client/actions/responder'

class ResponderPage extends Component {

  render() {

    return (
      <div>
        <h2 className="text-center">Responders</h2>
        <ResponderList
          items={this.props.responders} onClick={() => {}} onRemove={() => {}}/>
        <a href="/responder/new">Add new responder</a>
      </div>
    )
  }

  componentDidMount() {
    this.props.getResponders()
  }

}

const mapStateToProps = ({ responders }) => ({responders})

export default connect(mapStateToProps, {
  getResponders
})(ResponderPage)
