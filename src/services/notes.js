import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/notes';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (signal) => {
  const { data } = await axios.get(baseUrl, { signal });
  return data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.post(baseUrl, newObject, config);
  return data;
};

const update = async (id, newObject) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, newObject);
  return data;
};

const noteService = { getAll, create, update, setToken };
export default noteService;
