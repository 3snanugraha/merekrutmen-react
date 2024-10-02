import axiosInstance from "../api/axiosInstance";
// import { baseurl } from "@env";
import baseurl from "../api/baseurl";
export const register = (payload) => {
  return axiosInstance.post(`${baseurl}/api/auth/register/merchant`, payload);
};

export const getUserMerchant = (token) => {
  return axiosInstance.get(`${baseurl}/api/merchant/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserDistributor = (token) => {
  return axiosInstance.get(`${baseurl}/api/distributor/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = (payload) => {
  return axiosInstance.post(`${baseurl}/api/auth/login`, payload);
  // return axiosInstance.post(`https://humbly-desired-stag.ngrok-free.app//api/auth/login`, payload);
};

export const sendOtpForgetPassword = async (email) => {
  try {
    const response = await axiosInstance.post(
      `${baseurl}/api/auth/sendOtp`,
      {
        email: email,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending OTP for forget password:', error);
    throw error;
  }
};


export const sendNewPassword = async (otp, email) => {
  try {
    const bodyRequest = {
      otp: otp,
      email: email,
    };

    const response = await axiosInstance.put(
      `${baseurl}/api/auth/reset-password-mobile`,
      bodyRequest,
    );

    return response.data;
  } catch (error) {
    console.error('Error setting new password:', error);
    throw error;
  }
};

