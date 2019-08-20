import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogPost from './BlogPost'

test('name and author shown by default', () => {
  const blog = {
    title: 'test',
    author: 'dj',
    url: 'test.com/test',
    likes: 5,
    user: {
      username: 'djain',
      id: '123456'
    }
  }

  const blogs = [blog]

  const user = {
    username: 'djain',
    id: '123456'
  }

  const component = render(
    <BlogPost blog={blog} blogs={blogs} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'test dj'
  )

  const div = component.container.querySelector('.show')
  expect(div).toHaveStyle( 'display: none;' )

})

test('other details shown on click', () => {
  const blog = {
    title: 'test',
    author: 'dj',
    url: 'test.com/test',
    likes: 5,
    user: {
      username: 'djain',
      id: '123456'
    }
  }

  const blogs = [blog]

  const user = {
    username: 'djain',
    id: '123456'
  }

  const component = render(
    <BlogPost blog={blog} blogs={blogs} user={user} />
  )

  const button = component.container.querySelector('.toggle')
  fireEvent.click(button)

  const div = component.container.querySelector('.show')
  expect(div).not.toHaveStyle( 'display: none' )
})
