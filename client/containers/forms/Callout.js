import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button } from 'bootstrap'
import { reduxForm } from 'redux-form'
import FormInputRow from 'client/components/FormInputRow'

export const fields = [
  'name',
  'phoneNumber',
  'location',
  'details'
]

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 5) {
    errors.name = 'Must be more than 5 characters'
  }

  if (!values.location) {
    errors.location = 'Required'
  } else if (values.location.length < 5) {
    errors.location = 'Must be more than 5 characters'
  }

  if (!values.details) {
    errors.details = 'Required'
  } else if (values.details.length < 5) {
    errors.details = 'Must be more than 5 characters'
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  } else if (isNaN(Number(values.phoneNumber))) {
    errors.phoneNumber = 'Must be a number with no dashes'
  } else if (values.phoneNumber.length < 7) {
    errors.phoneNumber = 'Must be at least 7 digits'
  }

  return errors
}

const CalloutForm = (props) => {

  const {
    fields: {
      name,
      phoneNumber,
      location,
      details
    },
    colProps,
    handleSubmit,
    resetForm,
    onSubmit,
    submitting,
    saveButtonText
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <FormInputRow label="Client Name" fieldState={name} />
      <FormInputRow label="Phone Number" fieldState={phoneNumber} />
      <FormInputRow label="Location" fieldState={location} />
      <FormInputRow label="Details" fieldState={details} />

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
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'callout',
  fields,
  validate
})(CalloutForm)
