import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UrlShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/shorten`, { originalUrl });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter a long URL (e.g., https://...)"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p>Success! Here is your short URL:</p>
          <a href={`${API_BASE_URL}/${result.shortCode}`} target="_blank" rel="noopener noreferrer">
            {`${API_BASE_URL}/${result.shortCode}`}
          </a>
        </div>
      )}
    </div>
  );
}

export default UrlShortenerForm;