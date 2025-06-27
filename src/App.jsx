import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Preloader from './components/laoder/Preloader';

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/user/auth/Login"));
const Register = lazy(() => import("./pages/user/auth/Register"));
const SearchBuses = lazy(() => import('./pages/Bus/SearchBuses'));
const BusCard = lazy(() => import("./components/BusCard"));
const BusDetails = lazy(() => import('./pages/Booking/BusDetails'));
const BookingConfirmation = lazy(() => import('./pages/Booking/BookingConfirmation'));
const VerifyOtpPage = lazy(() => import("./pages/user/auth/VerifyOtpPage"));
const UserLayout = lazy(() => import("./pages/layout/UserLayout"));
const Account = lazy(() => import("./pages/user/profile/Account"));
const Booking = lazy(() => import("./pages/user/booking/Booking"));
const NotFound = lazy(() => import("./pages/not-found/NotFound")); // Add this line

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow relative">
          <Suspense fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
              <Preloader />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<VerifyOtpPage />} />
              <Route path="/search" element={<SearchBuses />} />
              <Route path="/buses" element={<BusCard />} />
              <Route path="/bus/:id" element={<BusDetails />} />
              <Route path="/user" element={<PrivateRoute><UserLayout /></PrivateRoute>}>
                <Route path="account" element={<Account />} />
                <Route path="bookings" element={<Booking />} />
                <Route index element={<Account />} />
              </Route>
              <Route
                path="/booking-confirmation"
                element={
                  <PrivateRoute>
                    <BookingConfirmation />
                  </PrivateRoute>
                }
              />
              {/* Add this catch-all route at the end */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;