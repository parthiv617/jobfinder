import React from 'react';
import JobList from '../components/JobList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Blue-Collar Job Opportunities
          </h1>
          <p className="text-gray-600">
            Find and post blue-collar jobs in your area
          </p>
        </div>
        
        <JobList />
      </div>
    </div>
  );
};

export default Home;