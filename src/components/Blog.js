import { useState } from 'react'

const Blog = ({ blog, addLike, user, remove }) => {
  const [visible, setVisible] = useState(false)
  const borderLine = {
    border: 'solid',
    margin: '10px'
  }

  if (visible) {
    return (
      <div style={borderLine} className='togglableContent'>
        <p>{blog.title} {blog.author} <button onClick={() => setVisible(false)}>Hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => addLike(blog.id)}>Like</button></p>
        <p>{blog.user.name}</p>
        {user.name === blog.user.name ? <button onClick={() => remove(blog.id, user.token, blog)}>Remove</button> : null}
      </div>
    )
  } else {
    return (
      <div style={borderLine} className='blog'>
        {blog.title} {blog.author}<button onClick={() => setVisible(true)}>View</button>
      </div>
    )
  }
}

export default Blog