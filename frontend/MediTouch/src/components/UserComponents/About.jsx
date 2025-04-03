import React from 'react';

const About = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px', 
      maxWidth: '800px', 
      margin: 'auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Project Heading */}
      <h1 style={{ color: '#2c3e50', fontSize: '2.5rem' }}>About MediTouch</h1>
      
      {/* Description */}
      <p style={{ 
        textAlign: 'center', 
        fontSize: '1.2rem', 
        color: '#555', 
        lineHeight: '1.6', 
        maxWidth: '700px' 
      }}>
        <strong>MediTouch</strong> is a revolutionary healthcare solution designed to streamline patient management, enhance medical record accessibility, 
        and improve doctor-patient interactions. Our mission is to integrate technology with healthcare to create an efficient, 
        reliable, and secure system that benefits both healthcare providers and patients.
      </p>

      {/* License Section */}
      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        marginTop: '30px'
      }}>
        <h1 style={{ color: '#2980b9' }}>License</h1>
        <img 
          src="https://i.imgur.com/aCxxesk.png" 
          alt="MediTouch License" 
          style={{
            width: '100%', 
            maxWidth: '600px', 
            borderRadius: '8px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
          }} 
        />
      </div>

      {/* Registration Certificate Section */}
      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        marginTop: '30px'
      }}>
        <h1 style={{ color: '#27ae60' }}>Registration Certificate</h1>
        <img 
          src="https://i.imgur.com/bUfJrrC.png" 
          alt="MediTouch Registration Certificate" 
          style={{
            width: '100%', 
            maxWidth: '600px', 
            borderRadius: '8px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
          }} 
        />
      </div>
    </div>
  );
};

export default About;
