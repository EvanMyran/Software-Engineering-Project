// Header that is displayed at the top of every page
import React from 'react';
import logo from '../assets/rail.png';  

function Header() {
    return (
        <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        {/* Header Section */}
        <header style={{
            height: '80px',
            backgroundColor: '#40826D',
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
        }}>
          {/* Logo */}
          <img 
            src={logo} 
            alt="Train Logo" 
            style={{ height: '60px', marginLeft: '20px', marginRight: '20px' }} 
          />
  
          {/* Title */}
          <p style={{
            fontSize: '3rem',    
            fontWeight: 'bold',  
            margin: 0,           
            fontFamily: 'Courier', 
            marginLeft: '10px',  
          }}>
            Train Track
          </p>
        </header>
      </div>
    );
}

export default Header;