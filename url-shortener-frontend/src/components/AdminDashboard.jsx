import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/stats`);
        setStats(response.data);
      } catch (err) {
        setError('Failed to fetch stats.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); 

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-dashboard">
      <h2>URL Statistics</h2>
      {stats.length === 0 ? <p>No URLs have been shortened yet.</p> : (
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Visits</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((url) => (
              <tr key={url.shortCode}>
                <td>
                  <a href={url.originalUrl} title={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl.substring(0, 50)}...
                  </a>
                </td>
                <td>
                  <a href={`${API_BASE_URL}/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                    {`${API_BASE_URL}/${url.shortCode}`}
                  </a>
                </td>
                <td>{url.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;