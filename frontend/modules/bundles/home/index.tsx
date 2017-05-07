import { Store } from 'redux'
import { injectReducer } from '../../redux/reducers'
import HomeContainer from './containers/HomeContainer'

import './styles/index.scss'

export default (store: Store<any>, callback: Function) => {
  require.ensure([], () => {
    const Home = require('./components/Home').default

    injectReducer(store, {
      key: 'home',
      reducer(state = {}, action: any) {
        return state
      }
    })

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/HomeContainer', () => {
          const NewHomeContainer = require('./containers/HomeContainer').default
          callback(NewHomeContainer)
        })
      }
    }
    
    callback(HomeContainer)
  }, 'home')
}