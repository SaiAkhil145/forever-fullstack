import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="border-t bg-white">
      {/* Title */}
      <div className="text-2xl text-center pt-12">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="text-gray-500 text-sm mt-2">
          We’d love to hear from you. Let’s get in touch!
        </p>
      </div>

      {/* Main Section */}
      <div className="my-14 px-4 sm:px-8 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="w-64 sm:w-72 md:w-80 rounded-xl shadow-xl object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Get In Touch
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Have questions, feedback, or need support? Our team is always
            ready to help you. Reach out to us and we’ll respond quickly.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black">
                <FaMapMarkerAlt />
              </div>
              <p className="text-gray-600">
                123, Business Street, Hyderabad, India
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black">
                <FaPhoneAlt />
              </div>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black">
                <FaEnvelope />
              </div>
              <p className="text-gray-600">support@yourstore.com</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="font-medium text-gray-800">Working Hours</p>
            <p className="text-gray-600">Mon - Sat : 9:00 AM - 8:00 PM</p>
            <p className="text-gray-600">Sunday : Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Send us a message
          </h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-10 text-center">
        <p className="text-gray-600">
          We’re always here to support you. Thank you for connecting with us!
        </p>
      </div>
    </div>
  );
};

export default Contact;
