import boot from 'sa/boot'
import api from './api'
import { populateStudent } from './setup'
import { replaceAPI } from 'sa/core/api'

export default async () => {
  await populateStudent()
  replaceAPI(api)
  return boot()
}
