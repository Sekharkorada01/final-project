import axios from "axios"

 const NewRequest = axios.create({
  // baseURL: 'https://Freelancepi.onrender.com',
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export default NewRequest
