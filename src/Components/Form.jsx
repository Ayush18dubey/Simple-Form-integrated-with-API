import React, { useState } from "react";
import "../Style/Form.css"; 

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const validateEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.email) {
      setResponseMsg("Email is required!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setResponseMsg("Invalid Email Format!");
      return;
    }

    const apiUrl = "https://vernanbackend.ezlab.in/api/contact-us/";

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        setResponseMsg("Form Submitted Successfully ");
        setFormData({ email: "", name: "", phone: "", message: "" });
      } else {
        setResponseMsg("Something went wrong ");
      }

    } catch (error) {
      setResponseMsg("Server Error ");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name"
        value={formData.name} onChange={handleChange} />

      <input type="email" name="email" placeholder="Email *"
        value={formData.email} onChange={handleChange} required />

      <input type="tel" name="phone" placeholder="Phone"
        value={formData.phone} onChange={handleChange} />

      <textarea name="message" placeholder="Message"
        value={formData.message} onChange={handleChange}></textarea>

      <button type="submit">Submit</button>

      {responseMsg && <p className="response">{responseMsg}</p>}
    </form>
  );
};

export default Form;
