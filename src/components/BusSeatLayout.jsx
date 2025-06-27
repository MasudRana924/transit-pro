import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBusFetched, holdSeat } from "../redux/reducers/bus/busesSlice";
import { bookSeats, clearCurrentBooking } from "../redux/reducers/booking/bookingsSlice";
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
      navigate('/');
      dispatch(clearCurrentBooking());
      dispatch(clearBusFetched());
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
      return "w-12 h-10 bg-gray-600 border border-gray-700 rounded flex flex-col items-center justify-center text-xs font-medium cursor-not-allowed text-white";
    }

    if (seat.holdUntil && new Date(seat.holdUntil) > new Date()) {
      return "w-12 h-10 bg-gray-300 border border-gray-400 rounded flex flex-col items-center justify-center text-xs font-medium cursor-not-allowed text-gray-600";
    }

    if (selectedSeats.includes(seat.seatId)) {
      return "w-12 h-10 bg-gray-800 border border-gray-900 rounded flex flex-col items-center justify-center text-xs font-medium cursor-pointer text-white";
    }

    return "w-12 h-10 bg-white border border-gray-300 rounded flex flex-col items-center justify-center text-xs font-medium cursor-pointer hover:bg-gray-50 hover:border-gray-400";
  };

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      {/* Bus Details Section */}
      <div className="bg-white border border-gray-200 rounded p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
             <p className="text-sm text-gray-500">{busDetails?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Route</p>
              <p className="font-medium text-gray-900">{busDetails?.from } to {busDetails?.to}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium text-gray-900">{busDetails?.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Fare per seat</p>
              <p className="font-medium text-gray-900">{busDetails?.fare || '৳800'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Bus Layout */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Select Your Seats</h3>
          
          {/* Legend */}
          <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded flex items-center justify-center">
                  <User className="w-3 h-3 text-gray-500" />
                </div>
                <span className="text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-800 border border-gray-900 rounded flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-600 border border-gray-700 rounded flex items-center justify-center">
                  <Armchair className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded flex items-center justify-center">
                  <Clock className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-gray-700">On Hold</span>
              </div>
            </div>
          </div>

          {/* Bus Seat Layout */}
          <div className="bg-gray-100 border border-gray-200 rounded p-6 relative">
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
          <div className="bg-white border border-gray-200 rounded p-6 sticky top-4">
            <h4 className="text-lg font-medium mb-4 text-gray-900">Booking Summary</h4>
            
            {selectedSeats.length === 0 ? (
              <div className="text-center py-8">
                <Armchair className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No seats selected</p>
                <p className="text-sm text-gray-400 mt-1">Click on available seats to select</p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Selected Seats:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seatId => (
                      <span 
                        key={seatId}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium border border-gray-300"
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
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Total</span>
                    <span>৳{(parseInt(busDetails?.fare?.replace('৳', '') || '800') * selectedSeats.length).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookSeats}
                  className="w-full bg-gray-800 text-white py-3 px-4 rounded hover:bg-gray-900 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSeatLayout;