import { Bus, Search, MapPin, Clock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusNoResults() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bus Results</h2>
        <div className="h-0.5 w-16 bg-blue-500 rounded"></div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-10 text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 hover:bg-blue-100 transition-colors">
            <Bus className="w-10 h-10 text-blue-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No buses found
        </h3>
        <p className="text-lg text-gray-600 mb-2">
          We couldn't find any buses matching your search criteria.
        </p>
        <p className="text-gray-500 mb-8">
          Try adjusting your search parameters below.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800 mb-1">Different Routes</h4>
            <p className="text-sm text-gray-600">Try alternative locations</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800 mb-1">Adjust Time</h4>
            <p className="text-sm text-gray-600">Check different hours</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-800 mb-1">Refresh</h4>
            <p className="text-sm text-gray-600">Check for new schedules</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all shadow-md">
            Modify Search
          </button>
          </Link>
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            View All Routes
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Peak hours (7-9 AM, 5-7 PM) usually have more frequent services
          </p>
        </div>
      </div>
    </div>
  );
}