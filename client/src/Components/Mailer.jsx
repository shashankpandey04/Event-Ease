import React, { useState } from "react";
import axios from "axios";

export default function Mailer() {
  const [loading, setLoading] = useState(false);

  const sendEmails = async () => {
    setLoading(true); // Start loader

    try {
      const response = await axios.get('http://localhost:3000/api/user/sendEmails');
      if (response.status === 200) {
        alert("Emails sent successfully");
      } else {
        alert("Failed to send emails");
      }
    } catch (error) {
      alert("An error occurred while sending emails");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <button
      className={`text-white bg-purple-900 hover:bg-purple-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        loading ? 'cursor-not-allowed opacity-50' : ''
      }`}
      type="button"
      onClick={sendEmails}
      disabled={loading} // Disable button while loading
    >
      {loading ? 'Sending Emails...' : 'Send Emails'}
    </button>
  );
}
