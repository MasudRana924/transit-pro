
const topRoutes = [
  { from: 'Dhaka', to: 'Chattogram', icon: '🚌' },
  { from: 'Dhaka', to: 'Sylhet', icon: '🚂' },
  { from: 'Dhaka', to: 'Rajshahi', icon: '🚌' },
  { from: 'Dhaka', to: 'Khulna', icon: '🚂' },
  { from: 'Dhaka', to: 'Cox\'s Bazar', icon: '✈️' },
  { from: 'Dhaka', to: 'Rangamati', icon: '🚢' },
  { from: 'Chattogram', to: 'Cox\'s Bazar', icon: '🚌' },
  { from: 'Dhaka', to: 'Barisal', icon: '🚢' },
];

const TopRoutes = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Top Travel Routes</h2>
          <p className="mt-4 text-lg text-gray-600">
            Most popular routes across Bangladesh
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRoutes.map((route, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{route.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {route.from} to {route.to}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Choose from multiple operators
                </p>
                <button className="mt-4 text-bangladesh-green hover:text-bangladesh-green/80 text-sm font-medium">
                  View Tickets →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRoutes;