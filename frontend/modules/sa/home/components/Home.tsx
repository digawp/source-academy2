import * as React from 'react'
import { Store } from 'redux'
import { RouteComponentProps } from 'react-router'
import { push } from 'react-router-redux'
import Navbar from './Navbar'

export interface IHomeProps extends RouteComponentProps<any> {
  login: () => void
}

export default function Home({ login }: IHomeProps) {
  return (
    <div className="sa-home pt-dark">
      <Navbar handleViewDemo={login} />
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
