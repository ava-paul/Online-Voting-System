// src/components/Home.js
import React from 'react';
import './Home.css';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleVoteClick = () => {
    navigate('/scan-card');
  };

  return (
    <Container className="text-center my-5" >
      <div className="gradient-background">
        <h1 className="fs-10" style={{ fontSize: '50px' }}>Welcome to the Voting System</h1>
        <p>Please click the button below to proceed to voting.</p>
        <Button variant="danger" onClick={handleVoteClick} className="py-3 px-5 button" style={{ fontSize: '30px' }}>
         Click here to vote &#x2794;
        </Button>
      </div>
    </Container>
  );
};

export default Home;
