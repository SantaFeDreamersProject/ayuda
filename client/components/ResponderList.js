import React, { Component } from 'react'

import { Col, Row } from 'bootstrap'


function ResponderListItem({ item, onClick, onRemove }) {

  return (
    <Row>
      <Col lg="3"><a onClick={() => onClick(item)}>{item.Name}</a></Col>
      <Col lg="1">{item.Bilingual}</Col>
      <Col lg="3">{item.Location}</Col>
      <Col lg="2">{item.Phone}</Col>
      <Col lg="1"><a onClick={() => onRemove(item)}>Remove</a></Col>
    </Row>
  )
}

function ResponderListItemHeader() {

  return (
    <Row>
      <Col lg="3">Name</Col>
      <Col lg="1">Bilingual</Col>
      <Col lg="3">Location</Col>
      <Col lg="2">Phone</Col>
    </Row>
  )
}

export default function ResponderList({ items, onClick, onRemove }) {

  return (
    <div>
      <ResponderListItemHeader/>
      {items.map(item => <ResponderListItem item={item} {...{onClick, onRemove}}/>)}
    </div>
  )

}
