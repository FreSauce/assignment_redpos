import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const fetchUsers = () => {
  return axios
    .get(`${url}/users`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const fetchUser = (id) => {
  return axios
    .get(`${url}/users/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const createUser = (user) => {
  return axios
    .post(`${url}/users`, user)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const updateUser = (id, user) => {
  return axios
    .put(`${url}/users/${id}`, user)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteUser = (id) => {
  return axios
    .delete(`${url}/users/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const mailToEmail = (data, mailId) => {
  return axios
    .post(`${url}/users/mail`, {
      data,
      mailId,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  mailToEmail,
};
