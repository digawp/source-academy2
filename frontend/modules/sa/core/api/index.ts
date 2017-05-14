import axios from 'axios'
import { API } from 'sa/core/types'

const api = axios.create({
  baseURL: process.env.API_HOST || location.host
})

const defaultAPI: any = {
  auth: {
    async refresh() {
      throw "not implemented"
    },

    async authenticate(username: string, password: string) {
      throw "not implemented"
    },

    deauthenticate() {
      throw "not implemented"
    }
  },

  assessment: {
    async get(id: number) {
      throw "not implemented"
    },
    async fetch(limit?: number) {
      throw "not implemented"
    }
  },

  student: {
    async fetch(limit?: number) {
      throw "not implemented"
    },
    async get(id: number) {
      throw "not implemented"
    },
    async getByUser(id: number) {
      throw "not implemented"
    }
  },
}

export default defaultAPI
