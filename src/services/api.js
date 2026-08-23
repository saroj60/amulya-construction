const API_BASE = '/api';

// Helper to extract JWT token from localStorage
function getHeaders() {
  const token = localStorage.getItem('amulya_admin_token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Global fetch wrapper to handle errors
async function request(url, options = {}) {
  const headers = getHeaders();
  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Authentication
  async login(username, password) {
    const data = await request(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (data.token) {
      localStorage.setItem('amulya_admin_token', data.token);
      localStorage.setItem('amulya_admin_user', data.username);
    }
    return data;
  },

  logout() {
    localStorage.removeItem('amulya_admin_token');
    localStorage.removeItem('amulya_admin_user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('amulya_admin_token');
  },

  async changePassword(oldPassword, newPassword) {
    return request(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword })
    });
  },

  // Projects CRUD
  async getProjects() {
    return request(`${API_BASE}/projects`);
  },

  async getProject(id) {
    return request(`${API_BASE}/projects/${id}`);
  },

  async createProject(projectData) {
    return request(`${API_BASE}/projects`, {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  },

  async updateProject(id, projectData) {
    return request(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    });
  },

  async deleteProject(id) {
    return request(`${API_BASE}/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // House Styles CRUD
  async getHouseStyles() {
    return request(`${API_BASE}/house-styles`);
  },

  async getHouseStyle(id) {
    return request(`${API_BASE}/house-styles/${id}`);
  },

  async createHouseStyle(styleData) {
    return request(`${API_BASE}/house-styles`, {
      method: 'POST',
      body: JSON.stringify(styleData)
    });
  },

  async updateHouseStyle(id, styleData) {
    return request(`${API_BASE}/house-styles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(styleData)
    });
  },

  async deleteHouseStyle(id) {
    return request(`${API_BASE}/house-styles/${id}`, {
      method: 'DELETE'
    });
  },

  // Team CRUD
  async getTeam() {
    return request(`${API_BASE}/team`);
  },

  async createTeamMember(memberData) {
    return request(`${API_BASE}/team`, {
      method: 'POST',
      body: JSON.stringify(memberData)
    });
  },

  async updateTeamMember(id, memberData) {
    return request(`${API_BASE}/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData)
    });
  },

  async deleteTeamMember(id) {
    return request(`${API_BASE}/team/${id}`, {
      method: 'DELETE'
    });
  },

  // Calculator Config CRUD
  async getCalculatorConfig() {
    return request(`${API_BASE}/calculator-config`);
  },

  async updateCalculatorConfig(configData) {
    return request(`${API_BASE}/calculator-config`, {
      method: 'PUT',
      body: JSON.stringify(configData)
    });
  },

  // Leads (Inquiries)
  async getLeads() {
    return request(`${API_BASE}/leads`);
  },

  async submitLead(leadData) {
    return request(`${API_BASE}/leads`, {
      method: 'POST',
      body: JSON.stringify(leadData)
    });
  },

  async deleteLead(id) {
    return request(`${API_BASE}/leads/${id}`, {
      method: 'DELETE'
    });
  },

  // Services CRUD
  async getServices() {
    return request(`${API_BASE}/services`);
  },

  async getService(id) {
    return request(`${API_BASE}/services/${id}`);
  },

  async createService(serviceData) {
    return request(`${API_BASE}/services`, {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },

  async updateService(id, serviceData) {
    return request(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  },

  async deleteService(id) {
    return request(`${API_BASE}/services/${id}`, {
      method: 'DELETE'
    });
  },

  async uploadImage(fileName, base64Data) {
    return request(`${API_BASE}/upload`, {
      method: 'POST',
      body: JSON.stringify({ fileName, base64Data })
    });
  },

  // Blogs CRUD
  async getBlogs() {
    return request(`${API_BASE}/blogs`);
  },

  async getBlog(id) {
    return request(`${API_BASE}/blogs/${id}`);
  },

  async createBlog(blogData) {
    return request(`${API_BASE}/blogs`, {
      method: 'POST',
      body: JSON.stringify(blogData)
    });
  },

  async updateBlog(id, blogData) {
    return request(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData)
    });
  },

  async deleteBlog(id) {
    return request(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE'
    });
  },

  // Hero Slides CRUD
  async getHeroSlides() {
    return request(`${API_BASE}/hero-slides`);
  },

  async createHeroSlide(slideData) {
    return request(`${API_BASE}/hero-slides`, {
      method: 'POST',
      body: JSON.stringify(slideData)
    });
  },

  async deleteHeroSlide(id) {
    return request(`${API_BASE}/hero-slides/${id}`, {
      method: 'DELETE'
    });
  },

  // Testimonials CRUD
  async getTestimonials() {
    return request(`${API_BASE}/testimonials`);
  },

  async createTestimonial(testimonialData) {
    return request(`${API_BASE}/testimonials`, {
      method: 'POST',
      body: JSON.stringify(testimonialData)
    });
  },

  async updateTestimonial(id, testimonialData) {
    return request(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData)
    });
  },

  async deleteTestimonial(id) {
    return request(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE'
    });
  },

  // File Upload
  async uploadImage(fileName, base64Data) {
    return request(`${API_BASE}/upload`, {
      method: 'POST',
      body: JSON.stringify({ fileName, base64Data })
    });
  }
};
