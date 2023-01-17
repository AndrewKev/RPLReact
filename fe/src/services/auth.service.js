import axios from 'axios'

const API_URL = 'http://localhost:5000/auth/'
const API_LOGOUT = 'http://localhost:5000/logout/:'

const register = (username, password) => {
  return axios.post(API_URL + 'register', {username, password})
}

const login = (username, password) => {
  // axios.defaults.withCredentials = true
  return axios.post(API_URL + 'login', {username, password})
}

const logout = (username) => {
  return axios.delete(API_LOGOUT + 'username', {username})
}

const AuthService = {
  register,
  login,
  logout
}

export default AuthService