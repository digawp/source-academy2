import { Store } from 'redux'
import { injectReducer } from '../../redux/reducers'
import AcademyContainer from './containers/AcademyContainer'

export default (store: Store<any>, callback: Function) => {
  require.ensure([], () => {
    injectReducer(store, {
      key: 'academy',
      reducer(state = {}, action: any) {
        return state
      }
    })

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/AcademyContainer', () => {
          const NewContainer = require('./containers/AcademyContainer').default
          callback(NewContainer)
        })
      }
    }
    
    callback(AcademyContainer)
  }, 'home')
}