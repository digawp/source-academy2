import { Store, Reducer } from 'redux'

export interface AsyncStore extends Store<any> {
  asyncReducers: {[index: string]: Reducer<any>}
}
export interface IAppDelegate {

  store: AsyncStore

  injectReducers: (
    store: AsyncStore,
    reducers: {[name: string]: Reducer<any>}) => void

  makeRootReducer: (
    asyncReducers: {[name: string]: Reducer<any>}
  ) => Reducer<any>

  bundleLoaded: (component: React.ComponentClass<any>) => void
}
