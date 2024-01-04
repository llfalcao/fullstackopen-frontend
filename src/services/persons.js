import axios from 'axios';
const baseUrl = 'https://lf-fso.herokuapp.com/api/persons';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
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

const remove = async (id) => await axios.delete(`${baseUrl}/${id}`);

const personService = { getAll, create, update, remove };
export default personService;
