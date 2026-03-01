import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addJob } from '../redux/slices/jobsSlice';
import JobForm from '../components/JobForm';

const CreateJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await dispatch(addJob(formData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to create job:', error);
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
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <JobForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
