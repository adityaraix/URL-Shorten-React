import React, { useState } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import AdminDashboard from './components/AdminDashboard';
import './App.css'; 

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="container">
      <header>
        <h1>🔗 URL Shortify</h1>
        <p>The simplest way to shorten your long URLs.</p>
        <nav>
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>
            Shorten URL
          </button>
          <button onClick={() => setActiveTab('admin')} className={activeTab === 'admin' ? 'active' : ''}>
            Admin Stats
          </button>
        </nav>
      </header>
      <main>
        {activeTab === 'home' && <UrlShortenerForm />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>
      <footer>
        <p>Built with the MERN Stack - by Aditya Rai</p>
        <p> <a href="https://www.adityaraix.info/">Portfolio <link rel="stylesheet" href="" /></a></p>
      </footer>
    </div>
  );
}

export default App;