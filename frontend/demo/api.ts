import { values } from 'lodash'
import axios from 'axios'
import * as moment from 'moment'
import * as t from 'sa/core/types'
import db from './db'

const students: t.Student[] = values(db.students)

const mockAPI: t.API = {
  auth: {
    async refresh() {
      return Object.assign({}, db.users[0], {
        token: 'demo-token',
      })
    },

    async authenticate(username: string, password: string) {
      return Object.assign({}, db.users[0], {
        token: 'demo-token',
      })
    },

    deauthenticate() {
      return
    },
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
    },
  },

  assessments: {
    async get(id: number) {
      return db.assessments[id]
    },

    async fetch(limit?: number) {
      return values(db.assessments)
    },

    async fetchQuestions(id: number) {
      return values(db.questions).filter(q => q.assessment === id)
    },

    async fetchAnswers(id: number, student: number) {
      const questions = values(db.questions).filter(q => q.assessment === id)
      const answers = values(db.answers)
      return questions.map(q => answers.find(a =>
        a.question === q.id && a.student === student))
    },
  },

  answers: {
    async get(id: number) {
      return db.answers[id]
    },

    async fetch(limit?: number) {
      return values(db.answers)
    },
  },

  questions: {
    async get(id: number) {
      return db.questions[id]
    },

    async fetch(limit?: number) {
      return values(db.questions)
    },
  },

  announcements: {
    async get(id: number) {
      return db.announcements[id]
    },

    async fetch(limit?: number) {
      return values(db.announcements)
    },
  },

  users: {
    async get(id: number) {
      return db.users[id]
    },

    async fetch(limit?: number) {
      return values(db.users)
    },
  },

  happenings: {
    async get(id: number) {
      return db.happenings[id]
    },

    async fetch(limit?: number) {
      return values(db.happenings)
    },
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
        && g.student === student,
      )
    },

    async attemptAssessment(assessment: number, student: number) {
      const grading: t.Grading = values(db.gradings).find(g =>
           g.assessment === assessment
        && g.student === student,
      )!
      if (grading.status === 'unlocked') {
        grading.status = 'attempting'
        return true
      } else {
        throw new Error('Cannot attempt already attempted or locked assessment')
      }
    },

    async unlockAssessment(assessment: number, student: number) {
      const grading: t.Grading = values(db.gradings).find(g =>
           g.assessment === assessment
        && g.student === student,
      )!
      if (grading.status === 'locked') {
        grading.status = 'unlocked'
        return true
      } else {
        throw new Error('Cannot unlock already unlocked assessment')
      }
    },
  },
}

export default mockAPI
