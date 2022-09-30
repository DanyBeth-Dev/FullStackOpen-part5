import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    title: 'Blog title',
    author: 'Some Author',
    url: 'www.example.com',
    likes: 1000
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Blog title')
  expect(div).toHaveTextContent('Some Author')

  const elementUrl = screen.queryByText('www.example.com')
  expect(elementUrl).toBeNull()
  const elementLikes = screen.queryByText('1000')
  expect(elementLikes).toBeNull()
})

test('url and likes are shown when button "View" is clicked', async () => {
  const user = {
    name: 'Phil',
    token: 1212
  }

  const blog = {
    title: 'Blog title',
    author: 'Some Author',
    url: 'www.example.com',
    likes: 1000,
    id: 1,
    user: {
      username: 'Phil'
    }
  }

  render(<Blog blog={blog} user={user} />)

  const client = userEvent.setup()
  const button = screen.getByText('View')
  await client.click(button)

  const elementUrl = await screen.findByText('www.example.com')
  expect(elementUrl).toBeDefined()
  const elementLikes = await screen.findByText('1000')
  expect(elementLikes).toBeDefined()
})

test('if like button is clicked twice, event handler the component received as props is called twice', async () => {
  const user = {
    name: 'Phil',
    token: 1212
  }

  const blog = {
    title: 'Blog title',
    author: 'Some Author',
    url: 'www.example.com',
    likes: 1000,
    id: 1,
    user: {
      username: 'Phil'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} addLike={mockHandler} />)

  const client = userEvent.setup()

  const buttonView = screen.getByText('View')
  await client.click(buttonView)

  const buttonLike = await screen.findByText('Like')
  await client.dblClick(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})