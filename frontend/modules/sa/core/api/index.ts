import axios from 'axios'
import { API } from 'sa/core/types'

const api = axios.create({
  baseURL: process.env.API_HOST || location.host,
})

const defaultAPI: API = [] as any

export default defaultAPI
