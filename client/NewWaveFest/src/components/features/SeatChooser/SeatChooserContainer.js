import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest, loadSeats } from '../../../redux/seatsRedux';
import SeatChooser from './SeatChooser';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  seatLoader: (seats) => dispatch(loadSeats(seats))

});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);