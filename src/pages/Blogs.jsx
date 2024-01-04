import { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import Notification from '../components/Notification';

const Blogs = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user));
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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : <ul>list of blogs</ul>}
    </div>
  );
};

export default Blogs;
