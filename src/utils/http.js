import axios from 'axios'

const instance = axios.create({
  timeout: 8000
})

export default instance
