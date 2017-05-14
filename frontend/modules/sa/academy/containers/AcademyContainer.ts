import { connect } from 'react-redux'
import Academy from '../components/Academy'

const mapStateToProps = (state: any) => ({
  currentUser: state.auth.currentUser,
  currentStudent: state.currentStudent
})

export default connect(mapStateToProps)(Academy)
