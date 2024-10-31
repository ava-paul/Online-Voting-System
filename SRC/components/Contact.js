// src/components/Contact.js
import React from 'react';

const Contact = () => {

  return (
    <div className="container my-5 p-4 shadow-sm rounded bg-light">
      <h1 className="text-center mb-4">Contact Us</h1>
      <form >
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control border-primary"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">Email</label>
          <input
            type="email"
            className="form-control border-primary"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label fw-bold">Message</label>
          <textarea
            className="form-control border-primary"
            id="message"
            name="message"
            rows="3"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary fw-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
