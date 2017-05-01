import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps
} from 'react-router-dom'

export interface IRouterProps {
  Home: React.StatelessComponent<any>,
  Academy: React.StatelessComponent<any>
}

export default ({
  Home = React.DOM.div,
  Academy = React.DOM.div
}: IRouterProps) => (
  <Router>
    <div className="sa-content">
      <Route exact path="/" component={Home} />
      <Route path="/academy" component={Academy} />
    </div>
  </Router>
)
