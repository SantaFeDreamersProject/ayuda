import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button } from 'bootstrap'
import { reduxForm } from 'redux-form'
import FormInputRow from 'client/components/FormInputRow'

export const fields = [
  'name',
  'phoneNumber',
  'bilingual',
  'location'
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

  if (!values.canRespond) {
    errors.canRespond = 'Required'
  } else if ((values.canRespond !== "yes" && values.canRespond !== "no")) {
    errors.canRespond = 'Must be "yes" or "no"'
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

const ResponderForm = (props) => {

  const {
    fields: {
      name,
      phoneNumber,
      location,
      bilingual
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
      <FormInputRow label="Responder Name" fieldState={name} />
      <FormInputRow label="Phone Number" fieldState={phoneNumber} />
      <FormInputRow label="Bilingual" fieldState={bilingual} />
      <FormInputRow label="Location" fieldState={location} />
      
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

ResponderForm.defaultProps = {
  saveButtonText: 'Submit'
}

ResponderForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'callout',
  fields,
  validate
})(ResponderForm)
