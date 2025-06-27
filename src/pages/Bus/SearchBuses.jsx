// src/pages/SearchBuses.js
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, AutoComplete } from "antd";
import dayjs from "dayjs";
import { fetchBuses } from "../../redux/reducers/bus/busesSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
const BD_DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria",
  "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga", "Cox's Bazar",
  "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur",
  "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah",
  "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia",
  "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
  "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj",
  "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati",
  "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
  "Sylhet", "Tangail", "Thakurgaon"
];

const SearchBuses = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelDate, setTravelDate] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, isBusFetched, errorr } = useSelector((state) => state.buses);


  // Filter districts based on current input and exclude the other field's value
  const fromDistricts = useMemo(() => {
    return BD_DISTRICTS
      .filter(district =>
        district.toLowerCase().includes(from.toLowerCase()) &&
        district !== to
      )
      .map(district => ({ value: district }));
  }, [from, to]);

  const toDistricts = useMemo(() => {
    return BD_DISTRICTS
      .filter(district =>
        district.toLowerCase().includes(to.toLowerCase()) &&
        district !== from
      )
      .map(district => ({ value: district }));
  }, [to, from]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (from && to && travelDate) {
      const formattedDate = dayjs(travelDate).format("YYYY-MM-DD");
      dispatch(fetchBuses({ from, to, date: formattedDate }));
    }
  };
  useEffect(() => {
    if (isBusFetched) {
      navigate("/buses");
    }
    if (errorr) {
      message.error(errorr)
    }
  }, [isBusFetched, navigate, errorr]);
  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="w-full relative h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{
          backgroundImage: "url('https://www.techetron.com/wp-content/uploads/2015/01/dhakamaps.jpg')",
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Searching for buses...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we find the best options for you</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center py-4 px-4">
        <div className="w-full md:max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Find Your Perfect Bus Journey
            </h1>
            <p className="text-md text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Search and book bus tickets across Bangladesh with ease.
            </p>
          </div>

          {/* Main Search Card */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Search Form */}
            <div className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                {/* Location Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-4 h-4 inline mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="3" />
                      </svg>
                      Departure From
                    </label>
                    <AutoComplete
                      options={fromDistricts}
                      value={from}
                      onChange={(value) => setFrom(value)}
                      onSelect={(value) => setFrom(value)}
                      placeholder="Select departure district"
                      filterOption={(inputValue, option) =>
                        option.value.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      className="w-full"
                    >
                      <input
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                        required
                      />
                    </AutoComplete>
                  </div>

                  {/* Swap Button */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <button
                      type="button"
                      onClick={handleSwapLocations}
                      className="bg-white border-2 border-gray-200 rounded-full p-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
                      title="Swap locations"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-4 h-4 inline mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Destination To
                    </label>
                    <AutoComplete
                      options={toDistricts}
                      value={to}
                      onChange={(value) => setTo(value)}
                      onSelect={(value) => setTo(value)}
                      placeholder="Select destination district"
                      filterOption={(inputValue, option) =>
                        option.value.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      className="w-full"
                    >
                      <input
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                        required
                      />
                    </AutoComplete>
                  </div>
                </div>

                {/* Date and Search Button */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2 space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-4 h-4 inline mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Travel Date
                    </label>
                    <DatePicker
                      className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500"
                      value={travelDate}
                      onChange={(date) => setTravelDate(date)}
                      format="YYYY-MM-DD"
                      placeholder="Select travel date"
                      disabledDate={(current) => {
                        return current && current < dayjs().startOf('day');
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Buses
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 bg-opacity-90 px-6 py-4 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">100+ Routes</div>
                    <div className="text-xs text-gray-500">Across Bangladesh</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25V6M12 18v3.75M2.25 12H6m12 0h3.75" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">24/7 Support</div>
                    <div className="text-xs text-gray-500">Always available</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Instant Booking</div>
                    <div className="text-xs text-gray-500">Quick & secure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchBuses;