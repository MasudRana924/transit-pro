import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Clock, MapPin, Wifi, Coffee, Snowflake, Users, ArrowRight, Filter, ChevronDown, X } from "lucide-react";
import BusNoResults from "./no-result/BusNoResults";

const BusCard = () => {
  const { buses } = useSelector((state) => state.buses);
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    busType: '',
    departure: '',
    price: '',
    acType: '' // New filter for AC/Non-AC
  });

  // Dropdown states
  const [dropdownOpen, setDropdownOpen] = useState({
    busType: false,
    departure: false,
    price: false,
    acType: false
  });

  const handleSeeDetails = (busId) => {
    navigate(`/bus/${busId}`);
  };

  // Toggle dropdown
  const toggleDropdown = (filterType) => {
    setDropdownOpen(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setDropdownOpen({
      busType: false,
      departure: false,
      price: false,
      acType: false
    });
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    closeAllDropdowns();
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      busType: '',
      departure: '',
      price: '',
      acType: ''
    });
    closeAllDropdowns();
  };

  // Get unique filter options from buses
  const filterOptions = useMemo(() => {
    if (!buses || buses.length === 0) return { 
      busTypes: [], 
      departures: [], 
      prices: [],
      acTypes: ['AC', 'Non-AC'] // Add AC types
    };

    const busTypes = [...new Set(buses.map(bus => bus.coach))].filter(Boolean);
    const departures = [...new Set(buses.map(bus => {
      const timeString = bus.depTime || '';
      const hourMatch = timeString.match(/(\d+):/);
      const hour = hourMatch ? parseInt(hourMatch[1]) : 0;
      const isPM = timeString.includes('PM') && hour !== 12;
      const adjustedHour = isPM ? hour + 12 : hour === 12 && timeString.includes('AM') ? 0 : hour;
      
      if (adjustedHour >= 6 && adjustedHour < 12) return 'Morning (6AM - 12PM)';
      if (adjustedHour >= 12 && adjustedHour < 18) return 'Afternoon (12PM - 6PM)';
      if (adjustedHour >= 18 && adjustedHour < 24) return 'Evening (6PM - 12AM)';
      return 'Night (12AM - 6AM)';
    }))];

    // Create price ranges based on actual bus prices (if available)
    const prices = [
      'Under $50',
      '$50 - $100',
      '$100 - $200',
      'Above $200'
    ];

    return { 
      busTypes, 
      departures, 
      prices,
      acTypes: ['AC', 'Non-AC'] // Add AC types
    };
  }, [buses]);

  // Filter buses based on selected filters
  const filteredBuses = useMemo(() => {
    if (!buses || buses.length === 0) return [];

    return buses.filter(bus => {
      // Bus Type filter
      if (filters.busType && bus.coach !== filters.busType) {
        return false;
      }

      // Departure time filter
      if (filters.departure) {
        const timeString = bus.depTime || '';
        const hourMatch = timeString.match(/(\d+):/);
        const hour = hourMatch ? parseInt(hourMatch[1]) : 0;
        const isPM = timeString.includes('PM') && hour !== 12;
        const adjustedHour = isPM ? hour + 12 : hour === 12 && timeString.includes('AM') ? 0 : hour;
        
        let timeSlot = '';
        if (adjustedHour >= 6 && adjustedHour < 12) timeSlot = 'Morning (6AM - 12PM)';
        else if (adjustedHour >= 12 && adjustedHour < 18) timeSlot = 'Afternoon (12PM - 6PM)';
        else if (adjustedHour >= 18 && adjustedHour < 24) timeSlot = 'Evening (6PM - 12AM)';
        else timeSlot = 'Night (12AM - 6AM)';

        if (timeSlot !== filters.departure) {
          return false;
        }
      }

      // AC Type filter
      if (filters.acType) {
        if (filters.acType === 'AC' && !bus.airCondition) {
          return false;
        }
        if (filters.acType === 'Non-AC' && bus.airCondition) {
          return false;
        }
      }

      // Price filter (example implementation)
      if (filters.price && bus.price) {
        const priceNum = parseFloat(bus.price.replace(/[^0-9.]/g, ''));
        
        if (filters.price === 'Under $50' && priceNum >= 50) return false;
        if (filters.price === '$50 - $100' && (priceNum < 50 || priceNum > 100)) return false;
        if (filters.price === '$100 - $200' && (priceNum < 100 || priceNum > 200)) return false;
        if (filters.price === 'Above $200' && priceNum <= 200) return false;
      }

      return true;
    });
  }, [buses, filters]);

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
        <p className="text-red-500">{filteredBuses.length} bus{filteredBuses.length > 1 ? 'es' : ''} found</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filters Label */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-700">Filters:</span>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-1 lg:justify-center">
            {/* Bus Type Filter */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('busType')}
                className="w-full sm:w-auto min-w-[140px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="text-gray-700">
                  {filters.busType || 'Bus Type'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {dropdownOpen.busType && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filterOptions.busTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange('busType', type)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AC Type Filter */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('acType')}
                className="w-full sm:w-auto min-w-[140px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="text-gray-700">
                  {filters.acType || 'AC Type'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {dropdownOpen.acType && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  {filterOptions.acTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange('acType', type)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Departure Filter */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('departure')}
                className="w-full sm:w-auto min-w-[140px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="text-gray-700">
                  {filters.departure || 'Departure'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {dropdownOpen.departure && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  {filterOptions.departures.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleFilterChange('departure', time)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('price')}
                className="w-full sm:w-auto min-w-[140px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="text-gray-700">
                  {filters.price || 'Price'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {dropdownOpen.price && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  {filterOptions.prices.map((price) => (
                    <button
                      key={price}
                      onClick={() => handleFilterChange('price', price)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {price}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Clear All Button */}
          <button
            onClick={clearAllFilters}
            className="w-full sm:w-auto px-4 py-2 text-blue-600 hover:text-blue-800 font-medium text-sm border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Clear All
          </button>
        </div>

        {/* Active Filters Display */}
        {(filters.busType || filters.departure || filters.price || filters.acType) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filters.busType && (
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <span>{filters.busType}</span>
                  <button
                    onClick={() => handleFilterChange('busType', '')}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.acType && (
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>{filters.acType}</span>
                  <button
                    onClick={() => handleFilterChange('acType', '')}
                    className="hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.departure && (
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>{filters.departure}</span>
                  <button
                    onClick={() => handleFilterChange('departure', '')}
                    className="hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.price && (
                <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  <span>{filters.price}</span>
                  <button
                    onClick={() => handleFilterChange('price', '')}
                    className="hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bus Cards */}
      <div className="space-y-4">
        {filteredBuses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No buses found matching your filters</div>
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters to see all buses
            </button>
          </div>
        ) : (
          filteredBuses.map((bus) => (
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
                    {bus.airCondition && (
                      <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm border border-blue-200">
                        <Snowflake className="w-4 h-4" />
                        <span>Air Conditioning</span>
                      </div>
                    )}
                    {bus.wifi && (
                      <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm border border-green-200">
                        <Wifi className="w-4 h-4" />
                        <span>Free WiFi</span>
                      </div>
                    )}
                    {bus.drink && (
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
          ))
        )}
      </div>

      {/* Footer Info */}
      {filteredBuses.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Showing {filteredBuses.length} of {buses.length} available buses for {buses[0]?.from} to {buses[0]?.to}
          </p>
        </div>
      )}
    </div>
  );
};

export default BusCard;