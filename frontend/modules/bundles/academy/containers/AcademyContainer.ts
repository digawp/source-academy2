import { connect } from 'react-redux'
import Academy from '../components/Academy'

const mapStateToProps = (state: any) => ({
  academy: state.academy
})

export default connect(mapStateToProps)(Academy)
