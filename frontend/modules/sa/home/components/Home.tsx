import * as React from 'react'
import { Store } from 'redux'
import { RouteComponentProps } from 'react-router'
import { push } from 'react-router-redux'
import { User } from 'sa/core/types'
import Navbar from './Navbar'

export type Props = {
  currentUser: User
  login: (username: string, password: string) => void,
} & RouteComponentProps<any>

const Home: React.StatelessComponent<Props> =
  ({ login, currentUser }) => {
    const handleViewDemo = () => login('any', 'any')
    return (
      <div className="sa-home pt-dark">
        <Navbar currentUser={currentUser} handleViewDemo={handleViewDemo} />
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

export default Home
