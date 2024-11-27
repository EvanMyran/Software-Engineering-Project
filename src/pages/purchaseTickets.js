// src/pages/purchaseTickets.js
import Payment from '../components/checkoutForm.js'; 
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header.js"; // Header
import Sidebar from "../components/sidebar.js"; // Sidebar
import paymentImage2 from "../assets/paypal_PNG9.png"; // Example image
import paymentImage1 from "../assets/Visa-Logo-2014-present.jpg"; // Example image
import NavigationButton from "../components/navigationButton.js";

function PurchaseTicketsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // State variables
  const [cart, setCart] = useState(location.state?.cart || []);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [isCardValid, setIsCardValid] = useState(true);

  // Handle payment type selection
  const handlePaymentChange = (e) => {
    const paymentType = e.target.value;
    setSelectedPayment(paymentType);

    if (paymentType === "Credit Card") {
      setPaymentImage(paymentImage1);
    } else if (paymentType === "PayPal") {
      setPaymentImage(paymentImage2);
    } else {
      setPaymentImage(null);
    }
  };

  // Regex validation for card number
  const handleCardNumberChange = (e) => {
    const cardInput = e.target.value;
    const regex = /^[0-9]{16}$/;
    setCardNumber(cardInput);
    setIsCardValid(regex.test(cardInput));
  };

  // Remove item from cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Save cart state in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Sidebar />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        {/* Left Section - Payment */}
        <div
          style={{
            width: "40%",
            maxWidth: "600px",
            margin: "20px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#40826D",
            color: "white",
          }}
        >
          <h2>Payment Details</h2>
          <select
            value={selectedPayment}
            onChange={handlePaymentChange}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              fontSize: "16px",
              borderRadius: "5px",
            }}
          >
            <option value="">Select Payment Option</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
          {paymentImage && (
            <img
              src={paymentImage}
              alt="Payment Method"
              style={{
                width: "80px",
                height: "40px",
                margin: "10px 0",
              }}
            />
          )}
          <div>
            <label htmlFor="card-number" style={{ display: "block" }}>
              Card Number
            </label>
            <input
              id="card-number"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
              }}
            />
            {!isCardValid && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Invalid card number
              </p>
            )}
          </div>
          <h3>Order Summary</h3>
          <p>Subtotal: ${cart.reduce((acc, item) => acc + item.price, 0)}</p>
          <p>Handling Fee: $3.99</p>
          <p>Tax: $2.99</p>
          <h4>
            Total: $
            {(
              cart.reduce((acc, item) => acc + item.price, 0) +
              3.99 +
              2.99
            ).toFixed(2)}
          </h4>
        </div>

        {/* Right Section - Cart */}
        <div
          style={{
            width: "40%",
            maxWidth: "600px",
            margin: "20px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#40826D",
            color: "white",
          }}
        >
          <h2>Your Cart</h2>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#FEFEFE",
                color: "black",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
              }}
            >
              <p>Ticket #{item.ticketId}</p>
              <p>{item.details}</p>
              <p>${item.price}</p>
              <button
                onClick={() => handleRemoveFromCart(index)}
                style={{
                  backgroundColor: "#D9534F",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <NavigationButton
            text="Back to Browse"
            path="/browse"
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              marginTop: "10px",
              display: "block",
              textAlign: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PurchaseTicketsPage;
