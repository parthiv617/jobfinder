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

// Mock data for development
export const getMockJobs = () => {
  return Promise.resolve({
    data: [
      {
        id: 1,
        title: 'Construction Worker',
        company: 'BuildRight Construction',
        location: 'New York, NY',
        description: 'Looking for experienced construction workers for commercial building projects. Must have experience with tools and safety protocols.'
      },
      {
        id: 2,
        title: 'Warehouse Associate',
        company: 'Logistics Plus',
        location: 'Los Angeles, CA',
        description: 'Warehouse associates needed for shipping and receiving. Experience with forklift preferred but not required.'
      },
      {
        id: 3,
        title: 'Plumber',
        company: 'QuickFix Plumbing',
        location: 'Chicago, IL',
        description: 'Licensed plumbers needed for residential and commercial plumbing work. Must have own tools and reliable transportation.'
      },
      {
        id: 4,
        title: 'Electrician Helper',
        company: 'PowerPro Electric',
        location: 'Houston, TX',
        description: 'Seeking electrician helpers to assist licensed electricians with installations and repairs. On-the-job training available.'
      },
      {
        id: 5,
        title: 'Landscaping Technician',
        company: 'GreenScapes Landscaping',
        location: 'Phoenix, AZ',
        description: 'Landscaping technicians needed for residential and commercial properties. Experience with lawn equipment preferred.'
      }
    ]
  });
};
