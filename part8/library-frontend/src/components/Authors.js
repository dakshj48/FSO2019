import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [selected, setSelected] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors
  const options = []

  for (let i = 0; i < authors.length; i++) {
    options[i] = ({value: authors[i].name, label: authors[i].name})
  }

  const submit = async(e) => {
    e.preventDefault()
    const yearInt = Number(born)
   
    await props.editAuthor({
      variables: { name: selected.value, setBornTo: yearInt }
    })

    setSelected('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
            <div>
              name <Select value={selected} onChange={selection => setSelected(selection)} options={options}/>
            </div>
            <div>
              born <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
            </div>
            <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
