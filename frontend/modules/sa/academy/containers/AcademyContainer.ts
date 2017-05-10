import { connect } from 'react-redux'
import Academy from '../components/Academy'

const mapStateToProps = (state: any) => ({
  inbox: state.inbox
})

export default connect(mapStateToProps)(Academy)
