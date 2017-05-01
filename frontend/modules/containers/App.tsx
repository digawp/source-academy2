import * as React from 'react'
import createAppRouter from '../routers/appRouter'
import Bundle from '../Bundle'

const loadHome = require('bundle-loader?lazy&name=home!../components/home')
const loadAcademy = require('bundle-loader?lazy&name=academy!../components/academy')

const Home: React.StatelessComponent<any> = () =>
  (<Bundle load={loadHome}>
    { (Home: React.ComponentClass<any>) => <Home /> } 
  </Bundle>)

const Academy: React.StatelessComponent<any> = () =>
  (<Bundle load={loadAcademy}>
    { (Academy: React.ComponentClass<any>) => <Academy /> } 
  </Bundle>)

export default class App extends React.Component<any, any> {
  componentDidMount() {
    loadHome()
    loadAcademy()
  }

  render() {
    return (
      <div className="sa-app">
        {createAppRouter({ Home, Academy })}
      </div>
    )
  }
}