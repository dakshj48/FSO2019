import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(0)

    expect(component.container).toHaveTextContent(
      'log in to application', 'username', 'password'
    )

    expect(component.container).not.toHaveTextContent(
      'title1'
    )
  })

  test('if user logged in, blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1234',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'title1', 'title2', 'title3'
    )
  })
})
