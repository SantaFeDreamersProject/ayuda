import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'

import { ColumnProps } from 'client/constants/Layout'

class LandingPage extends Component {

  render() {
    return (
      <div className="page-landing">

        <Row>
          <Col {...ColumnProps.General}>

            Blah

          </Col>
        </Row>
      </div>
    )
  }

}

export default connect(null, {})(LandingPage)
