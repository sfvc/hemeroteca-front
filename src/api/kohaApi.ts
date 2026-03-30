import axios from 'axios'

const KohaApi = axios.create({
  baseURL: `${import.meta.env.VITE_HEMEROTECA}`,
  headers:{
    'Content-Type': 'application/json'
  },
  withCredentials:false
})

export default KohaApi
