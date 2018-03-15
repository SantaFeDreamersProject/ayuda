import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponderList from 'client/components/ResponderList'
import {
  getResponders,
  removeResponder
} from 'client/actions/responder'
import { Row, Col, Button, Panel } from 'bootstrap'
import { ColumnProps } from 'client/constants/Layout'

class RespondersPage extends Component {

  render() {

    return (
      <div>
        <Row>
          <Col {...ColumnProps.OneHundred}>
            <h2 className="text-center">Responders</h2>
            <ResponderList
              items={this.props.responders}
              onClick={() => {}}
              onRemove={(responder) => this.props.removeResponder(responder.ResponderId)}/>
          </Col>
        </Row>
        <Row>
          <Col {...ColumnProps.General}>
            <Button onClick={() => { window.location.href = "/responder/new"}}
              className="button-action button-blue">Add Responder<span className="fa fa-arrow-right pull-right"/>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount() {
    this.props.getResponders()
  }

}

const mapStateToProps = ({ responders }) => ({responders})

export default connect(mapStateToProps, {
  getResponders,
  removeResponder
})(RespondersPage)
