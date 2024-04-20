import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">

          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-white text-2xl font-bold">EventEase</a>
          </div>


          <div className="flex items-center ">
            <ul className="flex justify-center space-x-4">
              <li><a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium">Scanner</a></li>
              <li><a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium">Mailer</a></li>
              <li><a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium">Help</a></li>
            </ul>
          </div>


          <div className="flex items-center">
            <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
