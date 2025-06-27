import { Outlet, NavLink } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">User Dashboard</h1>
                    <p className="text-gray-600">Manage your account and bookings</p>
                </div>

                {/* Navigation */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <NavLink
                            to="/user/account"
                            className={({ isActive }) => 
                                `flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive 
                                        ? "bg-blue-500 text-white shadow-md" 
                                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                }`
                            }
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Account
                        </NavLink>
                        <NavLink
                            to="/user/bookings"
                            className={({ isActive }) => 
                                `flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive 
                                        ? "bg-blue-500 text-white shadow-md" 
                                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                }`
                            }
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Bookings
                        </NavLink>
                    </div>
                </div>
                
                {/* Content area */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[500px]">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;