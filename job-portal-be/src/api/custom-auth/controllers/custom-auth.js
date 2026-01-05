'use strict';

module.exports = {
  async register(ctx) {
    try {
      console.log('Registration request received:', ctx.request.body);
      
      const { username, email, password, role } = ctx.request.body;
      
      // Validate required fields
      if (!username || !email || !password || !role) {
        return ctx.badRequest('Missing required fields');
      }
      
      // Find the role by name (make sure it matches exactly with Strapi roles)
      const roleEntity = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { name: role }
      });
      
      if (!roleEntity) {
        return ctx.badRequest(`Role "${role}" not found. Available roles: authenticated, candidate, companyManager, recruiter`);
      }
      
      // Check if user already exists
      const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { 
          $or: [
            { email: email.toLowerCase().trim() },
            { username: username.toLowerCase().trim() }
          ]
        }
      });
      
      if (existingUser) {
        return ctx.badRequest('Username or email already exists');
      }
      
      // Create user
      const user = await strapi.plugins['users-permissions'].services.user.add({
        username: username.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password,
        role: roleEntity.id,
        confirmed: true,
        provider: 'local'
      });
      
      console.log('User created with ID:', user.id, 'and role:', role);
      
      // Get the created user with populated role
      const createdUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: user.id },
        populate: ['role']
      });
      
      console.log('Created user with role:', createdUser.role?.name);
      
      // Generate JWT token
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id
      });
      
      // Return response
      return ctx.send({
        jwt,
        user: {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
          role: createdUser.role?.name || role
        }
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      return ctx.badRequest(error.message || 'Registration failed');
    }
  }
};