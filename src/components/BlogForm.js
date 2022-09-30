import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, setMessage }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const handleTitleChange = event => setNewTitle(event.target.value)

  const handleAuthorChange = event => setNewAuthor(event.target.value)

  const handleUrlChange = event => setNewUrl(event.target.value)

  const handleLikesChange = event => setNewLikes(event.target.value)

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
    setMessage('A new blog was added')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <form onSubmit={addBlog}>
      Title <input value={newTitle} onChange={handleTitleChange} id='title' />
      <br></br>
      Author <input value={newAuthor} onChange={handleAuthorChange} id='author' />
      <br></br>
      Url <input value={newUrl} onChange={handleUrlChange} id='url' />
      <br></br>
      Likes <input type="number" value={newLikes} onChange={handleLikesChange} id='likes' />
      <br></br>
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}


export default BlogForm