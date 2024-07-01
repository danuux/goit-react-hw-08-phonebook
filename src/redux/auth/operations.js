// // import axios from 'axios';
// // import { createAsyncThunk } from '@reduxjs/toolkit';
// // import { setToken } from '../auth/slice';

// // axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// // const setAuthHeader = token => {
// //   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// // };

// // const clearAuthHeader = () => {
// //   axios.defaults.headers.common.Authorization = '';
// // };

// // export const register = createAsyncThunk(
// //   'auth/register',
// //   async (credentials, thunkAPI) => {
// //     try {
// //       const res = await axios.post('/users/signup', credentials);
// //       thunkAPI.dispatch(setToken(res.data.token));
// //       return res.data;
// //     } catch (error) {
// //       console.error('Register error:', error.response.data);
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const logIn = createAsyncThunk(
// //   'auth/login',
// //   async (credentials, thunkAPI) => {
// //     try {
// //       const res = await axios.post('/users/login', credentials);
// //       thunkAPI.dispatch(setToken(res.data.token));
// //       return res.data;
// //     } catch (error) {
// //       console.error('Login error:', error.response.data);
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
// //   try {
// //     const state = thunkAPI.getState();
// //     const persistedToken = state.auth.token;

// //     if (!persistedToken) {
// //       return thunkAPI.rejectWithValue('No token found');
// //     }
// //     setAuthHeader(persistedToken);
// //     await axios.post('/users/logout');
// //     clearAuthHeader();
// //   } catch (error) {
// //     console.error('Logout error:', error.response.data);
// //     return thunkAPI.rejectWithValue(error.message);
// //   }
// // });

// // export const refreshUser = createAsyncThunk(
// //   'auth/refresh',
// //   async (_, thunkAPI) => {
// //     const state = thunkAPI.getState();
// //     const persistedToken = state.auth.token;

// //     if (persistedToken === null) {
// //       return thunkAPI.rejectWithValue('Unable to fetch user');
// //     }

// //     try {
// //       setAuthHeader(persistedToken);
// //       const res = await axios.get('/users/current');
// //       return res.data;
// //     } catch (error) {
// //       console.error('Refresh user error:', error.response.data);
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { setToken } from '../auth/slice';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };

// export const register = createAsyncThunk(
//   'auth/register',
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post('/users/signup', credentials);
//       thunkAPI.dispatch(setToken(res.data.token));
//       return res.data;
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.code === 11000) {
//         return thunkAPI.rejectWithValue('Email already exists');
//       }
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const logIn = createAsyncThunk(
//   'auth/login',
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post('/users/login', credentials);
//       thunkAPI.dispatch(setToken(res.data.token));
//       return res.data;
//     } catch (error) {
//       console.error('Login error:', error.response ? error.response.data : error.message);
//       return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );

// export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     if (!persistedToken) {
//       return thunkAPI.rejectWithValue('No token found');
//     }
//     setAuthHeader(persistedToken);
//     await axios.post('/users/logout');
//     clearAuthHeader();
//   } catch (error) {
//     console.error('Logout error:', error.response ? error.response.data : error.message);
//     return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
//   }
// });

// export const refreshUser = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     if (persistedToken === null) {
//       return thunkAPI.rejectWithValue('Unable to fetch user');
//     }

//     try {
//       setAuthHeader(persistedToken);
//       const res = await axios.get('/users/current');
//       return res.data;
//     } catch (error) {
//       console.error('Refresh user error:', error.response ? error.response.data : error.message);
//       return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken } from '../auth/slice';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      console.log('Register credentials:', credentials);  
      const res = await axios.post('/users/signup', credentials);
      thunkAPI.dispatch(setToken(res.data.token));
      return res.data;
    } catch (error) {
      if (error.response) {
        console.error('Register error response data:', error.response.data);  
        console.error('Register error status:', error.response.status);  
        if (error.response.data.code === 11000) {
          return thunkAPI.rejectWithValue('Email already exists');
        }
        return thunkAPI.rejectWithValue(error.response.data.message || 'Registration failed');
      } else {
        console.error('Register error:', error.message);  
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      console.log('Login credentials:', credentials);  
      const res = await axios.post('/users/login', credentials);
      thunkAPI.dispatch(setToken(res.data.token));
      return res.data;
    } catch (error) {
      if (error.response) {
        console.error('Login error response data:', error.response.data); 
        console.error('Login error status:', error.response.status); 
        return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
      } else {
        console.error('Login error:', error.message);  
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('No token found');
    }
    setAuthHeader(persistedToken);
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    if (error.response) {
      console.error('Logout error response data:', error.response.data);  
      console.error('Logout error status:', error.response.status);  
      return thunkAPI.rejectWithValue(error.response.data.message || 'Logout failed');
    } else {
      console.error('Logout error:', error.message);  
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      if (error.response) {
        console.error('Refresh user error response data:', error.response.data);  
        console.error('Refresh user error status:', error.response.status);  
        return thunkAPI.rejectWithValue(error.response.data.message || 'Refresh failed');
      } else {
        console.error('Refresh user error:', error.message);  
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
