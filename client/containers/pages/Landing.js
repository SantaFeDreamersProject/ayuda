import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Panel } from 'bootstrap'
import { Link } from 'react-router'

import { ColumnProps } from 'client/constants/Layout'

class LandingPage extends Component {

  render() {
    return (
      <div className="page-landing">

        <Row>
          <Col {...ColumnProps.General}>

            <Panel>
              <h2>Rapid Response Network</h2>

              <Button onClick={() => { window.location.href = "/callout/new"}}
                className="button-action button-blue">Submit Callout<span className="fa fa-arrow-right pull-right"/>
              </Button>
              <br/>
              <Button onClick={() => { window.location.href = "/responders"}}
                className="button-action button-blue">Responder List<span className="fa fa-arrow-right pull-right"/>
              </Button>
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }

}

export default connect(null, {})(LandingPage)
