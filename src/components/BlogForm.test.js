import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('when a new blog is created, the form calls the event handler it received as props with the right details', async () => {
  const createBlog = jest.fn()
  const setMessage = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} setMessage={setMessage} />)

  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const likes = container.querySelector('#likes')
  const sendButton = screen.getByText('Create')

  await user.type(title, 'Title of the blog')
  await user.type(author, 'Author')
  await user.type(url, 'www.example.com')
  await user.type(likes, '1000')
  await user.click(sendButton)


  expect(createBlog.mock.calls[0][0].title).toBe('Title of the blog')
})