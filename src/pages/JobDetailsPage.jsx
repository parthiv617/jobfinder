import React from 'react';
import JobDetails from '../components/JobDetails';

const JobDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobDetails />
      </div>
    </div>
  );
};

export default JobDetailsPage;
