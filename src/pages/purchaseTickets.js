// src/pages/purchaseTickets.js
import Payment from '../components/checkoutForm.js'; 
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header.js"; // Header
import Sidebar from "../components/sidebar.js"; // Sidebar
import paymentImage2 from "../assets/paypal_PNG9.png"; // Example image
import paymentImage1 from "../assets/Visa-Logo-2014-present.jpg"; // Example image
import paymentImage3 from "../assets/American-Express-Logo.png"; // Example image
import paymentImage4 from "../assets/Discover-Bank-logo-review-featured-image.png"; // Example image
import paymentImage5 from "../assets/Mastercard-Logo.png"; // Example image
import NavigationButton from "../components/navigationButton.js";
import TrainDetails from '../components/trainDetails.js';
import CheckoutButton from '../components/checkoutButton'; // Import the CheckoutButton

function PurchaseTicketsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket; // Extract the ticket data

  // State variables
  //const { trainCode, selectedSeats } = location.state || {};
  // Destructure variables from location.state
  const { 
    trainCode = '', 
    origin = '', 
    destination = '', 
    departureTime = '', 
    availableSeats = [], 
    selectedSeats = [] 
  } = location.state || {};

  // Include full ticket details in the cart
  const initialCart = selectedSeats.map(seat => ({
    user_id,
    train_id,
    departure_time,
    arrival_time,
    seat_number,
    qr_code,
    price,
  }));
  
  const [cart, setCart] = useState(location.state?.cart || []);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [isCardValid, setIsCardValid] = useState(true);
  const [codeNumber, setCodeNumber] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [dateNumber, setDateNumber] = useState("");
  const [isDateValid, setIsDateValid] = useState(true);

  // Utility function to get card issuer
  const getIssuer = (cardNumber) => {
    if (!cardNumber) return null;
    if (/^4/.test(cardNumber)) return "Visa";
    if (/^5[1-5]/.test(cardNumber)) return "MasterCard";
    if (/^3[47]/.test(cardNumber)) return "American Express";
    if (/^6(?:011|5)/.test(cardNumber)) return "Discover";
    return null;
  };

  // Update payment image when card number changes
  useEffect(() => {
    if (selectedPayment === "New Credit Card") {
      const issuer = getIssuer(cardNumber);
      switch (issuer) {
        case "Visa":
          setPaymentImage(paymentImage1);
          break;
        case "American Express":
          setPaymentImage(paymentImage3);
          break;
        case "Discover":
          setPaymentImage(paymentImage4);
          break;
        case "MasterCard":
          setPaymentImage(paymentImage5);
          break;
        default:
          setPaymentImage(null);
      }
    } else if (selectedPayment === "PayPal") {
      setPaymentImage(paymentImage2);
    } else {
      setPaymentImage(null);
    }
  }, [cardNumber, selectedPayment]);

  // Handle payment option change
  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  // Regex validation for card number
  const handleCardNumberChange = (e) => {
    const cardInput = e.target.value;
    const regex = /^[0-9]{16}$/;
    setCardNumber(cardInput);
    setIsCardValid(regex.test(cardInput));
  };

  // Regex validation for security code
  const handleSecurityCodeChange = (e) => {
    const codeInput = e.target.value;
    const regex = /^[0-9]{3}$/;
    setCodeNumber(codeInput);
    setIsCodeValid(regex.test(codeInput));
  };

  // Regex validation for expiration date
  const handleExpDateChange = (e) => {
    const dateInput = e.target.value;
    const regex = /^[01][0-9]\/[0-9]{2}$/;
    setDateNumber(dateInput);
    setIsDateValid(regex.test(dateInput));
  };

  // Remove item from cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  useEffect(() => {
    setCart(selectedSeats);
  }, [selectedSeats]);

  
  return (
  <div
    style={{
      overflowY: "auto", // Allow vertical scrolling
      height: "100vh",   // Make it full height of the viewport
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
        {/* Payment details section */}
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

        {/* Card input fields */}
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
            <p style={{ color: "red", fontSize: "12px" }}>Invalid card number</p>
          )}
        </div>

        <div>
          <label htmlFor="security-code" style={{ display: "block" }}>
            Security Code
          </label>
          <input
            id="security-code"
            type="text"
            value={codeNumber}
            onChange={handleSecurityCodeChange}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
            }}
          />
          {!isCodeValid && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Invalid security code
            </p>
          )}
        </div>

        <div>
          <label htmlFor="exp-date" style={{ display: "block" }}>
            Expiration Date (mm/yy)
          </label>
          <input
            id="exp-date"
            type="text"
            value={dateNumber}
            onChange={handleExpDateChange}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
            }}
          />
          {!isDateValid && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Invalid expiration date
            </p>
          )}
        </div>
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
        {/* Cart Section */}
        <div
          style={{
            width: "80%",
            padding: "10px",
            backgroundColor: "#40826D",
            color: "white",
          }}
        >
          <h2>Your Cart</h2>
          {cart.length > 0 ? (
            cart.map((ticket, index) => (
              <div key={index} style={{ backgroundColor: "#FEFEFE", color: "black", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
                <h4>Train: {ticket.trainCode}</h4>
                <p><strong>{ticket.origin}</strong> → <strong>{ticket.destination}</strong></p>
                <p>Departure Time: {ticket.departureTime}</p>
                <p>Seat: {ticket.seat}</p>
                <button onClick={() => handleRemoveFromCart(index)} style={{ backgroundColor: "#D9534F", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No seats selected.</p>
          )}
          <h3>Order Summary</h3>
          <p>Subtotal: ${cart.length * 9.99}</p>
          <p>Handling Fee: $3.99</p>
          <p>Tax: $2.99</p>
          <h4>Total: ${(cart.length * 9.99 + 3.99 + 2.99).toFixed(2)}</h4>
        </div>

           
        <CheckoutButton 
            cart={cart} 
            isCardValid={isCardValid} 
            isCodeValid={isCodeValid} 
            isDateValid={isDateValid} 
            selectedPayment={selectedPayment}
          /> {/* Use CheckoutButton */}

        <NavigationButton
          text="Back to Browse"
          path="/browse"
          style={{
            padding: "5px 10px",
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
};

const styles = {
  routeInfo: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

export default PurchaseTicketsPage;
