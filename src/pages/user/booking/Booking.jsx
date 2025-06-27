import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../../redux/reducers/auth/authSlice";

const Booking = () => {
    const dispatch = useDispatch();
    const { token, bookingsLoading, bookingsError, bookings } = useSelector((state) => state.user);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getUserBookings(token));
    }, [dispatch, token]);

    const handleDetailsClick = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBooking(null);
    };

    if (bookingsError) {
        return <div className="w-full p-4 text-red-500">Error: {bookingsError}</div>;
    }

    return (
        <div className="w-full p-2 sm:p-4">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Bookings</h1>
            
            {bookingsLoading ? (
                <>
                    {/* Desktop Table Skeleton */}
                    <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['Route', 'Journey Date', 'Bus Name', 'Seats', 'Action'].map((header) => (
                                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[...Array(3)].map((_, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        {[...Array(5)].map((_, i) => (
                                            <td key={i} className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card Skeleton */}
                    <div className="md:hidden space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="space-y-2 w-full">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                    </div>
                                    <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i}>
                                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3 mb-1"></div>
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : bookings && bookings.length > 0 ? (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Route
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Journey Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bus Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Seats
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking.bookingId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {booking.busDetails.from} → {booking.busDetails.to}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(booking.busDetails.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {booking.busDetails.coach}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {booking.seatIds.join(', ')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDetailsClick(booking)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking.bookingId} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">
                                            {booking.busDetails.from} → {booking.busDetails.to}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {booking.busDetails.coach}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDetailsClick(booking)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs transition-colors"
                                    >
                                        Details
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <span className="text-gray-500">Date:</span>
                                        <p className="font-medium">{new Date(booking.busDetails.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Seats:</span>
                                        <p className="font-medium">{booking.seatIds.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    <div className="text-base sm:text-lg">No bookings found.</div>
                    <p className="text-sm mt-2">Your booking history will appear here</p>
                </div>
            )}

            {/* Responsive Modal */}
            {showModal && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
                            <h2 className="text-lg sm:text-xl font-bold">Booking Details</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl p-1"
                            >
                                ×
                            </button>
                        </div>
                        
                        {/* Modal Content */}
                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            {/* Booking Information */}
                            <div className="border-b pb-4">
                                <h3 className="font-semibold text-base sm:text-lg mb-3">Booking Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Booking ID</p>
                                        <p className="font-medium text-xs sm:text-sm break-all">{selectedBooking.bookingId}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Booked At</p>
                                        <p className="font-medium text-xs sm:text-sm">{new Date(selectedBooking.bookedAt).toLocaleString()}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-xs sm:text-sm text-gray-600">Seat Numbers</p>
                                        <p className="font-medium text-xs sm:text-sm">{selectedBooking.seatIds.join(', ')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Journey Details */}
                            <div className="border-b pb-4">
                                <h3 className="font-semibold text-base sm:text-lg mb-3">Journey Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">From</p>
                                        <p className="font-medium text-xs sm:text-sm">{selectedBooking.busDetails.from}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">To</p>
                                        <p className="font-medium text-xs sm:text-sm">{selectedBooking.busDetails.to}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Journey Date</p>
                                        <p className="font-medium text-xs sm:text-sm">{new Date(selectedBooking.busDetails.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Journey Time</p>
                                        <p className="font-medium text-xs sm:text-sm">{selectedBooking.busDetails.journeyTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Coach Type</p>
                                        <p className="font-medium text-xs sm:text-sm">{selectedBooking.busDetails.coach}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">Bus ID</p>
                                        <p className="font-medium text-xs sm:text-sm break-all">{selectedBooking.busDetails.busId}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <h3 className="font-semibold text-base sm:text-lg mb-3">Amenities</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${selectedBooking.busDetails.wifi ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <span className="text-xs sm:text-sm">WiFi</span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {selectedBooking.busDetails.wifi ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${selectedBooking.busDetails.airCondition ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <span className="text-xs sm:text-sm">Air Condition</span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {selectedBooking.busDetails.airCondition ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${selectedBooking.busDetails.drink ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <span className="text-xs sm:text-sm">Refreshments</span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {selectedBooking.busDetails.drink ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 sm:p-6 border-t flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Booking;