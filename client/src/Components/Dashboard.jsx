import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const heroImages = [  // Array to store hero image URLs (replace with your image URLs)
  "./src/assets/img1.jpg",
  "./src/assets/img2.jpg",
  "./src/assets/img3.jpg",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0); // State for current slide

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  return (
    <>
    <div>
      </div>
      <div className="min-h-screen grid items-center" style={{zIndex:10}}>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl  text-white mb-4">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{zIndex:10}}>
            {/* Sample Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Event Management
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                nec sodales lorem.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Attendee Scanner
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                nec sodales lorem.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Email Sender
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                nec sodales lorem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
