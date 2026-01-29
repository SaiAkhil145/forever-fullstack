import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="border-t bg-white">
      {/* Title Section */}
      <div className="text-2xl text-center pt-12">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="text-gray-500 text-sm mt-2">
          Get to know who we are and what drives us
        </p>
      </div>

      {/* Content Section */}
      <div className="my-14 px-4 sm:px-8 lg:px-20 flex flex-col md:flex-row items-center gap-14">
        {/* Image (Smaller + Styled) */}
        <div className="md:w-2/5 flex justify-center">
          <img
            src={assets.about_img}
            alt="About Us"
            className="w-64 sm:w-72 md:w-80 rounded-xl shadow-xl object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-3/5 space-y-6 text-gray-600 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-800">
            Who We Are
          </h2>
          <p>
            We are a customer-focused e-commerce platform dedicated to
            bringing you premium products with a smooth, secure, and
            enjoyable shopping experience. Our platform blends quality,
            innovation, and affordability to meet modern shopping needs.
          </p>

          <p>
            From fashion-forward collections to daily essentials, we
            carefully curate every product to ensure it meets our
            high standards of design, durability, and value.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            Our Mission
          </h2>
          <p>
            Our mission is to redefine online shopping by making it
            simple, fast, and trustworthy. We aim to build long-term
            relationships with our customers through transparency,
            reliability, and exceptional service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">
            Why Choose Us
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Premium quality products
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Fast & reliable delivery
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Secure payment methods
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              24/7 customer support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Easy returns & refunds
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Trusted by thousands
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-14">
        <div className="px-4 sm:px-8 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-gray-800">10K+</h3>
            <p className="text-gray-500">Happy Customers</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-gray-800">500+</h3>
            <p className="text-gray-500">Products</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-gray-800">50+</h3>
            <p className="text-gray-500">Brands</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-gray-800">24/7</h3>
            <p className="text-gray-500">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
