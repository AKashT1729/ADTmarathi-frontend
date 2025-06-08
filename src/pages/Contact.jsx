import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white flex  px-2 py-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {/* Header with Back Arrow and Title */}
        <div className="flex items-center mb-4 h-14 bg-green-100 rounded-md px-3">
          <button className="text-xl text-gray-600 mr-2 p-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdKeyboardBackspace />
          </button>

          <h1 className="flex-1 text-center font-semibold text-lg text-gray-800">
            Contact
          </h1>
        </div>

        {/* Title and Description */}
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
        {/* Form */}
        <form className="flex flex-col items-center gap-4 ">
          <input
            type="text"
            placeholder="Your Name"
            className="w-9/10 h-12 bg-[#EAF4EA] p-3 rounded-md text-center text-sm placeholder-gray-700 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-9/10 h-12 bg-[#EAF4EA] p-3 rounded-md text-center text-sm placeholder-gray-700 outline-none"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-9/10 bg-[#EAF4EA] p-3 rounded-md text-center text-sm placeholder-gray-700 outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-9/10 h-12 bg-[#74c69d] hover:bg-[#5cb984] text-white font-semibold py-3 rounded-md text-sm transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
