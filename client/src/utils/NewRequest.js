import axios from "axios"

 const NewRequest = axios.create({
  baseURL: 'https://final-project-8nfy.onrender.com',
  // baseURL: 'http://localhost:3000',
  withCredentials: true
})

export default NewRequest
