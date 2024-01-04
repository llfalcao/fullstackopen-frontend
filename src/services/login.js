import axios from 'axios';
const baseUrl = 'http://localhost:8080';

const login = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/api/login`, credentials);
  return data;
};

const loginService = { login };
export default loginService;
