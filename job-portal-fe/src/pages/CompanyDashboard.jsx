import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if user has companyManager role
    if (role !== 'companyManager') {
      alert('Access denied. This dashboard is for company managers only.');
      localStorage.clear();
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      console.error('Auth error:', error);
      localStorage.clear();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <header style={{
        backgroundColor: 'white',
        padding: '20px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div>
            <h1 style={{ margin: 0 }}>🏢 Company Manager Dashboard</h1>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Welcome, <strong>{user?.username || 'Company Manager'}</strong>
            </p>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        <h2>Company Management Portal</h2>
        <p>Manage your company profile, job postings, and candidates.</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '30px'
        }}>
          {/* Add company-specific dashboard cards here */}
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;