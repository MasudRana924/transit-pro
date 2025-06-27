import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Add this import
import { Clock, MapPin, Wifi, Coffee, Snowflake, Users, ArrowRight } from "lucide-react";
import BusNoResults from "./no-result/BusNoResults";

const BusCard = () => {
  const { buses } = useSelector((state) => state.buses);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSeeDetails = (busId) => {
    navigate(`/bus/${busId}`); // Navigate to the bus details page
  };

  if (!buses || buses.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
       <BusNoResults/>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:mt-24">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">Bus Results</h2>
        <p className="text-red-500">{buses.length} bus{buses.length > 1 ? 'es' : ''} found</p>
          {/* Footer Info */}
      {buses.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Showing all available buses for {buses[0]?.from} to {buses[0]?.to}
          </p>
        </div>
      )}
      </div>

      {/* Bus Cards */}
      <div className="space-y-4">
        {buses.map((bus) => (
          <div key={bus._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-4 md:p-6">
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-lg md:text-xl font-bold text-red-500 mb-2">{bus.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {bus.coach}
                  </span>
                </div>
                
                {/* Route Info */}
                <div className="flex items-center text-gray-600 flex-col sm:flex-row sm:space-x-4">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <MapPin className="w-4 h-4 mr-1 text-green-600" />
                    <span className="font-medium">{bus.from}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 hidden sm:block" />
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-red-600" />
                    <span className="font-medium">{bus.to}</span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Departure Time */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Departure</p>
                    <p className="font-semibold text-gray-800">{bus.depTime}</p>
                  </div>
                </div>

                {/* Journey Time */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                    <p className="font-semibold text-gray-800">{bus.journeyTime}</p>
                  </div>
                </div>

                {/* Available Seats */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Available</p>
                    <p className="font-semibold text-gray-800">
                      {bus.seats ? bus.seats.filter(seat => seat.available !== false).length : bus.seats?.length || 'N/A'} seats
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">📅</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="font-semibold text-gray-800">{bus.date}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3 font-medium">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {bus.airCondition === "true" && (
                    <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm border border-blue-200">
                      <Snowflake className="w-4 h-4" />
                      <span>Air Conditioning</span>
                    </div>
                  )}
                  {bus.wifi === "true" && (
                    <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm border border-green-200">
                      <Wifi className="w-4 h-4" />
                      <span>Free WiFi</span>
                    </div>
                  )}
                  {bus.drink === "true" && (
                    <div className="flex items-center space-x-2 bg-orange-50 text-orange-700 px-3 py-2 rounded-full text-sm border border-orange-200">
                      <Coffee className="w-4 h-4" />
                      <span>Refreshments</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">
                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Bus NO: {bus._id.slice(-6)}
                  </div>
                  <button
                    onClick={() => handleSeeDetails(bus._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span>See Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusCard;