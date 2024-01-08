import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import Notification from '../components/Notification';
import BlogForm from '../components/blogs/BlogForm';
import Blog from '../components/blogs/Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    blogService.getAll(controller.signal).then((data) => setBlogs(data));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const updateBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification({ content: 'Wrong username or password', error: true });
      setTimeout(() => setNotification({}), 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <legend>Login</legend>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const handleLogout = () => {
    blogService.setToken(null);
    setUser(null);
    localStorage.removeItem('loggedBlogAppUser');
  };

  const sendNotification = (content) => {
    setNotification(content);
    setTimeout(() => setNotification({}), 5000);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification {...notification} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
          <BlogForm
            updateBlogs={updateBlogs}
            sendNotification={sendNotification}
          />
          <ul>
            {blogs.map((blog) => (
              <Blog blog={blog} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Blogs;
