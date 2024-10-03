import axios from 'axios';

// Replace with your actual Ngrok URL
const API_BASE_URL = 'https://pretty-showers-battle.loca.lt/php_rest_schoolrfid/api/login.php';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login.php`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Network error, please try again.');
  }
};
