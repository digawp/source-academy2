import * as React from 'react'
import { Store } from 'redux'
import { RouteComponentProps } from 'react-router'
import { push } from 'react-router-redux'
import { IUser } from 'sa/core/types'
import Navbar from './Navbar'

export interface IHomeProps extends RouteComponentProps<any> {
  currentUser: IUser

  login: (username: string, password: string) => void
}

export default function Home({ login, currentUser }: IHomeProps) {
  return (
    <div className="sa-home pt-dark">
      <Navbar
        currentUser={currentUser}
        handleViewDemo={() => login("any", "any")} />
      <div className="info-card">
        <div className="heading">
          Home Page Under Construction!
        </div>
        <div className="content">
          Please proceed by logging in or trying the demo.
        </div>
      </div>
    </div>
  )
}
