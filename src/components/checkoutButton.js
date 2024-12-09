import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ cart, isCardValid, isCodeValid, isDateValid, selectedPayment, userId }) => {
  const navigate = useNavigate();

  const saveTicketsToDatabase = async () => {
    try {
      // Map cart items into Ticket objects or properly structured data
      const ticketsToSave = cart.map((item) => ({
        userId,
        trainId: item.trainId,
        departureTime: item.departureTime,
        arrivalTime: item.arrivalTime,
        seatNumber: item.seatNumber,
        qrCode: null, // Set null or generate as needed
        price: item.price,
      }));

      // Make API request to save tickets
      const response = await fetch('http://localhost:3000/api/save-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets: ticketsToSave }),
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
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    if (selectedPayment === "New Credit Card") {
      if (!isCardValid || !isCodeValid || !isDateValid) {
        alert("Please enter valid payment details.");
        return;
      }
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

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
