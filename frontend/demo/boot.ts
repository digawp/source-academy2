import { capitalize, values } from 'lodash'
import axios from 'axios'
import * as moment from 'moment'
import * as t from 'sa/core/types'
import boot from 'sa/boot'
import db from './db'

// Populate Student with Names
const populateStudent = async () => {
  const result = await axios.get('https://randomuser.me/api/?results=80')
  const users = result.data.results

  for (let counter = 3; counter < 83; counter++) {
    const user = users[counter - 3]

    db.users[counter.toString()] = {
      id: counter,
      role: "student",
      firstName: capitalize(user.name.first),
      lastName: capitalize(user.name.last),
      profilePicture: user.picture.large
    }

    db.students[(counter - 2).toString()] = {
      id: counter - 2,
      user: counter,
      level: 1,
      experiencePoint: 0
    }
  }

  db.students[3].level = 2
  db.students[4].level = 2
  db.students[5].level = 2
}

const students: t.Student[] = values(db.students) 

const mockAPI: t.API = {
  auth: {
    async refresh() {
      return Object.assign({}, db.users[0], {
        token: "demo-token"
      })
    },

    async authenticate(username: string, password: string) {
      return Object.assign({}, db.users[0], {
        token: "demo-token"
      })
    },

    deauthenticate() {
      return
    }
  },

  students: {
    async fetch(limit?: number) {
      return students
    },
    async get(id: number) {
      return db.students[id]
    },
    async getByUser(id: number) {
      return students.find(s => (s.user === id))
    }
  },

  assessments: {
    async get(id: number) {
      return db.assessments[id]
    },

    async fetch(limit?: number) {
      return values(db.assessments)
    }
  },

  announcements: {
    async get(id: number) {
      return db.announcements[id]
    },

    async fetch(limit?: number) {
      return values(db.announcements) 
    }
  },

  users: {
    async get(id: number) {
      return db.users[id]
    },

    async fetch(limit?: number) {
      return values(db.users)
    }
  },

  happenings: {
    async get(id: number) {
      return db.happenings[id]
    },

    async fetch(limit?: number) {
      return values(db.happenings) 
    }
  },

  gradings: {
    async get(id: number) {
      return db.gradings[id]
    },

    async fetch(limit?: number) {
      return values(db.gradings) 
    },

    async getByAssessment(assessment: number, student: number) {
      return values(db.gradings).find(g =>
           g.assessment === assessment
        && g.student === student
      )
    },

    async attemptAssessment(assessment: number, student: number) {
      const grading: t.Grading = values(db.gradings).find(g =>
           g.assessment === assessment
        && g.student === student
      )!
      if (grading.status === "unlocked") {
        grading.status = "attempting"
        return true
      } else {
        throw new Error("Cannot attempt already attempted or locked assessment")
      }
    },

    async unlockAssessment(assessment: number, student: number) {
      const grading: t.Grading = values(db.gradings).find(g =>
           g.assessment === assessment
        && g.student === student
      )!
      if (grading.status === "locked") {
        grading.status = "unlocked"
        return true
      } else {
        throw new Error("Cannot unlock already unlocked assessment")
      }
    }
  }
}

export default async () => {
  await populateStudent()
  return boot(mockAPI)
}