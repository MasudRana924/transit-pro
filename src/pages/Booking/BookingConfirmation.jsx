import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCurrentBooking } from "../../redux/reducers/booking/bookingsSlice";
import { clearBusFetched } from "../../redux/reducers/bus/busesSlice";
import PropTypes from 'prop-types';

const BookingConfirmation = ({ busDetails, currentBooking }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackToSearch = () => {
    dispatch(clearCurrentBooking());
    dispatch(clearBusFetched());
    navigate('/'); // Adjust the route as needed
  };

  const handleSeeTicket = () => {
    // Navigate to ticket view page - adjust route as needed
    navigate('/user/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your ticket has been successfully booked</p>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-800">Booking ID</span>
              <span className="text-sm font-mono text-green-900">{currentBooking?._id || "N/A"}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Route Info */}
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{busDetails?.from || "N/A"}</p>
                <p className="text-xs text-gray-500">From</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="border-t-2 border-dashed border-gray-300 relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{busDetails?.to || "N/A"}</p>
                <p className="text-xs text-gray-500">To</p>
              </div>
            </div>

            {/* Bus Details */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bus Name</span>
                <span className="font-medium text-gray-900">{busDetails?.name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Departure</span>
                <span className="font-medium text-gray-900">
                  {busDetails?.date ? new Date(busDetails?.date).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSeeTicket}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            See Ticket
          </button>
          <button
            onClick={handleBackToSearch}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Back to Search
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

BookingConfirmation.propTypes = {
  busDetails: PropTypes.shape({
    name: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    date: PropTypes.string,
  }),
  currentBooking: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default BookingConfirmation;