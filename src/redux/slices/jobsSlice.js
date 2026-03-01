import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllJobs, getJobById, createJob, updateJob, deleteJob } from '../../services/allapi';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await getAllJobs();
  return response.data;
});

export const fetchJobById = createAsyncThunk('jobs/fetchJobById', async (id) => {
  const response = await getJobById(id);
  return response.data;
});

export const addJob = createAsyncThunk(
  'jobs/addJob', 
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await createJob(jobData);
      return response.data;
    } catch (error) {
      console.error('Add job error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editJob = createAsyncThunk(
  'jobs/editJob', 
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const response = await updateJob(id, jobData);
      return response.data;
    } catch (error) {
      console.error('Edit job error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeJob = createAsyncThunk(
  'jobs/removeJob', 
  async (id, { rejectWithValue }) => {
    try {
      await deleteJob(id);
      return id;
    } catch (error) {
      console.error('Delete job error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    currentJob: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch job by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add job
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create job';
      })
      // Edit job
      .addCase(editJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.jobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
        if (state.currentJob && state.currentJob.id === action.payload.id) {
          state.currentJob = action.payload;
        }
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update job';
      })
      // Delete job
      .addCase(removeJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
        if (state.currentJob && state.currentJob.id === action.payload) {
          state.currentJob = null;
        }
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete job';
      });
  },
});

export const { clearCurrentJob, clearError } = jobsSlice.actions;
export default jobsSlice.reducer;
