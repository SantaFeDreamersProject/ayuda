import React, { Component } from 'react'

import { Table } from 'bootstrap'


function ResponderListItem({ item, onClick, onRemove }) {

  return (
    <tr>
      <td><a onClick={() => onClick(item)}>{item.Name}</a></td>
      <td>{item.Bilingual}</td>
      <td>{item.Location}</td>
      <td>{item.Phone}</td>
      <td><a onClick={() => onRemove(item)}>Remove</a></td>
    </tr>
  )
}

function ResponderListItemHeader() {

  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Bilingual</th>
        <th>Location</th>
        <th>Phone</th>
        <th/>
      </tr>
    </thead>
  )
}

export default function ResponderList({ items, onClick, onRemove }) {

  return (
    <div>
      <Table responsive striped condensed>
        <ResponderListItemHeader/>
        <tbody>
          {items.map(item => <ResponderListItem item={item} {...{onClick, onRemove}}/>)}
        </tbody>
      </Table>
    </div>
  )

}
