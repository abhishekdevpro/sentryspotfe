import React, { useState } from 'react';
import logo from '../../../../../public/company_logo.png'


const LoginCode = () => {
  const [otp, setOtp] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(value ? true : false);
  };

  const handleSignIn = () => {
    if (otp.length === 6) {
      if (captchaVerified) {
        alert('OTP Submitted Successfully!');
      } else {
        alert('Please verify the CAPTCHA.');
      }
    } else {
      alert('Please enter a 6-digit code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Back Button */}
        <a
          href="/"
          className="text-blue-600 flex items-center mb-6 hover:text-blue-700"
        >
          <span className="mr-2">←</span> Back
        </a>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-auto"
          />
        </div>

        {/* Title */}
        {/* <h2 className="text-2xl font-semibold text-center mb-2 text-blue-900">
          Sign in with login code
        </h2>
        <p className="text-blue-600 text-center mb-6">
          We have sent your one-time passcode to <br />
          <strong>abc@gmail.com</strong>. This passcode will expire after 10
          minutes.
        </p> */}

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-blue-900">
            Enter 6-digit code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            className="w-full text-center text-xl py-2 px-4 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="______"
          />
        </div>

        {/* Success Message */}
        <div className="flex items-center bg-blue-100 border border-blue-500 text-blue-700 p-3 rounded-md mb-6">
          <span className="mr-2">✅</span> Success!
        </div>

        {/* Resend Code */}
        <p className="text-center text-sm mb-6">
          Didn't receive your code?{' '}
          <button className="text-blue-600 font-semibold hover:text-blue-700">
            Send new code
          </button>
        </p>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          Sign in <span className="ml-2">→</span>
        </button>

        {/* Alternative Option */}
        <p className="mt-6 text-center text-sm text-blue-600 font-semibold">
          Don't have access to this email?
        </p>
      </div>
    </div>
  );
};

export default LoginCode;