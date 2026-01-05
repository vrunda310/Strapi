import React, { useState } from 'react';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'candidate'
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    console.log('Sending registration:', formData);
    
    const response = await fetch('http://localhost:1337/api/custom-auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log('Registration response:', data);

    if (response.ok) {
      setMessage('✅ Registration successful! Redirecting to login...');
      
      // Save registration info in localStorage
      localStorage.setItem('registered_role', formData.role);
      localStorage.setItem('registered_email', formData.email);
      
      // Also save in sessionStorage for immediate use
      sessionStorage.setItem('last_registered_role', formData.role);
      
      // Wait 2 seconds then redirect to login
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } else {
      console.error('Registration failed:', data);
      setMessage(`❌ Error: ${data.error?.message || 'Registration failed'}`);
    }
  } catch (error) {
    console.error('Network error:', error);
    setMessage('❌ Network error. Please check if Strapi is running.');
  } finally {
    setLoading(false);
  }
};
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Register</h2>
      
      {message && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px',
          background: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '5px'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            I am a:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { value: 'candidate', label: '👤 Job Seeker (Candidate)' },
              { value: 'companyManager', label: '🏢 Company Manager' },
              { value: 'recruiter', label: '🔍 Recruiter' }
            ].map(option => (
              <label key={option.value} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: formData.role === option.value ? '#e7f3ff' : 'white'
              }}>
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={formData.role === option.value}
                  onChange={handleChange}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ fontSize: '16px' }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Username *"
            value={formData.username}
            onChange={handleChange}
            required
            minLength="3"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password * (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}
        >
          {loading ? 'Registering...' : 'Register Account'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account? <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login here</a>
      </p>
    </div>
  );
};

export default RegistrationPage;