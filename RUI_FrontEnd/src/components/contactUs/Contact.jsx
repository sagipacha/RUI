import React, { useState } from "react";
import { APIBaseUrl } from "../../config/API";
import axios from "axios";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    const contactUrl = `${APIBaseUrl}/contactUs`;
    try {
      await axios.post(
        contactUrl,
        {
          name,
          email,
          message,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("RUI_user_token")}`,
          },
        }
      );
      setName("");
      setEmail("");
      setMessage("");
      console.log(name, email, message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <p>
          <strong>Name of Owner:</strong> Ori Livne
        </p>
        <p>
          <strong>Email:</strong> orior200@gmail.com
        </p>
        <p>
          <strong>Phone Number:</strong> +972-522989098
        </p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
