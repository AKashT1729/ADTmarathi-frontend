import React, { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/v1/contactus/addContact', formData);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you soon.'
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      // Handle specific error cases
      if (error.response?.status === 429) {
        errorMessage = error.response.data.message || 'Daily message limit exceeded. You can only send 2 messages per day. Please try again tomorrow.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-white flex  px-2 py-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center mb-4 h-14 bg-green-100 rounded-md px-3">
          <button
            className="text-xl text-gray-600 mr-2 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <MdKeyboardBackspace />
          </button>

          <h1 className="flex-1 text-center font-semibold text-lg text-gray-800">
            Contact
          </h1>
        </div>

        <div className="w-full ml-[10px]">
          <h2 className="text-xl font-bold mb-4 text-green-700">
            Get in touch
          </h2>
          <p className="text-sm text-gray-700 my-2">
            We're here to help! Whether you have questions about our farm,
            products, or just want to say hello, feel free to reach out. We'll
            get back to you as soon as possible.
          </p>
        </div>
        {/* Status Message */}
        {submitStatus && (
          <div className={`w-full ml-[10px] p-3 rounded-md text-sm mb-4 ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-9/10 h-12 bg-[#EAF4EA] p-3 rounded-md text-center text-sm placeholder-gray-700 outline-none focus:ring-2 focus:ring-green-300"
            disabled={isSubmitting}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="w-9/10 h-12 bg-[#EAF4EA] p-3 rounded-md text-center text-sm placeholder-gray-700 outline-none focus:ring-2 focus:ring-green-300"
            disabled={isSubmitting}
          />
          <textarea
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            className="w-9/10 bg-[#EAF4EA] p-3 rounded-md text-center text-sm placeholder-gray-700 outline-none resize-none focus:ring-2 focus:ring-green-300"
            disabled={isSubmitting}
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-9/10 h-12 font-semibold py-3 rounded-md text-sm transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                : 'bg-[#74c69d] hover:bg-[#5cb984] text-white'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
