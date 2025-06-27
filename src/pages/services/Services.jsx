import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const districts = [
    // Dhaka Division
    { name: 'Dhaka', division: 'Dhaka' },
    { name: 'Faridpur', division: 'Dhaka' },
    { name: 'Gazipur', division: 'Dhaka' },
    { name: 'Gopalganj', division: 'Dhaka' },
    { name: 'Kishoreganj', division: 'Dhaka' },
    { name: 'Madaripur', division: 'Dhaka' },
    { name: 'Manikganj', division: 'Dhaka' },
    { name: 'Munshiganj', division: 'Dhaka' },
    { name: 'Narayanganj', division: 'Dhaka' },
    { name: 'Narsingdi', division: 'Dhaka' },
    { name: 'Rajbari', division: 'Dhaka' },
    { name: 'Shariatpur', division: 'Dhaka' },
    { name: 'Tangail', division: 'Dhaka' },

    // Chittagong Division
    { name: 'Bandarban', division: 'Chittagong' },
    { name: 'Brahmanbaria', division: 'Chittagong' },
    { name: 'Chandpur', division: 'Chittagong' },
    { name: 'Chattogram', division: 'Chittagong' },
    { name: 'Comilla', division: 'Chittagong' },
    { name: 'Cox\'s Bazar', division: 'Chittagong' },
    { name: 'Feni', division: 'Chittagong' },
    { name: 'Khagrachhari', division: 'Chittagong' },
    { name: 'Lakshmipur', division: 'Chittagong' },
    { name: 'Noakhali', division: 'Chittagong' },
    { name: 'Rangamati', division: 'Chittagong' },

    // Rajshahi Division
    { name: 'Bogura', division: 'Rajshahi' },
    { name: 'Joypurhat', division: 'Rajshahi' },
    { name: 'Naogaon', division: 'Rajshahi' },
    { name: 'Natore', division: 'Rajshahi' },
    { name: 'Chapainawabganj', division: 'Rajshahi' },
    { name: 'Pabna', division: 'Rajshahi' },
    { name: 'Rajshahi', division: 'Rajshahi' },
    { name: 'Sirajganj', division: 'Rajshahi' },

    // Khulna Division
    { name: 'Bagerhat', division: 'Khulna' },
    { name: 'Chuadanga', division: 'Khulna' },
    { name: 'Jessore', division: 'Khulna' },
    { name: 'Jhenaidah', division: 'Khulna' },
    { name: 'Khulna', division: 'Khulna' },
    { name: 'Kushtia', division: 'Khulna' },
    { name: 'Magura', division: 'Khulna' },
    { name: 'Meherpur', division: 'Khulna' },
    { name: 'Narail', division: 'Khulna' },
    { name: 'Satkhira', division: 'Khulna' },

    // Barisal Division
    { name: 'Barguna', division: 'Barisal' },
    { name: 'Barisal', division: 'Barisal' },
    { name: 'Bhola', division: 'Barisal' },
    { name: 'Jhalokati', division: 'Barisal' },
    { name: 'Patuakhali', division: 'Barisal' },
    { name: 'Pirojpur', division: 'Barisal' },

    // Sylhet Division
    { name: 'Habiganj', division: 'Sylhet' },
    { name: 'Moulvibazar', division: 'Sylhet' },
    { name: 'Sunamganj', division: 'Sylhet' },
    { name: 'Sylhet', division: 'Sylhet' },

    // Rangpur Division
    { name: 'Dinajpur', division: 'Rangpur' },
    { name: 'Gaibandha', division: 'Rangpur' },
    { name: 'Kurigram', division: 'Rangpur' },
    { name: 'Lalmonirhat', division: 'Rangpur' },
    { name: 'Nilphamari', division: 'Rangpur' },
    { name: 'Panchagarh', division: 'Rangpur' },
    { name: 'Rangpur', division: 'Rangpur' },
    { name: 'Thakurgaon', division: 'Rangpur' },

    // Mymensingh Division
    { name: 'Jamalpur', division: 'Mymensingh' },
    { name: 'Mymensingh', division: 'Mymensingh' },
    { name: 'Netrokona', division: 'Mymensingh' },
    { name: 'Sherpur', division: 'Mymensingh' }
  ];

  const filteredDistricts = districts.filter(district =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    district.division.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedDistricts = filteredDistricts.reduce((acc, district) => {
    if (!acc[district.division]) {
      acc[district.division] = [];
    }
    acc[district.division].push(district);
    return acc;
  }, {});

  const handleDistrictClick = (districtName) => {
    // Navigate to booking page with selected district
    console.log(`Searching buses for ${districtName}`);
    // You can replace this with your actual navigation logic
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl">Bus tickets available for all 64 districts of Bangladesh</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search district or division..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Service Overview */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Coverage Across Bangladesh</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            We provide bus ticket booking services for all 64 districts across 8 divisions of Bangladesh. 
            Find reliable bus services to your destination with competitive prices and trusted operators.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-gray-50 p-6 rounded">
            <div className="text-2xl font-bold text-blue-600 mb-2">64</div>
            <div className="text-gray-700">Districts Covered</div>
          </div>
          <div className="text-center bg-gray-50 p-6 rounded">
            <div className="text-2xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-gray-700">Divisions</div>
          </div>
          <div className="text-center bg-gray-50 p-6 rounded">
            <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-700">Routes</div>
          </div>
          <div className="text-center bg-gray-50 p-6 rounded">
            <div className="text-2xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-700">Bus Operators</div>
          </div>
        </div>

        {/* Districts by Division */}
        <div className="space-y-8">
          {Object.entries(groupedDistricts).map(([division, districtList]) => (
            <div key={division} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {division} Division ({districtList.length} Districts)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {districtList.map((district) => (
                  <button
                    key={district.name}
                    onClick={() => handleDistrictClick(district.name)}
                    className="text-left p-4 border border-gray-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{district.name}</div>
                    <div className="text-sm text-gray-500">Available Routes</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Services Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Online Booking</h3>
              <p className="text-gray-700">Book your bus tickets online from anywhere, anytime with instant confirmation.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Multiple Payment Options</h3>
              <p className="text-gray-700">Pay securely using mobile banking, card payments, or cash on delivery.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Seat Selection</h3>
              <p className="text-gray-700">Choose your preferred seat from available options on the bus.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-700">Get live updates about your bus schedule and route information.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-700">Round-the-clock customer support for all your travel needs.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Easy Cancellation</h3>
              <p className="text-gray-700">Cancel or reschedule your tickets easily with our flexible policies.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Book Your Journey?</h2>
          <p className="text-gray-700 mb-6">
            Start your journey by selecting your destination from our extensive network of routes.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded font-medium hover:bg-blue-700">
            Search Buses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;