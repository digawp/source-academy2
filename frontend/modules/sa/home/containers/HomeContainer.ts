import { connect } from 'react-redux'
import { authenticate } from 'sa/core/reducers/auth'
import Home from '../components/Home'

const mapStateToProps = (state: any) => ({
  currentUser: state.auth.currentUser,
})

const mapDispatchToProps = (dispatch: any) => ({
  login: (username: string, password: string) => dispatch(authenticate(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
