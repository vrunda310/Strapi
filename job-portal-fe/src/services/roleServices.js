// // This service handles all role-related logic in one place
// export const RoleService = {
  
//   // Method 1: Extract role from user data
//   getUserRole: (userData) => {
//     if (!userData) return 'candidate'; // Default role
    
//     console.log('Extracting role from:', userData);
    
//     // Check role in different possible locations
//     if (userData.role) {
//       // Case 1: role is an object with name property
//       if (typeof userData.role === 'object' && userData.role.name) {
//         return userData.role.name;
//       }
//       // Case 2: role is a string
//       if (typeof userData.role === 'string') {
//         return userData.role;
//       }
//     }
    
//     // Check for nested role structure
//     if (userData.attributes?.role?.name) {
//       return userData.attributes.role.name;
//     }
    
//     // Check localStorage as fallback
//     const savedRole = localStorage.getItem('role');
//     if (savedRole) return savedRole;
    
//     // Default fallback
//     return 'candidate';
//   },
  
//   // Method 2: Save role consistently
//   saveUserRole: (role) => {
//     console.log('Saving role:', role);
//     localStorage.setItem('role', role);
//     localStorage.setItem('lastRole', role); // Backup
//   },
  
//   // Method 3: Get dashboard URL for a role
//   getDashboardUrl: (role) => {
//     console.log('Getting dashboard URL for role:', role);
//     switch(role) {
//       case 'candidate':
//         return '/candidate-dashboard';
//       case 'companyManager':
//         return '/company-dashboard';
//       case 'recruiter':
//         return '/recruiter-dashboard';
//       default:
//         return '/candidate-dashboard'; // Default fallback
//     }
//   },
  
//   // Method 4: Clear user data but keep role
//   logout: () => {
//     const currentRole = localStorage.getItem('role');
//     localStorage.clear(); // Clear everything
//     if (currentRole) {
//       localStorage.setItem('lastRole', currentRole); // Keep role for next time
//     }
//     window.location.href = '/login';
//   },
  
//   // Method 5: Check if user is authenticated
//   isAuthenticated: () => {
//     return !!localStorage.getItem('token');
//   }
// };

export const RoleService = {
  getUserRole: (userData) => {
    if (!userData) return 'candidate';
    
    if (userData.role) {
      if (typeof userData.role === 'object' && userData.role.name) {
        return userData.role.name;
      }
      if (typeof userData.role === 'string') {
        return userData.role;
      }
    }
    
    return localStorage.getItem('role') || 'candidate';
  },
  
  saveUserRole: (role) => {
    localStorage.setItem('role', role);
  },
  
  getDashboardUrl: (role) => {
    switch(role) {
      case 'candidate': return '/candidate-dashboard';
      case 'companyManager': return '/company-dashboard';
      case 'recruiter': return '/recruiter-dashboard';
      default: return '/candidate-dashboard';
    }
  }
};