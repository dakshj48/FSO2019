import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  let books = props.result.data.allBooks
  let genres = new Set()

  books.forEach(book => {
    book.genres.forEach(genre => {
      genres = genres.add(genre)
    })
  })

  genres = genres.add('all genres')

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          { 
            genre === "all genres" &&
              books.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
          )}
          {
            genre !== "all genres" &&
              books.filter(book => book.genres.includes(genre)).map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
          )}
        </tbody>
      </table>
      <div>
        {
          [...genres].map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)
        }
      </div>
    </div>
  )
}

export default Books
