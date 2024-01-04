import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/notes';

const getAll = async (signal) => {
  const { data } = await axios.get(baseUrl, { signal });
  return data;
};

const create = async (newObject) => {
  const { data } = await axios.post(baseUrl, newObject);
  return data;
};

const update = async (id, newObject) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, newObject);
  return data;
};

const noteService = { getAll, create, update };
export default noteService;
