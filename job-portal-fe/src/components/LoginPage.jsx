// import React, { useState } from 'react';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Pre-fill email from registration if available
//   React.useEffect(() => {
//     const registeredEmail = localStorage.getItem('registered_email');
//     if (registeredEmail) {
//       setEmail(registeredEmail);
//       localStorage.removeItem('registered_email');
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       // Login request
//       const response = await fetch('http://localhost:1337/api/auth/local', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           identifier: email, 
//           password: password 
//         })
//       });

//       const data = await response.json();
//       console.log('Login response:', data);

//       if (response.ok) {
//         setMessage('✅ Login successful!');
        
//         // Save token and basic user info
//         localStorage.setItem('token', data.jwt);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         // Now get user details with role
//         const userResponse = await fetch('http://localhost:1337/api/users/me?populate=role', {
//           headers: { 
//             'Authorization': `Bearer ${data.jwt}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           console.log('User data with role:', userData);
          
//           // Extract role properly
//           let userRole = 'authenticated'; // default
          
//           if (userData.role) {
//             if (typeof userData.role === 'object') {
//               userRole = userData.role.name || userData.role.type || 'authenticated';
//             } else if (typeof userData.role === 'string') {
//               userRole = userData.role;
//             }
//           }
          
//           console.log('User role:', userRole);
          
//           // Save role to localStorage
//           localStorage.setItem('role', userRole);
          
//           // Remove any registration data
//           localStorage.removeItem('registered_email');
//           localStorage.removeItem('registered_role');
          
//           // Redirect based on role
//           setTimeout(() => {
//             if (userRole === 'candidate') {
//               window.location.href = '/candidate-dashboard';
//             } else if (userRole === 'companyManager') {
//               window.location.href = '/company-dashboard';
//             } else if (userRole === 'recruiter') {
//               window.location.href = '/recruiter-dashboard';
//             } else {
//               // Default to candidate dashboard
//               window.location.href = '/candidate-dashboard';
//             }
//           }, 1000);
          
//         } else {
//           throw new Error('Could not fetch user details');
//         }
        
//       } else {
//         // Show detailed error message
//         const errorMsg = data.message?.[0]?.messages?.[0]?.message || 
//                         data.error?.message || 
//                         'Invalid email or password';
//         setMessage(`❌ ${errorMsg}`);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage(`❌ Login failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login to Your Account</h2>
      
//       {message && (
//         <div style={{ 
//           padding: '15px', 
//           marginBottom: '20px', 
//           borderRadius: '5px',
//           background: message.includes('✅') ? '#d4edda' : '#f8d7da',
//           color: message.includes('✅') ? '#155724' : '#721c24',
//           border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
//         }}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleLogin}>
//         <div style={{ marginBottom: '20px' }}>
//           <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ 
//               width: '100%', 
//               padding: '12px', 
//               borderRadius: '5px', 
//               border: '1px solid #ddd',
//               fontSize: '16px',
//               boxSizing: 'border-box'
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ 
//               width: '100%', 
//               padding: '12px', 
//               borderRadius: '5px', 
//               border: '1px solid #ddd',
//               fontSize: '16px',
//               boxSizing: 'border-box'
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: '100%',
//             padding: '14px',
//             background: loading ? '#ccc' : '#28a745',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             fontSize: '16px',
//             fontWeight: 'bold',
//             transition: 'background 0.3s'
//           }}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>

//       <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
//         Don't have an account?{' '}
//         <a href="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '500' }}>
//           Register here
//         </a>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Attempting login for:', email);
      
      // 1. Basic login request
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier: email, 
          password: password 
        })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        setMessage('✅ Login successful! Redirecting...');
        
        // Save token and user info immediately
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // 2. Try to get user role from Strapi
        try {
          const userResponse = await fetch('http://localhost:1337/api/users/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${data.jwt}`
            }
          });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log('User data from /me:', userData);
            
            // Try to get role from user data
            // This depends on how your Strapi is set up
            let userRole = 'candidate'; // default
            
            // Check different possible locations for role
            if (userData.role) {
              userRole = userData.role;
            } else if (userData.role_type) {
              userRole = userData.role_type;
            } else if (localStorage.getItem('registered_role')) {
              userRole = localStorage.getItem('registered_role');
              localStorage.removeItem('registered_role');
            }
            
            console.log('Determined role:', userRole);
            localStorage.setItem('role', userRole);
            
          } else {
            console.log('Could not fetch user details, using default role');
            // Fallback: check for saved role from registration
            const savedRole = localStorage.getItem('registered_role');
            if (savedRole) {
              localStorage.setItem('role', savedRole);
              localStorage.removeItem('registered_role');
            } else {
              localStorage.setItem('role', 'candidate');
            }
          }
        } catch (userError) {
          console.error('Error fetching user details:', userError);
          // Use default role
          const savedRole = localStorage.getItem('registered_role');
          if (savedRole) {
            localStorage.setItem('role', savedRole);
            localStorage.removeItem('registered_role');
          } else {
            localStorage.setItem('role', 'candidate');
          }
        }
        
        // 3. Redirect based on role
        setTimeout(() => {
          const role = localStorage.getItem('role');
          console.log('Final role for redirect:', role);
          
          switch(role) {
            case 'candidate':
              window.location.href = '/candidate-dashboard';
              break;
            case 'companyManager':
              window.location.href = '/company-dashboard';
              break;
            case 'recruiter':
              window.location.href = '/recruiter-dashboard';
              break;
            default:
              console.log('Unknown role, defaulting to candidate');
              window.location.href = '/candidate-dashboard';
          }
        }, 1000);
        
      } else {
        // Login failed
        const errorMsg = data.message?.[0]?.messages?.[0]?.message || 
                        data.error?.message || 
                        'Invalid email or password';
        setMessage(`❌ ${errorMsg}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('❌ Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      
      {message && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '20px', 
          borderRadius: '5px',
          background: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account? <a href="/register" style={{ color: '#007bff' }}>Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;