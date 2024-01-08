import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import Notification from '../components/Notification';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
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
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
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
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <p>{blog.author}</p>
                <p>{blog.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Blogs;
