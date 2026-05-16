import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const AI_URL = 'http://localhost:5001';

export const sendChatMessage = async (message) => {
  try {
    const response = await axios.post(`${AI_URL}/chat`, { message });
    return response.data.response;
  } catch (error) {
    console.error('AI Service Error:', error);
    return "I'm here for you. Tell me more about how you're feeling.";
  }
};

export const analyzeMood = async (mood) => {
  try {
    const response = await axios.post(`${AI_URL}/analyze-mood`, { mood });
    return response.data;
  } catch (error) {
    console.error('Mood analysis error:', error);
    return { suggestions: ['Take care of yourself'] };
  }
};

export const saveHabit = async (habitData) => {
  try {
    const response = await axios.post(`${API_URL}/habits`, habitData);
    return response.data;
  } catch (error) {
    console.error('Save habit error:', error);
    return null;
  }
};

export const getHabits = async () => {
  try {
    const response = await axios.get(`${API_URL}/habits`);
    return response.data;
  } catch (error) {
    console.error('Get habits error:', error);
    return [];
  }
};