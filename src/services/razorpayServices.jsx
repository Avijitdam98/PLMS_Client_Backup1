import axios from "axios";

const API_BASE_URL = "http://localhost:8732/api";

export const createRazorpayOrder = async (repaymentId) => {
  try {
    console.log("Creating order for repaymentId:", repaymentId);
    const response = await axios.post(
      `${API_BASE_URL}/repayments/create-order/${repaymentId}`
    );
    console.log("Order created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

export const verifyPayment = async (
  repaymentId,
  orderId,
  paymentId,
  signature
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/repayments/verify-payment/${repaymentId}`,
      null,
      {
        params: {
          orderId,
          paymentId,
          signature,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Payment verification failed"
    );
  }
};

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
