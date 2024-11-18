const express = require('express'); // required node package
const sqlite3 = require('sqlite3').verbose(); //require package
const QRCode = require('qrcode'); //require package for the qr code generator
const cors = require('cors'); //require cors so frontend and backend play nice
//const bootstrap = require('bootstrap'); //require bootstrap package
const Stripe = require('stripe'); // require stripe for payment simulation
const stripe = Stripe('sk_test_51QKjDaKo2xrmK8G6VK9JHLkL7uKV4tK3dGPVGk7nIvWwZEXIOkPz5N79bbZ7jM0BSuv1OO77jJ0mxLcTCjQXwFgY00NodVXvIH'); // cadence's stripe auth key testing
const app = express(); //instance of our app
const port = 3000; //local hosting port

//middleware to handle JSON and URL-encoded data
// Middleware
app.use(cors());
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

//connect to  database
const db = new sqlite3.Database('.../server/tickets.db');

// Create a payment intent using stripe
app.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount, currency } = req.body;
  
      // Make sure amount and currency are valid and present
      if (!amount || !currency) {
        return res.status(400).json({ error: 'Missing amount or currency' });
      }
  
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // amount in smallest currency unit (e.g., cents)
        currency,
      });
  
      // Send client secret to the frontend
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      // Log the error
      console.error('Payment Intent Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
//Block of code with app endpoints for retireving tickets, not sure if we would want these here as well as the endpoint for the qrcode

/*

//app endpoint to get all tickets for a user
app.get('USER ID PATH LOCATION', (req, res) => {
    const userId = REQ PARAMS FOR USERID;
    db.all('SELECT NUMBER OF TICKETS FROM USERID', [userId], (err, rows) => {
        if (err) { //catch error
            return res.status(500).json({ error: 'Error in app endpoint to get all tickets for a user' }); //report error
        }
        res.json(rows); //report rows of users tickets
    });
});

//app endpoint to get details for a specific ticket
app.get('TICKETID PATHL OCATION', (req, res) => {
    const ticketId = REQ PARAMS FOR TICKETSID;
    db.get('SELECT TICKET FROM TICKETID', [ticketId], (err, row) => {
        if (err) { //catch errors
            return res.status(500).json({ error: 'Error in app endpoint to get details for a specific ticket' }); //report error
        }
        if (!row) {
            return res.status(404).json({ error: 'Ticket not found' }); //report wether or not ticket exists
        }
        res.json(row); //report row of ticket
    });
});

//endpoint to generate QR code for a ticket
app.get('/api/qr/:ticketId', (req, res) => {
    const ticketId = req.params.ticketId; // Get ticket ID from request parameters

    // Fetch ticket data from database based on ticket ID
    db.get('SELECT * FROM tickets WHERE id = ?', [ticketId], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ error: 'Ticket not found' }); // Error if no ticket found
        }

        // Generate QR code with ticket info
        QRCode.toDataURL(JSON.stringify(row), (err, url) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to generate QR code' });
            }
            res.json({ qrCode: url }); // Return QR code data URL
        });
    });
});
*/

// Endpoint to generate QR code for a ticket
app.get('/api/qr/:ticketId', (req, res) => {
    const ticketId = req.params.ticketId;

    // Fetch ticket data from the database
    db.get('SELECT * FROM tickets WHERE id = ?', [ticketId], (err, row) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Generate a QR code containing the ticket info
        QRCode.toDataURL(JSON.stringify(row), (err, url) => {
            if (err) {
                console.error("QR Code generation error:", err);
                return res.status(500).json({ error: 'Failed to generate QR code' });
            }
            res.json({ qrCode: url });  // Return the QR code as a data URL
        });
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
