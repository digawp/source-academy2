import { capitalize } from 'lodash'
import axios from 'axios'
import db from './db'

// Populate Student with Names
export const populateStudent = async () => {
  const result = await axios.get('https://randomuser.me/api/?results=80')
  const users = result.data.results

  for (let counter = 3; counter < 83; counter++) {
    const user = users[counter - 3]

    db.users[counter.toString()] = {
      id: counter,
      role: 'student',
      firstName: capitalize(user.name.first),
      lastName: capitalize(user.name.last),
      profilePicture: user.picture.large,
    }

    db.students[(counter - 2).toString()] = {
      id: counter - 2,
      user: counter,
      level: 1,
      experiencePoint: 0,
    }
  }

  db.students[3].level = 2
  db.students[4].level = 2
  db.students[5].level = 2
}
