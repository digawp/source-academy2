import axios from 'axios'
import * as t from 'sa/core/types'
import boot from 'sa/boot'

export type DB = {
  user: { [id: string]: t.IUser }
  announcement: { [id: string]: t.IAnnouncement }
  student: { [id: string]: t.IStudent }
  assessment: { [id: string]: t.IAssessment }
}

const db: DB = {
  "user": {
    "0": {
      "id": 0,
      "role": "student",
      "firstName": "Evan",
      "lastName": "Sebastian",
      "profilePicture": "https://randomuser.me/api/portraits/men/83.jpg"
    },
    "1": {
      "id": 1,
      "role": "admin",
      "firstName": "Martin",
      "lastName": "Henz",
      "profilePicture": "https://randomuser.me/api/portraits/men/84.jpg"
    },
    "2": {
      "id": 2,
      "role": "staff",
      "firstName": "Thenaesh",
      "lastName": "Elango",
      "profilePicture": "https://randomuser.me/api/portraits/men/85.jpg"
    }
  },

  "announcement": {
    "0": {
      "id": 0,
      "poster": 1,
      "published": true,
      "pinned": true,
      "updatedAt": 1494674929,
      "pinExpiry": 1498908494,
      "title": "Welcome to the Academy",
      "content": ""
    },
    "1": {
      "id": 1,
      "poster": 2,
      "published": true,
      "pinned": true,
      "updatedAt": 1494674929,
      "pinExpiry": 1498908494,
      "title": "Mission 1 is now Available!",
      "content": ""
    },
    "2": {
      "id": 2,
      "poster": 2,
      "published": true,
      "pinned": false,
      "updatedAt": 1494674929,
      "pinExpiry": 1498908494,
      "title": "Reporting Registration Issues",
      "content": ""
    }
  },

  "student": {
    "0": {
      "id": 0,
      "user": 0,
      "level": 1,
      "experiencePoint": 0
    }
  },

  "assessment": {
    "0": {
      "id": 0,
      "type": "mission",
      "order": "1",
      "published": true,
      "title": "Understanding the Source",
      "description": "Every year, the Source Academy holds a trial for worthy candidates to be trained in the Way of the Source. This will be their first step on a lifelong journey of bringing peace and justice to the galaxy. After years of anticipation, it is finally your turn. The instructors will give you some basic training before you are tested with a set of challenges. If you pass these challenges, you will be initiated into the Academy.",
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1494676017,
      "dueAt": 1530444494
    },
    "1": {
      "id": 1,
      "type": "mission",
      "order": "2",
      "title": "???",
      "description": "Continue the game to unlock this sidequest.",
      "published": false,
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1530444494,
      "dueAt": 1530444494
    },
    "2": {
      "id": 2,
      "type": "sidequest",
      "order": "1",
      "published": true,
      "title": "An Extra Challenge",
      "description": "Hartin Menz opens this challenge for all new cadets.",
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1494676017,
      "dueAt": 1530444494
    },
    "3": {
      "id": 3,
      "type": "sidequest",
      "order": "2.1",
      "title": "???",
      "description": "Continue the game to unlock this sidequest.",
      "published": false,
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1530444494,
      "dueAt": 1530444494
    },
    "4": {
      "id": 4,
      "type": "sidequest",
      "order": "2.2",
      "title": "???",
      "description": "Continue the game to unlock this one.",
      "published": false,
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1530444494,
      "dueAt": 1530444494
    },
    "5": {
      "id": 5,
      "type": "path",
      "order": "1A",
      "title": "Lecture 1A Review",
      "description": "These questions should help you revise the lecture material",
      "published": true,
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1494676017,
      "dueAt": 1530444494
    }
  }
}

// Populate Student with Names
const populateStudent = async () => {
  const result = await axios.get('https://randomuser.me/api/?results=80')
  const users = result.data.results

  for (let counter = 3; counter < 83; counter++) {
    const user = users[counter - 3]

    db.user[counter.toString()] = {
      id: counter,
      role: "student",
      firstName: user.name.first,
      lastName: user.name.last,
      profilePicture: user.picture.large
    }

    db.student[(counter - 2).toString()] = {
      id: counter - 2,
      user: counter,
      level: 1,
      experiencePoint: 0
    }
  }
}

const resourcesOfKey = <T>(key: string) => {
  const anyDB = db as any
  const resources: T[] = []
  const o = anyDB[key]

  for (let k of Object.keys(o)) {
    if (o.hasOwnProperty(k)) {
      resources.push(o[k])
    }
  }

  return resources
}

const students: t.IStudent[] = resourcesOfKey<t.IStudent>('student')

const mockAPI: t.API = {
  auth: {
    async refresh() {
      return Object.assign({}, db.user["0"], {
        token: "demo-token"
      })
    },

    async authenticate(username: string, password: string) {
      return Object.assign({}, db.user["0"], {
        token: "demo-token"
      })
    },

    deauthenticate() {
      return
    }
  },

  student: {
    async fetch(limit?: number) {
      return students
    },
    async get(id: number) {
      return db.student[id + '']
    },
    async getByUser(id: number) {
      return students.find(s => (s.user === id))
    }
  },

  assessment: {
    get(id: number) {
      return Promise.resolve(db.assessment[id + ''])
    },

    fetch(limit?: number) {
      return Promise.resolve(resourcesOfKey<t.IAssessment>('assessment'))
    }
  }
}

export default async () => {
  await populateStudent()
  return boot(mockAPI)
}