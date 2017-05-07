import { Store, Reducer } from 'redux'

export interface IAppDelegate {
  store: Store<any>

  injectReducers: (
    store: Store<any>,
    reducers: {[name: string]: Reducer<any>}) => void

  bundleLoaded: (component: React.ComponentClass<any>) => void
}
