import React from 'react'
import { toFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = event => {
    props.toFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(null, { toFilter })(Filter)
export default ConnectedFilter
