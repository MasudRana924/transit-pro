import { useSelector } from "react-redux";

const BookingConfirmation = () => {
  const { currentBooking } = useSelector((state) => state.bookings);
  const { token } = useSelector((state) => state.user);

  return (
    <div className="py-12 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Booking Confirmed!
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Booking Details</h3>
            <p className="text-gray-700">
              Booking ID: {currentBooking?._id || "N/A"}
            </p>
            <p className="text-gray-700">
              Status:{" "}
              <span className="font-semibold text-green-600">Confirmed</span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">User Details</h3>
            {/* <p className="text-gray-700">Name: {user?.email}</p> */}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Seats Booked</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentBooking?.seatNumbers?.map((seat) => (
                <span
                  key={seat}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Thank you for booking with us. Your tickets have been confirmed. A
            confirmation email has been sent to your registered email address.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;