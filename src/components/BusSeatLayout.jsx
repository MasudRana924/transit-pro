import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { holdSeat } from "../redux/reducers/bus/busesSlice";
import { bookSeats, clearCurrentBooking } from "../redux/reducers/booking/bookingsSlice";
import {
  CarFront,
  Armchair,
  Clock,
  Check,
  Gauge,
  User
} from "lucide-react";
import { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
const BusSeatLayout = ({ busId, seats }) => {

  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const { token } = useSelector((state) => state.user);
  const { isBookingtTrue } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  const toggleSeatSelection = (seatId) => {
    console.log("selected seta", seatId)
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((num) => num !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleHoldSeat = async (seatId) => {
    console.log("selected seta hold", seatId)
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
      message.success('Your ticket is bokked successfully!')
      navigate('/');
      dispatch(clearCurrentBooking());
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
      return "w-12 h-10 bg-gray-300 border-2 border-gray-400 rounded flex flex-col items-center justify-center text-xs font-bold";
    }

    if (seat.isBooked) {
      return "w-12 h-10 bg-red-400 border-2 border-red-500 rounded flex flex-col items-center justify-center text-xs font-bold cursor-not-allowed text-white";
    }

    if (seat.holdUntil && new Date(seat.holdUntil) > new Date()) {
      return "w-12 h-10 bg-yellow-400 border-2 border-yellow-500 rounded flex flex-col items-center justify-center text-xs font-bold cursor-not-allowed";
    }

    if (selectedSeats.includes(seat.seatId)) {
      return "w-12 h-10 bg-green-400 border-2 border-green-500 rounded flex flex-col items-center justify-center text-xs font-bold cursor-pointer text-white";
    }

    return "w-12 h-10 bg-gray-100 border-2 border-gray-300 rounded flex flex-col items-center justify-center text-xs font-bold cursor-pointer hover:bg-blue-100 hover:border-blue-300";
  };



  return (
    <div className="mt-8 max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center">Select Your Seats</h3>

      {/* Bus outline */}
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 relative">
        {/* Legend */}
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
              <User className="w-3 h-3" />
            </div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-400 border border-green-500 rounded flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-400 border border-red-500 rounded flex items-center justify-center">
              <Armchair className="w-3 h-3 text-white" />
            </div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded flex items-center justify-center">
              <Clock className="w-3 h-3" />
            </div>
            <span>On Hold</span>
          </div>
        </div>

        {/* Driver section indicator */}
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <Gauge className="w-3 h-3 text-white" />
        </div>

        <div className="space-y-3">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center items-center gap-2">
              {row.type === 'driver' ? (
                // Driver's seat row
                <div className="flex justify-end mr-24 w-full  mt-8">
                  <div className={getSeatClassName(row.seats[0])}>
                    <CarFront className="text-12" />
                    <div className="text-[12px] mt-1">DRIVER</div>
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

      {selectedSeats.length > 0 && (
        <div className="mt-6 text-center">
          <p className="mb-2 text-sm text-gray-600">
            Selected seats: {selectedSeats.join(', ')}
          </p>
          <button
            onClick={handleBookSeats}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Check className="w-5 h-5" />
            Book Selected Seats ({selectedSeats.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default BusSeatLayout;