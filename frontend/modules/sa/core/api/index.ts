import axios from 'axios'
import { API } from 'sa/core/types'

const api = axios.create({
  baseURL: process.env.API_HOST || location.host
}) 

const dummyUser = {
  "id": 0,
  "role": "student",
  "firstName": "Evan",
  "lastName": "Sebastian",
  "profilePicture": "http://lorempixel.com/48/48/",
  "token": "someToken"
}

const defaultAPI: API = {

  auth: {
    refresh() {
      return Promise.resolve(dummyUser)
    },

    authenticate(username: string, password: string) {
      return Promise.resolve(dummyUser)
    },

    deauthenticate() {
      return
    }
  },

  assessment: {
    get(id: number) {
      return Promise.reject("not implemented")
    },

    fetch(limit?: number) {
      return Promise.reject("not implemented")
    }
  }
}

export default defaultAPI
