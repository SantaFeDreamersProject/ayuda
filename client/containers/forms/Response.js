import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button } from 'bootstrap'
import { reduxForm } from 'redux-form'
import FormInputRow from 'client/components/FormInputRow'

export const fields = [
  'name',
  'canRespond',
  'ETA'
]

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 5) {
    errors.name = 'Must be more than 5 characters'
  }

  if (!values.canRespond) {
    errors.canRespond = 'Required'
  } else if ((values.canRespond !== "yes" && values.canRespond !== "no")) {
    errors.canRespond = 'Must be "yes" or "no"'
  }

  if (!values.ETA) {
    errors.ETA = 'Required'
  }

  return errors
}

const ResponseForm = (props) => {

  const {
    fields: {
      name,
      canRespond,
      ETA
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
      <FormInputRow label="Name" fieldState={name} />
      <FormInputRow label="Can Respond" fieldState={canRespond} />
      <FormInputRow label="ETA" fieldState={ETA} />

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

ResponseForm.defaultProps = {
  saveButtonText: 'Submit'
}

ResponseForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'callout',
  fields,
  validate
})(ResponseForm)
