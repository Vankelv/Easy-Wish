import React, { useState } from 'react';

const Form = () => {
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setSenderName('');
  };

  return (
    <div className="w-full p-8 bg-white">
      <h2 className="text-xl font-semibold mb-4">Submit Your Birthday Wish</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="message" className="block mb-1">Your Message:</label>
          <textarea
            id="message"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={100}
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senderName" className="block mb-1">Your Name:</label>
          <input
            type="text"
            id="senderName"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-violet text-white w-full px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
