import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button } from 'bootstrap'
import { Field, reduxForm } from 'redux-form'
import FormInputRow from 'client/components/FormInputRow'

const validate = values => {
  const errors = {}

  if (!values.Name) {
    errors.Name = 'Required'
  } else if (values.Name.length < 5) {
    errors.Name = 'Must be more than 5 characters'
  }

  if (!values.Location) {
    errors.Location = 'Required'
  } else if (values.Location.length < 5) {
    errors.Location = 'Must be more than 5 characters'
  }

  if (!values.Details) {
    errors.Details = 'Required'
  } else if (values.Details.length < 5) {
    errors.Details = 'Must be more than 5 characters'
  }

  if (!values.Phone) {
    errors.Phone = 'Required'
  } else if (isNaN(Number(values.Phone))) {
    errors.Phone = 'Must be a number with no dashes'
  } else if (values.Phone.length !== 10) {
    errors.Phone = 'Must be a 10 digit number'
  }

  return errors
}

const CalloutForm = (props) => {

  const {
    colProps,
    handleSubmit,
    resetForm,
    submitting,
    saveButtonText
  } = props

  return (
    <form onSubmit={handleSubmit}>

      <Field name="Name" type="text" component={FormInputRow} label="Client Name"/>
      <Field name="Phone" type="text" component={FormInputRow} label="Phone Number"/>
      <Field name="Location" type="text" component={FormInputRow} label="Location"/>
      <Field name="Details" type="text" component={FormInputRow} label="Details"/>

      <Row>
        <Col {...colProps} className="text-center">
          <Button type="submit"
            className="button-action button-blue">{saveButtonText}<span className="fa fa-arrow-right pull-right"/>
          </Button>
        </Col>
      </Row>
    </form>
  )

}

CalloutForm.defaultProps = {
  saveButtonText: 'Submit'
}

CalloutForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'callout',
  validate
})(CalloutForm)
