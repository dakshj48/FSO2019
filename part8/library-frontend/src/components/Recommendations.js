import React from 'react'

const Recommendations = (props) => {
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks
  const favGenre = props.me.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre {favGenre}
      </div>
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
            books.filter(book => book.genres.includes(favGenre)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
