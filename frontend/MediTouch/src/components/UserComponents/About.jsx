import React from 'react'

const About = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h1>Liscence</h1>
      <img 
        src="https://i.imgur.com/SalyqC4.png" 
        alt="First about image" 
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <h1>Registration Certificate</h1>
      <img 
        src="https://i.imgur.com/bUfJrrC.png" 
        alt="Second about image" 
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default About