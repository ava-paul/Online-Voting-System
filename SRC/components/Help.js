// src/components/Help.js
import React, { useState } from 'react';

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Help & FAQs</h1>

      <div className="accordion-item mb-3 shadow-sm border-0">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${activeIndex === 0 ? '' : 'collapsed'}`}
            onClick={() => toggleAccordion(0)}
            style={{
              backgroundColor:'white',
              color: 'black',
              fontWeight: 'bold',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            How do I register?  &#x27A8;
          </button>
        </h2>
        {activeIndex === 0 && (
          <div className="accordion-collapse collapse show">
            <div className="accordion-body p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
              To register, click the "Register" button on the top-right of the page and fill in your details.
            </div>
          </div>
        )}
      </div>

      <div className="accordion-item mb-3 shadow-sm border-0">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${activeIndex === 1 ? '' : 'collapsed'}`}
            onClick={() => toggleAccordion(1)}
            style={{
              // background: 'linear-gradient(135deg, #4a90e2, #007bff)',
              backgroundColor:'white',
              color: 'black',
              fontWeight: 'bold',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            How do I vote?  &#x27A8;
          </button>
        </h2>
        {activeIndex === 1 && (
          <div className="accordion-collapse collapse show">
            <div className="accordion-body p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
              Once you enter the room, you just have to scan your card and then give your fingerprint of your left thumb. Then, select your preferred voter.
            </div>
          </div>
        )}
      </div>

      <div className="accordion-item mb-3 shadow-sm border-0">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${activeIndex === 2 ? '' : 'collapsed'}`}
            onClick={() => toggleAccordion(2)}
            style={{
              backgroundColor:'white',
              color: 'black',
              fontWeight: 'bold',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            Is my vote anonymous? &#x27A8;
          </button>
        </h2>
        {activeIndex === 2 && (
          <div className="accordion-collapse collapse show">
            <div className="accordion-body p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
              Yes, all votes are kept anonymous and are securely processed to ensure privacy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
