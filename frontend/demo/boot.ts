import { capitalize } from 'lodash'
import axios from 'axios'
import * as moment from 'moment'
import * as t from 'sa/core/types'
import boot from 'sa/boot'

export type DB = {
  user: { [id: string]: t.IUser }
  announcement: { [id: string]: t.IAnnouncement }
  student: { [id: string]: t.IStudent }
  assessment: { [id: string]: t.IAssessment }
  happening: { [id: string]: t.IHappening }
}

const TODAY = moment().startOf('day')
const DAYS_AGO = (n: number) => TODAY.clone().subtract(n, 'day').clone()
const YESTERDAY = DAYS_AGO(1).clone() 

const db: DB = {
  "user": {
    0: {
      "id": 0,
      "role": "student",
      "firstName": "Evan",
      "lastName": "Sebastian",
      "profilePicture": "https://randomuser.me/api/portraits/men/83.jpg"
    },
    1: {
      "id": 1,
      "role": "admin",
      "firstName": "Martin",
      "lastName": "Henz",
      "profilePicture": "https://randomuser.me/api/portraits/men/84.jpg"
    },
    2: {
      "id": 2,
      "role": "staff",
      "firstName": "Thenaesh",
      "lastName": "Elango",
      "profilePicture": "https://randomuser.me/api/portraits/men/85.jpg"
    }
  },

  "announcement": {
    0: {
      "id": 0,
      "poster": 1,
      "published": true,
      "pinned": true,
      "updatedAt": 1494674929000,
      "pinExpiry": 1498908494000,
      "title": "Welcome to the Academy",
      "content": `
        <h6>Thank You for Trying the Demo</h6>
        <p>Hope you enjoyed it In case you are wondering, this site is built using these technologies:</p>
        <ol>
          <li><b>Language:</b>  TypeScript with Babel</li>
          <li><b>Framework:</b> React, Redux, Redux-Saga, BlueprintJS</li>
          <li><b>Build System:</b> Webpack</li>
          <li><b>API Backend:</b> Phoenix</li>
        </ol>
        <br />
        <p>This site is <a target="_blank" href="https://github.com/evansb/source-academy2">open source</a>, feel free to drop a new issue if for any feedback or suggestions.</p>
        <small></small>
      `
    },
    1: {
      "id": 1,
      "poster": 2,
      "published": true,
      "pinned": true,
      "updatedAt": 1494674929000,
      "pinExpiry": 1498908494000,
      "title": "Mission 1 is now Available!",
      "content": `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis dapibus arcu et semper. Nunc id cursus odio. Donec vulputate ex nisi, rutrum dictum risus pellentesque non. Maecenas nisi massa, feugiat nec massa sed, varius vehicula ligula. Quisque vitae dignissim neque, a semper elit. Fusce vitae ipsum vitae elit tempus posuere vel vel elit. Aliquam accumsan turpis vel lorem pretium, ut pharetra ex dapibus. Donec ac efficitur risus. Nunc sem ipsum, aliquam vel lacus eget, feugiat sagittis dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse non quam lectus. Ut commodo felis quam, non maximus urna vehicula quis</p>.
        <p>Maecenas ut ullamcorper nisi. Cras at purus ut velit tempor imperdiet id viverra justo. Nullam ipsum ante, tincidunt vel enim nec, vulputate sodales tellus. Donec eros mi, gravida at condimentum eget, congue sit amet purus. Sed efficitur, tortor eu efficitur consequat, urna nulla ultrices dolor, vitae ultricies turpis lacus sed odio. Integer lorem libero, ultricies et tristique vel, malesuada a ligula. Phasellus vulputate tincidunt lectus sed ultricies. Duis commodo viverra leo at fringilla. Ut at suscipit lacus. Cras vel dignissim est. Vestibulum tincidunt diam ac semper consectetur. Nullam scelerisque metus id tristique aliquet</p>.
      `
    },
    2: {
      "id": 2,
      "poster": 2,
      "published": true,
      "pinned": false,
      "updatedAt": 1494674929000,
      "pinExpiry": 1498908494000,
      "title": "Reporting Registration Issues",
      "content": `
        <p>Praesent vel sem nisl. In purus nisl, mattis a ultrices quis, fringilla et lorem. Aenean bibendum, est id maximus laoreet, neque risus rutrum justo, id venenatis libero magna eu eros. Quisque odio leo, tristique in elit non, venenatis vestibulum purus. Aenean non massa mi. Donec iaculis sapien cursus velit venenatis feugiat. Nulla urna ante, facilisis eget urna in, fringilla pretium odio. In fringilla felis elit, eget dapibus ante tempor et. Morbi tellus ipsum, pellentesque nec egestas id, euismod nec dui. Proin laoreet mauris vitae nunc scelerisque, quis rhoncus augue bibendum. Nulla suscipit dolor risus, non tincidunt quam varius commodo. Donec metus sapien, consectetur non facilisis non, scelerisque ut tortor. Morbi vel neque eu nibh accumsan aliquet ut lacinia purus. Integer ultrices mi augue, ut vulputate nulla varius eu. Duis dapibus, purus vel vestibulum varius, magna enim aliquet augue, a pulvinar orci arcu ac lorem.</p>
      `
    }
  },

  "student": {
    0: {
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
      "description": "Every year, the Source Academy holds a trial for worthy candidates to be trained in the Way of the Source. This will be their first step on a lifelong journey of bringing peace and justice to the galaxy. After years of anticipation, it is finally your turn.",
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": moment().subtract(3, 'days').valueOf(),
      "dueAt": moment().add(5, 'days').valueOf()
    },
    "1": {
      "id": 1,
      "type": "mission",
      "order": "2",
      "title": "???",
      "description": "Continue the game to unlock this sidequest.",
      "published": false,
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1530444494000,
      "dueAt": 1530444494000
    },
    "2": {
      "id": 2,
      "type": "sidequest",
      "order": "1",
      "published": true,
      "title": "An Extra Challenge",
      "description": "Hartin Menz opens this challenge for all new cadets.",
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": moment().subtract(1, 'days').valueOf(),
      "dueAt": moment().add(5, 'days').startOf('day').valueOf()
    },
    "3": {
      "id": 3,
      "type": "sidequest",
      "order": "2.1",
      "title": "???",
      "description": "Continue the game to unlock this sidequest.",
      "published": false,
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 1530444494000,
      "dueAt": 1530444494000
    },
    "4": {
      "id": 4,
      "type": "sidequest",
      "order": "2.2",
      "title": "???",
      "description": "Continue the game to unlock this one.",
      "published": false,
      "coverPicture": "http://lorempixel.com/150/150/",
      "openedAt": 15304444940000,
      "dueAt": 1530444494000
    },
    "5": {
      "id": 5,
      "type": "path",
      "order": "1A",
      "title": "Lecture 1A Review",
      "description": "These questions should help you revise the lecture material",
      "published": true,
      "coverPicture": "/assets/demo/path-cover.png",
      "openedAt": moment().subtract(3, 'days').valueOf(),
      "dueAt": moment().add(5, 'days').startOf('day').valueOf()
    }
  },

  "happening": {
    0: {
      id: 0,
      timestamp: DAYS_AGO(1).subtract(2, 'hour').valueOf(),
      type: 'level_up',
      user: 3,
      level: 2
    },
    1: {
      id: 1,
      timestamp: DAYS_AGO(2).subtract(3, 'hour').valueOf(),
      type: 'level_up',
      user: 4,
      level: 2
    },
    2: {
      id: 2,
      timestamp: DAYS_AGO(3).subtract(4, 'hour').valueOf(),
      type: 'level_up',
      user: 5,
      level: 2
    },
    3: {
      id: 3,
      timestamp: DAYS_AGO(1).subtract(2, 'hour').valueOf(),
      user: 3,
      type: 'achievement_got'
    },
    4: {
      id: 4,
      timestamp: DAYS_AGO(2).subtract(3, 'hour').valueOf(),
      user: 4,
      type: 'achievement_got'
    },
    5: {
      id: 5,
      timestamp: DAYS_AGO(3).subtract(4, 'hour').valueOf(),
      user: 5,
      type: 'achievement_got'
    },
    6: {
      id: 6,
      timestamp: DAYS_AGO(1).subtract(2, 'hour').valueOf(),
      user: 3,
      type: 'third_to_finish',
      assessment: 0
    },
    7: {
      id: 7,
      timestamp: DAYS_AGO(2).subtract(3, 'hour').valueOf(),
      user: 4,
      type: 'second_to_finish',
      assessment: 0
    },
    8: {
      id: 8,
      timestamp: DAYS_AGO(3).subtract(4, 'hour').valueOf(),
      user: 5,
      type: 'first_to_finish',
      assessment: 0
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
      firstName: capitalize(user.name.first),
      lastName: capitalize(user.name.last),
      profilePicture: user.picture.large
    }

    db.student[(counter - 2).toString()] = {
      id: counter - 2,
      user: counter,
      level: 1,
      experiencePoint: 0
    }
  }

  db.student[3].level = 2
  db.student[4].level = 2
  db.student[5].level = 2
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
      return Object.assign({}, db.user[0], {
        token: "demo-token"
      })
    },

    async authenticate(username: string, password: string) {
      return Object.assign({}, db.user[0], {
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
      return db.student[id]
    },
    async getByUser(id: number) {
      return students.find(s => (s.user === id))
    }
  },

  assessment: {
    async get(id: number) {
      return db.assessment[id]
    },

    async fetch(limit?: number) {
      return resourcesOfKey<t.IAssessment>('assessment')
    }
  },

  announcement: {
    async get(id: number) {
      return db.announcement[id]
    },

    async fetch(limit?: number) {
      return resourcesOfKey<t.IAnnouncement>('announcement')
    }
  },

  user: {
    async get(id: number) {
      return db.user[id]
    },

    async fetch(limit?: number) {
      return resourcesOfKey<t.IUser>('user')
    }
  },

  happening: {
    async get(id: number) {
      return db.happening[id]
    },

    async fetch(limit?: number) {
      return resourcesOfKey<t.IHappening>('happening')
    }
  }
}

export default async () => {
  await populateStudent()
  return boot(mockAPI)
}