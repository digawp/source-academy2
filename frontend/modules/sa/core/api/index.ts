import axios from 'axios'
import { API } from 'sa/core/types'

const api = axios.create({
  baseURL: process.env.API_HOST || location.host,
})

export const replaceAPI = (newAPI: API) =>
  Object.assign(defaultAPI, newAPI)

// tslint:disable-next-line
const defaultAPI: API = ({} as any)

export default defaultAPI
