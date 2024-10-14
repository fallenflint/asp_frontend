export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  options = options || {};
  options.headers = {...options.headers, ...{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  }};
  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, options);
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return response;
};

const options = { 
    year: '2-digit', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    // second: '2-digit',
    // timeZoneName: 'short' 
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', options);
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const setIsAuthenticated = (token) => {
  localStorage.setItem('token', token);
};