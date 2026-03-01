import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addJob } from '../redux/slices/jobsSlice';
import JobForm from '../components/JobForm';

const CreateJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.jobs);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(addJob(formData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to create job:', error);
      // Error is now handled in Redux state
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-600">
            Fill in the details below to create a new job posting
          </p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <JobForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
