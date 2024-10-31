import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScanCard = () => {
  const [show, setShow] = useState(false);
  const [vote, setVote] = useState(0);
  const [cardId, setCardId] = useState(null);
  const [cardfp, setCardfp] = useState(null);
  const [cardAbility, setCardAbility] = useState(null);
  const [cardScanned, setCardScanned] = useState(false);
  const [cardname, setCardname] = useState(null);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [wrongFingerprint, setWrongFingerprint] = useState(false);
  const [showVoteButton, setShowVoteButton] = useState(false);
  const [showVotingInterface, setShowVotingInterface] = useState(false);
  const [attemptCount, setAttemptCount] = useState(3);
  const [showCannotVote, setShowCannotVote] = useState(false);
  const fixfp = 'dfv43767ufghd2hf74hfc63';
  const navigate = useNavigate();
  const [votedCandidates, setVotedCandidates] = useState(new Set()); 

  const candidates = [
    { id: 1, name: 'Candidate A', photo: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Candidate B', photo: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Candidate C', photo: 'https://via.placeholder.com/50' },
  ];

  useEffect(() => {
    if (cardAbility === 0) {
      setShowCannotVote(true);
      setShow(false);
      setTimeout(() => {
        setShowCannotVote(false);
        navigate('/');  
      }, 5000);
    } else if (cardAbility === 1) {
      setShow(true); 
    }
  }, [cardAbility, navigate]);


  const fetchCardId = () => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => {
        setCardId(data.id);
        setCardname(data.name);
        setCardfp(data.fp);
        setCardAbility(data.ability);
        console.log("id:"+data.id);
        console.log("ability1=" +data.ability);
      })
      .catch(err => {
        console.error('Error fetching card ID:', err);
      });
      if(cardAbility===0){
        setShow(false);
        console.log("ability=" +cardAbility);
      }
      
      // else if(cardAbility===1){
      //   setShowCannotVote(true);
      // }
      
  };

  const handleOpen = () => {
    fetchCardId();
    setShow(true);
  };

  const handleOk = () => {
    setShow(false);
    setCardScanned(true); 
  };

  const handleTakeFingerprint = () => {
    setShowFingerprint(true);
    if (fixfp === cardfp){}
    else{
      setWrongFingerprint(true);
      setShowFingerprint(false);
    }
    
  };

  const handleNext = () => {
    if (fixfp === cardfp) {
      setShowFingerprint(false);
      setShowVoteButton(true);
    } else {
      const remainingAttempts = attemptCount - 1;
      setAttemptCount(remainingAttempts);
      setShowFingerprint(false);
      setWrongFingerprint(false); 
      setCardScanned(true); 
    }
  };

  const handleVote = () => {
    setShowVotingInterface(true);
  };
  const blockVote = () => {
    setCardAbility(0);
    console.log("no attempts");
    fetch('http://localhost:5000/block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId: cardId,
        ability: 0
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('ability recorded:', data);
      })
      .catch(error => {
        console.error('Error recording ability:', error);
      });
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  const handleCandidateVote = (candidateId) => {
    setVote(candidateId);
    setVotedCandidates((prev) => new Set(prev).add(candidateId)); 
    fetch('http://localhost:5000/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId: cardId,
        vote: candidateId,
        ability: 0
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Vote recorded:', data);
      })
      .catch(error => {
        console.error('Error recording vote:', error);
      });
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };

  useEffect(() => {
    if (attemptCount === 0) {
      const timer = setTimeout(() => {
        navigate('/'); 
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [attemptCount, navigate]);

  const handleCloseNoAttempts = () => {
    blockVote();
    setShow(false);
    navigate('/'); 
  };

  return (
    <div className="container text-center my-5">
      <div className="box" style={{ background: 'linear-gradient(to right, #068372, #164392, #1e01a0)', borderRadius: '10px', boxShadow: '-5px -5px 15px rgba(0, 0, 0, 0.3)', paddingBottom: '20px', paddingTop: '30px' }}>

        {/* Scan Card Section */}
        {!cardScanned && (
          <div className="smaller-box mx-auto p-4 mb-4 shadow" style={{ color: 'white', backgroundColor: 'rgb(247, 229, 197)', width: '30rem', borderRadius: '10px' }}>
            <div className="display-4 fw-bold mb-4 scan-card-heading">Scan Your Card</div>
            <p className="lead mb-4 text-black"><b>Please click the button below to scan your card.</b></p>
            <button className="btn btn-lg mb-4" style={{ backgroundColor: 'rgb(10, 29, 83)', color: 'white' }} onClick={handleOpen}>
              Scan your card
            </button>
          </div>
        )}

          {/* if the user can not vote */}
        {cardAbility===0 &&(
          <div className="modal show d-block fade" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: '15px', backgroundColor: '#fff' }}>
                <div className="modal-header text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }}>
                  <h5 className="modal-title">Voting Restriction</h5>
                </div>
                <div className="modal-body">
                  <p className="text-muted">You cannot vote.</p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* if Card Scanned */}
        {show && (
          <div className="modal show d-block fade" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content" style={{ borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="modal-header text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }}>
                  <h5 className="modal-title">Card Scanned</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShow(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="text-muted">Your card ID: <strong>{cardId}</strong></p>
                </div>
                <div className="modal-footer">
                  <button className="btn text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }} onClick={handleOk}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Information Section */}
        {cardScanned && !showVoteButton && (
          <div className="card mt-4 shadow mx-auto" style={{ backgroundColor: 'white', width: '30rem', borderRadius: '10px' }}>
            <div className="card-body">
              <h2 className="card-title">Card Information</h2>
              {cardId ? (
                <div>
                  <p>Card ID: <strong>{cardId}</strong></p>
                  <p>Name: <strong>{cardname}</strong></p>
                  <button
                    className="btn my-3 text-white"
                    style={{ backgroundColor: "rgb(10, 29, 83)" }}
                    onClick={handleTakeFingerprint}
                    disabled={attemptCount <= 0}
                  >
                    Take fingerprint
                  </button>
                  {attemptCount > 0 && <p className="text-muted">Remaining attempts: {attemptCount}</p>}
                  {attemptCount <= 0 && <p className="text-danger">No remaining attempts.</p>}
                </div>
              ) : (
                <p>Loading card details...</p>
              )}
            </div>
          </div>
        )}




        { wrongFingerprint && !showFingerprint &&(
            <div className="modal show d-block fade" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="modal-header text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }}>
                  <h5 className="modal-title">Fingerprint Not Scanned</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowFingerprint(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="text-muted">Fingerprint is not matched.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}




        {/* Fingerprint if matched*/}
        {showFingerprint && (
          <div className="modal show d-block fade" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="modal-header text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }}>
                  <h5 className="modal-title">Fingerprint Scanned</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowFingerprint(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="text-muted">Fingerprint successfully taken.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vote Button (after fingerprint scan) */}
        {showVoteButton && (
          <div className="my-4">
            <div className="my-4 heading"> LAST VOTING STEP </div>
            <button className="btn text-white btn-lg mt-5" style={{ backgroundColor: "rgb(10, 29, 83)", border: '1px solid white', boxShadow: '0 0 1px 1px rgba(255, 255, 255, 0.2)' }} onClick={handleVote}>
              Click here to vote
            </button>
          </div>
        )}

        {/* Voting Interface */}
        {showVotingInterface && (
          <div className="modal show d-block fade" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content" style={{ borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="modal-header text-white" style={{ backgroundColor: "rgb(10, 29, 83)" }}>
                  <h5 className="modal-title">Vote for a Candidate</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowVotingInterface(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Photo</th>
                          <th>Candidate ID</th>
                          <th>Vote</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidates.map(candidate => (
                          <tr key={candidate.id}>
                            <td>
                              <img src={candidate.photo} alt={`Candidate ${candidate.id}`} style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{candidate.id}</td>
                            <td>
                              <button
                                className={`btn ${votedCandidates.has(candidate.id) ? 'text-white' : 'btn-primary'}`}
                                onClick={() => handleCandidateVote(candidate.id)}
                                disabled={votedCandidates.has(candidate.id)} 
                              >
                                {votedCandidates.has(candidate.id) ? 'Voted' : 'Vote'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowVotingInterface(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Attempts Left */}
        {attemptCount === 0 && (
          <div className="modal show d-block fade" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">No Attempts Left</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseNoAttempts}></button>
                </div>
                <div className="modal-body">
                  <p className="text-muted">You cannot vote anymore.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={handleCloseNoAttempts}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanCard;
