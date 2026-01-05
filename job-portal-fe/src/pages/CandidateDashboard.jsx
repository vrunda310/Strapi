import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    console.log('Candidate Dashboard - Checking auth:', { token, role });
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    // Check if user has candidate role
    if (role !== 'candidate') {
      console.log(`Invalid role: ${role}, expected: candidate`);
      alert('Access denied. This dashboard is for candidates only.');
      localStorage.clear();
      navigate('/login');
      return;
    }

    try {
      // Verify user is still valid
      const response = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log('User authenticated:', userData);
      } else {
        console.log('Token invalid, clearing storage');
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
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#333' }}>👤 Candidate Dashboard</h1>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              Welcome back, <strong style={{ color: '#007bff' }}>{user?.username || 'Candidate'}</strong>
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
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          
          {/* Profile Card */}
          <div style={{ 
            padding: '25px', 
            border: '1px solid #ddd', 
            borderRadius: '10px',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>📊 Your Profile</h3>
            <p>Complete your profile to increase your chances of getting hired.</p>
            <div style={{ marginTop: '20px' }}>
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Account Type:</strong> Candidate</p>
            </div>
            <button style={{ 
              marginTop: '15px',
              padding: '10px 20px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}>
              Edit Profile
            </button>
          </div>

          {/* Jobs Card */}
          <div style={{ 
            padding: '25px', 
            border: '1px solid #ddd', 
            borderRadius: '10px',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>🔍 Job Recommendations</h3>
            <p>Browse jobs that match your skills and preferences.</p>
            <div style={{ marginTop: '20px' }}>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '5px',
                marginBottom: '10px'
              }}>
                <strong>Frontend Developer</strong>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Tech Corp • $80k - $100k</p>
                <button style={{ 
                  padding: '8px 15px', 
                  background: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Apply Now
                </button>
              </div>
            </div>
            <button style={{ 
              marginTop: '15px',
              padding: '10px 20px', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}>
              View All Jobs
            </button>
          </div>

          {/* Applications Card */}
          <div style={{ 
            padding: '25px', 
            border: '1px solid #ddd', 
            borderRadius: '10px',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>📨 Your Applications</h3>
            <p>Track the status of your job applications.</p>
            <div style={{ marginTop: '20px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #eee'
              }}>
                <span>React Developer</span>
                <span style={{ 
                  padding: '5px 10px', 
                  background: '#ffc107', 
                  borderRadius: '3px',
                  fontSize: '12px'
                }}>
                  Under Review
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #eee'
              }}>
                <span>UI/UX Designer</span>
                <span style={{ 
                  padding: '5px 10px', 
                  background: '#17a2b8', 
                  borderRadius: '3px',
                  fontSize: '12px'
                }}>
                  Interview Scheduled
                </span>
              </div>
            </div>
            <button style={{ 
              marginTop: '15px',
              padding: '10px 20px', 
              background: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}>
              View All Applications
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;