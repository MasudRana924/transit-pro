import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resendOtp, clearVerification } from '../../../redux/reducers/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { message } from "antd";
import { Mail, Shield, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    verificationEmail,
    isLoading,
    error,
    resendOtpSent,
    verifiedSuccess,
    resendOtpSentLoading
  } = useSelector((state) => state.user);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleInputChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current field is empty, go to previous field
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    // Only allow 6 digits
    if (!/^\d{6}$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    setOtp(newOtp);

    // Focus the last input
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      return;
    }
    dispatch(verifyOtp({ otp: otpString }));
  };

  useEffect(() => {
    if (verifiedSuccess) {
      message.success('OTP verified successfully!')
      navigate('/login');
      dispatch(clearVerification());
    }
  }, [verifiedSuccess, navigate, dispatch]);

  const handleResendOtp = () => {
    dispatch(resendOtp());
    // Clear OTP fields
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // Reset countdown
    setCountdown(60);
    setCanResend(false);
  };

  useEffect(() => {
    if (resendOtpSent) {
      message.success('OTP sent successfully')
    }
  }, [resendOtpSent]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const isOtpComplete = otp.join('').length === 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600 mb-2">
            We've sent a 6-digit verification code to
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{verificationEmail}</span>
          </div>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      digit 
                        ? 'border-blue-500 bg-blue-50 text-blue-600' 
                        : 'border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'}`}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{otp.join('').length}/6</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(otp.join('').length / 6) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isOtpComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify Code</span>
                </>
              )}
            </button>
          </form>

          {/* Resend Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">Didn't receive the code?</p>
              
              {canResend ? (
                <button
                  onClick={handleResendOtp}
                  disabled={resendOtpSentLoading}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50"
                >
                  {resendOtpSentLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Resend Code</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    Resend available in {countdown}s
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Check your email</p>
                <p>The verification code may take a few minutes to arrive. Don't forget to check your spam folder.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;