import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchJobById, editJob } from '../redux/slices/jobsSlice';
import JobForm from '../components/JobForm';

const EditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentJob, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(editJob({ id, jobData: formData })).unwrap();
      navigate(`/job/${id}`);
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-lg text-gray-600">Loading job details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-gray-500">Job not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Job
          </h1>
          <p className="text-gray-600">
            Update the job details below
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <JobForm job={currentJob} onSubmit={handleSubmit} isEditing={true} />
        </div>
      </div>
    </div>
  );
};

export default EditJob;
