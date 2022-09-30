/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(true)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const leave = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='New Blog'>
        <BlogForm createBlog={addBlog} setMessage={setMessage} />
      </Togglable>
    )
  }

  const addLike = id => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => { setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog)) })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        setError(true)
        setMessage(`Blog '${blog.title}' was already removed from server`)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  const remove = (id, token, blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      blogService
        .remove(id, token)
        .then(returnedBlog => setBlogs(blogs.filter(blog => blog.id !== id)))
        .catch(error => {
          console.log('error in remove: ', error)
          setError(true)
          setMessage('Ups something is not working')
        })
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} error={error} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={leave}>Log Out</button>
          <br></br>
          <br></br>
          <h2>Add a new blog:</h2>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} user={user} remove={remove} />)}
        </div>
      }
    </div>
  )
}

export default App
