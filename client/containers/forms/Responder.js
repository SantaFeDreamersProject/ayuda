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

  if (!values.CanRespond) {
    errors.CanRespond = 'Required'
  } else if ((values.CanRespond !== "yes" && values.CanRespond !== "no")) {
    errors.CanRespond = 'Must be "yes" or "no"'
  }

  if (!values.Phone) {
    errors.Phone = 'Required'
  } else if (isNaN(Number(values.Phone))) {
    errors.Phone = 'Must be a number with no dashes'
  } else if (values.Phone.length !== 10) {
    errors.Phone = 'Must be a 10 digit number'
  }

  if (!values.Agree) {
    errors.Agree = 'Required'
  }

  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
 <div>
   <label>{label}</label>
   <div>
     <input {...input} placeholder={label} type={type}/>
     {touched && ((error && <span>{error}</span>))}
   </div>
 </div>
)

const ResponderForm = (props) => {

  const {
    colProps,
    resetForm,
    handleSubmit,
    submitting,
    saveButtonText
  } = props

  return (

    <form onSubmit={handleSubmit}>
      <Field name="Name" type="text" component={FormInputRow} label="Responder Name"/>
      <Field name="Phone" type="text" component={FormInputRow} label="Phone Number"/>
      <Field name="Bilingual" type="text" component={FormInputRow} label="Bilingual?"/>
      <Field name="Location" type="text" component={FormInputRow} label="Location"/>
      <Row>
        <Col {...colProps}>
          <p>
            By providing my information confidentially to this site for internal use at Santa Fe Dreamers and Somos Un Pueblo Unido, I understand that I assume any risk associated with my involvement in this service, and/or my actions. I hereby hold harmless all persons and agencies involved in organizing and coordinating this service from any potential liability for my involvement and/or my actions.
          </p>
          <Field
            name="Agree"
            type="checkbox"
            component={FormInputRow}
            label="Agree" />
        </Col>
      </Row>
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
  form: 'responder',
  validate
})(ResponderForm)
