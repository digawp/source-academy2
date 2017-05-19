import boot from 'sa/boot'
import { populateStudent } from './setup'

export default async () => {
  await populateStudent()
  return boot()
}
