import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {holdSeat } from "../redux/reducers/bus/busesSlice";
import { bookSeats  } from "../redux/reducers/booking/bookingsSlice";
import {
  CarFront,
  Armchair,
  Clock,
  Check,
  Gauge,
  User,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookingConfirmation from '../pages/Booking/BookingConfirmation'; // Make sure to import BookingConfirmation

const BusSeatLayout = ({ busId, seats, busDetails }) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { token } = useSelector((state) => state.user);
  const { isBookingtTrue } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((num) => num !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleHoldSeat = async (seatId) => {
    dispatch(holdSeat({ busId, seatId }));
  };

  const handleBookSeats = async () => {
    if (selectedSeats.length === 0) return;
    dispatch(
      bookSeats({
        busId,
        seatIds: selectedSeats,
        token
      })
    );
    setSelectedSeats([]);
  };

  const isSeatAvailable = (seat) => {
    if (seat.isBooked) return false;
    if (seat.holdUntil && new Date(seat.holdUntil) > new Date()) return false;
    return true;
  };

  useEffect(() => {
    if (isBookingtTrue) {
      message.success('Your ticket is booked successfully!')
      // navigate('/');
      // dispatch(clearCurrentBooking());
      // dispatch(clearBusFetched());
    }
  }, [isBookingtTrue, navigate, dispatch]);

  // Create seat layout: 2-4-2 arrangement with 10 rows + driver seat
  const createSeatLayout = () => {
    const seatMap = {};
    seats?.forEach(seat => {
      seatMap[seat.seatId] = seat;
    });

    const layout = [];

    // Driver's seat row (top)
    layout.push({
      type: 'driver',
      seats: [{ seatId: 'D', isDriver: true }]
    });

    // Regular passenger seats - 10 rows
    for (let row = 1; row <= 10; row++) {
      const rowSeats = [];

      // Left side - 2 seats
      for (let col = 1; col <= 2; col++) {
        const seatNum = (row - 1) * 4 + col;
        rowSeats.push(seatMap[seatNum] || { seatNumber: seatNum, isBooked: false });
      }

      rowSeats.push({ type: 'aisle' }); // First aisle

      // Right side - 2 seats
      for (let col = 3; col <= 4; col++) {
        const seatNum = (row - 1) * 4 + col;
        rowSeats.push(seatMap[seatNum] || { seatNumber: seatNum, isBooked: false });
      }

      layout.push({
        type: 'passenger',
        seats: rowSeats
      });
    }

    return layout;
  };

  const seatLayout = createSeatLayout();

  const getSeatClassName = (seat) => {
    if (seat.isDriver) {
      return "w-12 h-10 bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center text-xs font-medium text-gray-600";
    }

    if (seat.isBooked) {
      return "w-12 h-10 bg-red-600 border border-red-700 rounded flex flex-col items-center justify-center text-xs font-medium cursor-not-allowed text-white";
    }

    if (seat.holdUntil && new Date(seat.holdUntil) > new Date()) {
      return "w-12 h-10 bg-yellow-400 border border-yellow-500 rounded flex flex-col items-center justify-center text-xs font-medium cursor-not-allowed text-gray-800";
    }

    if (selectedSeats.includes(seat.seatId)) {
      return "w-12 h-10 bg-green-600 border border-green-700 rounded flex flex-col items-center justify-center text-xs font-medium cursor-pointer text-white";
    }

    return "w-12 h-10 bg-white border border-gray-300 rounded flex flex-col items-center justify-center text-xs font-medium cursor-pointer hover:bg-gray-50 hover:border-gray-400";
  };

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      {!isBookingtTrue ? (
        <>
          {/* Bus Details Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{busDetails?.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Bus Service</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Route</p>
                  <p className="text-gray-700">{busDetails?.from} → {busDetails?.to}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Date & Time</p>
                  <p className="text-gray-700">{busDetails?.date}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Fare per Seat</p>
                  <p className="text-gray-700 font-semibold">{busDetails?.fare || '৳800'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Bus Layout */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Select Your Seats</h3>
              
              {/* Legend */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded flex items-center justify-center">
                      <User className="w-3 h-3 text-gray-500" />
                    </div>
                    <span className="text-gray-700">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 border border-green-700 rounded flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 border border-red-700 rounded flex items-center justify-center">
                      <Armchair className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded flex items-center justify-center">
                      <Clock className="w-3 h-3 text-gray-800" />
                    </div>
                    <span className="text-gray-700">On Hold</span>
                  </div>
                </div>
              </div>

              {/* Bus Seat Layout */}
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 relative">
                {/* Driver section indicator */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <Gauge className="w-3 h-3 text-white" />
                </div>

                <div className="space-y-3">
                  {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center items-center gap-2">
                      {row.type === 'driver' ? (
                        // Driver's seat row
                        <div className="flex justify-end mr-24 w-full mt-4">
                          <div className={getSeatClassName(row.seats[0])}>
                            <CarFront className="text-12" />
                            <div className="text-[10px] mt-1">DRIVER</div>
                          </div>
                        </div>
                      ) : (
                        // Passenger seat rows
                        row.seats.map((seat, seatIndex) => {
                          if (seat.type === 'aisle') {
                            return <div key={seatIndex} className="w-4"></div>;
                          }

                          return (
                            <button
                              key={seat.seatId}
                              onClick={() => {
                                if (isSeatAvailable(seat)) {
                                  toggleSeatSelection(seat.seatId);
                                  handleHoldSeat(seat.seatId);
                                }
                              }}
                              disabled={!isSeatAvailable(seat)}
                              className={getSeatClassName(seat)}
                            >
                              <Armchair />
                            </button>
                          );
                        })
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Selected Seats and Booking */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Booking Summary</h4>
                
                {selectedSeats.length === 0 ? (
                  <div className="text-center py-8">
                    <Armchair className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No seats selected</p>
                    <p className="text-sm text-gray-400 mt-1">Click on available seats to select</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Selected Seats:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seatId => (
                          <span 
                            key={seatId}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium border border-green-200"
                          >
                            Seat {seatId}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mb-4">
                      <div className="flex justify-between text-sm mb-2 text-gray-600">
                        <span>Seats ({selectedSeats.length})</span>
                        <span>৳{(parseInt(busDetails?.fare?.replace('৳', '') || '800') * selectedSeats.length).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-gray-900 text-lg">
                        <span>Total</span>
                        <span>৳{(parseInt(busDetails?.fare?.replace('৳', '') || '800') * selectedSeats.length).toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleBookSeats}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Confirm Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <BookingConfirmation busDetails={busDetails} />
      )}
    </div>
  );
};

BusSeatLayout.propTypes = {
  busId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      seatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      isBooked: PropTypes.bool,
      holdUntil: PropTypes.string,
      seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  busDetails: PropTypes.shape({
    name: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    date: PropTypes.string,
    fare: PropTypes.string,
  }).isRequired,
};

export default BusSeatLayout;