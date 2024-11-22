import React from 'react'; 
import trainPhoto from '../assets/train.jpg'; // photo for login page
import NavigationButton from '../components/navigationButton.js'; // nav button
import Header from '../components/header.js'; // header

function SignUp({ onNavigate }) {
  return (
    <div>
      {/* Header component */}
      <Header />

      {/* Flex container */}
      <div className="row no-gutters" style={{ flex: 1, display: 'flex', height: '100vh' }}>

        {/* Left column for SignUp form */}
        <div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            padding: '20px',
            marginTop: '40px', 
            flexDirection: 'column'
          }}
        >
          <div 
            className="bg-light border border-light rounded d-flex flex-column align-items-start"
            style={{ 
              width: '100%',
              maxWidth: '100%',
              padding: '40px', 
              boxSizing: 'border-box',
              textAlign: 'left', 
              border: '2px solid #40826D',
              borderRadius: '10px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              gridAutoRows: 'auto',
            }}
          >
            {/* Sign Up Message */}
            <h2 style={{ 
              fontFamily: 'Courier', 
              fontSize: '2rem', 
              marginBottom: '20px', 
              textAlign: 'center',
              gridColumn: 'span 2'
            }}>Sign Up</h2>

            <h4 style={{ fontFamily: 'Arial' }}>Enter First Name:</h4>
            {/* First Name Input */}
            <input
              type="firstname"
              placeholder="First Name"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            />

            <h4 style={{ fontFamily: 'Arial' }}>Enter Last Name:</h4>
            {/* Last Name Input */}
            <input
              type="lastname"
              placeholder="Last Name"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            />

            <h4 style={{ fontFamily: 'Arial' }}>Enter Phone Number:</h4>
            {/* Phone Number Input */}
            <input
              type="tel"
              placeholder="000-000-0000"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              maxLength="12" // Optional to enforce the format length
            />

            <h4 style={{ fontFamily: 'Arial' }}>Enter Email:</h4>
            {/* Email Input */}
            <input
              type="text"
              placeholder="Email"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            />

            <h4 style={{ fontFamily: 'Arial' }}>Enter Password:</h4>
            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            />

            <h4 style={{ fontFamily: 'Arial' }}>Confirm Password:</h4>
            {/* Confirm Password Input */}
            <input
              type="password"
              placeholder="Confirm Password"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            />
          </div>

          {/* Buttons below the form */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              width: '100%',
              marginTop: '20px', 
              alignItems: 'center'
            }}
          >
            {/* Create Account Button */}
            <NavigationButton
              text="Create Account"
              path="/home" 
              style={{
                width: '300px',
                backgroundColor: 'black',
                color: 'white',
                marginBottom: '10px',
                padding: '10px',
                textAlign: 'center',
                marginBottom: '50px'
              }}
            />

            {/* Sign-Up Option */}
            <div 
              style={{ 
                fontSize: '16px', 
                marginTop: '10px', 
                textAlign: 'center',
              }}
            >
              Have an account?{' '}
              <NavigationButton
                text="Return to Login"
                path="/"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  marginTop: '10px',
                  padding: '10px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right column for train photo */}
        <div 
          style={{
            flex: 1,
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          <img
            src={trainPhoto}
            alt="train photo"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
