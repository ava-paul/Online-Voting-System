// src/components/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="m-5" style={{paddingLeft:'200px',paddingRight:'200px'}}>
      <h1 style={{ background: 'linear-gradient(to right, #068372, #164392, #1e01a0)', padding: '10px' }}>About Us</h1>
      <div style={{padding:'20px'}}>
        <p>
       
Our Online Voting System provides a secure, convenient, and anonymous way for users to participate in elections. Built with user accessibility and security as top priorities, this system is designed to ensure that every vote counts in a trustworthy and efficient manner.
<br/> <br/><br/>
<b>Key Features:</b><br/>
- <b>Secure Authentication</b>: Each user is verified through a two-step process, including card scanning and fingerprint authentication, ensuring that only authorized users can vote.
<br/>- <b>Anonymity Guaranteed</b>: The system employs robust encryption to keep every vote private and untraceable, protecting voter anonymity at every step.
<br/>- <b>Real-Time Results</b>: Votes are counted in real-time, offering instant feedback for eligible participants once voting concludes.
<br/>- <b>Easy to Use</b>: A user-friendly interface allows voters to navigate through the voting process easily, even for those unfamiliar with technology.
<br/>- <b>Accessibility</b>: Designed to accommodate all users, including those with special needs, so everyone can exercise their right to vote comfortably.
<br/><br/>
<b>Why Choose Our System?</b><br/>
Our Online Voting System goes beyond traditional methods by offering convenience without sacrificing security. Here the difference between this system and the traditional manner is that the user is authorized by verifying their fingerprint. So there will be no anomaly. No duplicate or false vote will be entertained.

        </p>
      </div>
    </div>
  );
};

export default AboutUs;
