import axios from 'axios'

const baseUrl = 'https://recipeofhope.herokuapp.com'
const timeout = 600000
const headers = {}
const token = localStorage.getItem('token')

const options = { baseURL: baseUrl, timeout, headers }
if (token) {
  options.headers['Authorization'] = `Bearer ${token}`
  // options.headers['content-type'] = `multipart/form-data`
}

const commonAPI = axios.create(options)

export default commonAPI
