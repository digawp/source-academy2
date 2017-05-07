import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Home from '../components/Home'

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
  login: () => dispatch(push('academy'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
