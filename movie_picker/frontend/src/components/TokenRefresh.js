import React, { useEffect } from 'react';

function TokenRefresh() {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshTokenFromStorage = localStorage.getItem('refresh');
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshTokenFromStorage}`,
          },
      });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const newAccessToken = data.access;
            const newRefreshToken = data.refresh;
            localStorage.setItem('access', newAccessToken);
            localStorage.setItem('refresh', newRefreshToken)
          }
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    const tokenRefreshInterval = setInterval(refreshToken, 5 * 60 * 1000);

    return () => {
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  return null;
}

export default TokenRefresh;
