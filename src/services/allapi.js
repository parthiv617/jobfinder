import api from './commonapi';

// Job API functions
export const getAllJobs = () => {
  return api.get('/jobs');
};

export const getJobById = (id) => {
  return api.get(`/jobs/${id}`);
};

export const createJob = (jobData) => {
  return api.post('/jobs', jobData);
};

export const updateJob = (id, jobData) => {
  return api.put(`/jobs/${id}`, jobData);
};

export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}`);
};

// User API functions (for future authentication)
export const loginUser = (credentials) => {
  return api.post('/users/login', credentials);
};

export const registerUser = (userData) => {
  return api.post('/users/register', userData);
};

export const getUserProfile = () => {
  return api.get('/users/profile');
};
