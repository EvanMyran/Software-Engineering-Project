import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ cart, isCardValid, isCodeValid, isDateValid, selectedPayment }) => {
  const navigate = useNavigate();

  const saveTicketsToDatabase = async () => {
  try {
    const user_id = req.session.user.userid;
    const ticketsToSave = cart.map((ticket) => ({
      trainId: ticket.trainId, // Add the train ID
      departureTime: ticket.departureTime, // Add departure time
      arrivalTime: ticket.arrivalTime, // Add arrival time
      seatNumber: ticket.seatNumber, // Add seat number
      qrCode: ticket.qrCode || null, // Generate or leave as null
      price: ticket.price, // Add ticket price
    }));

    const response = await fetch('http://localhost:3000/api/save-tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tickets: ticketsToSave, user_id }), // Add user ID
    });

    if (!response.ok) {
      throw new Error('Failed to save tickets.');
    }

    console.log('Tickets saved successfully.');
  } catch (error) {
    console.error('Error saving tickets:', error.message);
  }
};

  const handleClick = async () => {
    console.log("Card Valid:", isCardValid);
    console.log("Code Valid:", isCodeValid);
    console.log("Date Valid:", isDateValid);
    console.log("Cart:", cart);
    console.log("Selected Payment:", selectedPayment);
  
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    if (selectedPayment === "New Credit Card") {
      if (!isCardValid) {
        alert("Please enter a valid card number.");
        return;
      }
      if (!isCodeValid) {
        alert("Please enter a valid security code.");
        return;
      }
      if (!isDateValid) {
        alert("Please enter a valid expiration date.");
        return;
      }
    }
    if (cart.length === 0) {
      alert("Must have items in cart to checkout.");
      return;
    }
    // Save tickets to the database
    await saveTicketsToDatabase();
  
    navigate("/success");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
