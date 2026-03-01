import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJobs, removeJob } from '../redux/slices/jobsSlice';

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    // Load jobs from API
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await dispatch(removeJob(id)).unwrap();
      } catch (err) {
        console.error('Failed to delete job:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading jobs...</div>
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

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No jobs found. <Link to="/create" className="text-blue-600 hover:underline">Create the first job!</Link>
        </div>
      ) : (
        jobs.map((job) => {
          return (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title:</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      <Link
                        to={`/job/${job.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {job.title}
                      </Link>
                    </h3>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Company:</span>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Location:</span>
                    <p className="text-gray-500 text-sm">{job.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <p className="text-gray-500 text-sm">{job.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Description:</span>
                    <p className="text-gray-700 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex flex-col space-y-2">
                <Link
                  to={`/job/${job.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${job.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          );
        })
      )}
    </div>
  );
};

export default JobList;
