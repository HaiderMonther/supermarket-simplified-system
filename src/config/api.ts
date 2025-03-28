
// API configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:2000/api', // Updated backend URL
  TIMEOUT: 10000, // 10 seconds timeout
};

// You can change this based on environment
if (import.meta.env.PROD) {
  // If in production, use production API URL
  // API_CONFIG.BASE_URL = 'https://api.yourproductionurl.com/api';
}
