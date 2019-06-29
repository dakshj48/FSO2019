import React, { useState } from 'react'

const Filter = (props) => (
  <div>
    filter shown with <input value={props.newTerm} onChange={props.handleTermChange}/>
  </div>
)

export default Filter
