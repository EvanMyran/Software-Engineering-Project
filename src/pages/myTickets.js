import React from "react";
import NavigationButton from "../components/navigationButton.js"; // nav button
import Header from "../components/header.js"; // header
import Sidebar from "../components/sidebar.js"; // sidebar
import QRCode from "../components/QRCode.js"; // Assuming you're using this library for QR code generation

const MyTickets = ({ tickets, loading }) => {
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

      <div style={styles.ticketHeader}>
        <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
        <div style={styles.ticketRoute}>
          <p>
            <strong>{ticket.origin}</strong> →{" "}
            <strong>{ticket.destination}</strong>
          </p>
        </div>
      </div>

      <div style={styles.ticketDetails}>
        <p>
          <strong>Departure:</strong> {ticket.departureDate}
        </p>
        <p>
          <strong>Arrival:</strong> {ticket.arrivalDate}
        </p>

        {/* Display QR code or loading state */}
        <QRCode/>

        
      </div>


      {/* Profile Card Section */}
      <div className="profile-div" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        float: 'right',
        width: '40%',
        maxWidth: '600px',
        marginTop: '2%',
        marginLeft: '5%',
        padding: '10px',
        border:'1px solid black',
        borderRadius: '5px',
        backgroundColor: '#40826D',
      }}>
        {/* Ticket Display Section */}
        <div className="ticket-div" onClick={() => navigate('/myTickets')}
         style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:"center",
          cursor:"pointer",
          width: '95%',
          padding: '5px',
          paddingBottom: "15px",
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#FEFEFE',
        }}>

      {/* Tickets Wrapper */}
      <div style={styles.ticketsWrapper}>
        {loading ? (
          <p>Loading tickets...</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={styles.ticketContainer}
              onClick={() => console.log(`Navigate to ticket ${ticket.id}`)} // Example navigation
            >
              <div style={styles.ticketHeader}>
                <h2 style={styles.ticketTitle}>Ticket ID: {ticket.id}</h2>
                <div style={styles.ticketRoute}>
                  <p>
                    <strong>{ticket.origin}</strong> →{" "}
                    <strong>{ticket.destination}</strong>
                  </p>
                </div>
              </div>

              <div style={styles.ticketDetails}>
                <p>
                  <strong>Departure:</strong> {ticket.departureDate}
                </p>
                <p>
                  <strong>Arrival:</strong> {ticket.arrivalDate}
                </p>

                {/* QR Code */}
                <QRCode value={`Ticket-${ticket.id}`} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Styles for the ticket display
const styles = {
  ticketsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "center", // Center tickets within the wrapper
  },
  ticketContainer: {
    width: "400px",
    border: "5px solid #000",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "10px",
  },
  ticketHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  ticketTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
  },
  ticketRoute: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "black",
  },
  ticketDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

export default MyTickets;
