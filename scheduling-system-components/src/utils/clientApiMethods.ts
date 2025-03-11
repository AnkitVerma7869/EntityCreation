import { ApiMethods } from '../interfaces/types';

export const createClientApiMethods = (baseUrl: string): ApiMethods => ({
  get: async (url: string, token: string, headers = {}) => {
    console.log('API Call:', `${baseUrl}${url}`);
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...headers
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  post: async (url: string, token: string, body: any, headers = {}) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...headers
      },
      body: JSON.stringify(body)
    });
    return response.json();
  },

  put: async (url: string, token: string, body: any, headers = {}) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...headers
      },
      body: JSON.stringify(body)
    });
    return response.json();
  },

  delete: async (url: string, token: string, body: any, headers = {}) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
    return response.json();
  }
}); 