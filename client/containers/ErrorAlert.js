import React from 'react'
import { connect } from 'react-redux'
import { Col, Row, Alert } from 'bootstrap'

function ErrorAlert({ error }) {

  if (!error) return <span/>

  return (
    <div>
      <Row>
        <Col lg="12">
          <Alert bsStyle="danger">{"Oops a problem occurred! The last action did not complete successfully."}</Alert>
        </Col>
      </Row>
    </div>
  )
}


const mapStateToProps = ({ error }) => ({error})

export default connect(mapStateToProps, {})(ErrorAlert)
