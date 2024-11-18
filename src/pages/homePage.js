import React from 'react';
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header
import Sidebar from '../components/sidebar.js'; // sidebar

// Home Page Component
function Home() {
  return (
    <>
      {/* Header component */}
      <Header />

      {/* Sidebar component */}
      <Sidebar />

      {/* Profile Div */}
      <div
        className="profile-div"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          float: 'left',
          width: '40%',
          maxWidth: '600px',
          marginTop: '2%',
          marginLeft: '5%',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#40826D',
        }}
      >
        {/* div that holds user's tickets */}
        <div
          className="ticket-div"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '95%',
            padding: '5px',
            border: '1px solid black',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF',
          }}
        >

      {/* Profile Page Button at the top-right corner */}
      <div style={{
        position: 'absolute',
        top: '35px',
        right: '40px',
        zIndex: 1000
      }}>        

      </div>

      {/* div that holds profile card */}
      <div className="profile-div" style={{
        display:'flex',
        flexDirection:"column",
        justifyContent:"center", 
        float:'left',
        width:"40%", 
        maxWidth:"600px",
        marginTop: "2%", 
        marginLeft: "5%", 
        padding:"10px", 
        borderRadius:"5px", 
        backgroundColor:"#40826D"
      }}>

        {/* div that holds user's tickets */}
        <div className="ticket-div" style={{
          display:'flex',
          flexDirection:'column',
          width:"95%",
          padding:"5px",
          border:"1px solid black",
          borderRadius:"5px", 
          backgroundColor:"#FFFFFF"
        }}>

          <h4 className="ticket-list">List of tickets...</h4>
        </div>
        {/* Navigate to My Tickets */}
        <NavigationButton 
          text="My Tickets" 
          path="/myTickets" 
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            marginTop: '20px',
          }}
        />
      </div>


      <input
        type="text"
        placeholder="From"
        style={{
          width: '75%',
          padding: '10px',
          margin: '5px',
          fontSize: '16px',
          border: '1px solid black',
          borderRadius: '5px',
        }}
      />
      
      <input
        type="text"
        placeholder="To"
        style={{
          width: '75%',
          padding: '10px',
          margin: '5px',
          fontSize: '16px',
          border: '1px solid black',
          borderRadius: '5px',
        }}
      />
      
      <div 
        className="find-train-Div" 
        style={{
          display:'flex',
          flexDirection:"column",
          justifyContent:"center", 
          marginLeft: "50%", 
          marginTop:"2%", 
          width:"40%", 
          maxWidth:"600px",
          padding:"10px", 
          borderRadius:"5px", 
          backgroundColor:"#40826D"
        }}
      >

        <div>
          {/* Navigate to Browse Trains */}
          <NavigationButton
            text="Browse Trains"
            path="/browse"
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              margin: '5px',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Home;

