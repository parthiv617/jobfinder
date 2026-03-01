import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              JobFinder
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/create"
                className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Post Job
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <div className="flex space-x-2">
              <Link
                to="/"
                className="hover:bg-blue-700 px-2 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/create"
                className="bg-blue-700 hover:bg-blue-800 px-2 py-2 rounded-md text-sm font-medium"
              >
                Post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
