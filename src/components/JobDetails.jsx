import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchJobById, removeJob } from '../redux/slices/jobsSlice';

const JobDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentJob, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await dispatch(removeJob(id)).unwrap();
        window.location.href = '/';
      } catch (err) {
        console.error('Failed to delete job:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading job details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="text-center py-8 text-gray-500">
        Job not found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <span className="text-sm font-medium text-gray-500">Title:</span>
            <h1 className="text-3xl font-bold text-gray-900">{currentJob.title}</h1>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">Company:</span>
            <p className="text-xl text-gray-800">{currentJob.company}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">Location:</span>
            <p className="text-gray-600">{currentJob.location}</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500">Phone:</span>
            <p className="text-gray-600">{currentJob.phone || 'Not provided'}</p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500">Description:</span>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {currentJob.description}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Back to Jobs
            </Link>
            <Link
              to={`/edit/${currentJob.id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Edit Job
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
