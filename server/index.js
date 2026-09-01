import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'amulya-builders-super-secret-key-98765';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Token Verification Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// ============================================================
// AUTH ROUTES
// ============================================================

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const passwordIsValid = bcrypt.compareSync(password, user.password_hash);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '8h'
    });

    res.json({ token, username: user.username });
  });
});

app.post('/api/auth/change-password', authenticateToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Old and new passwords are required' });
  }

  db.get("SELECT * FROM users WHERE id = ?", [req.user.id], (err, user) => {
    if (err || !user) return res.status(500).json({ error: 'User lookup failed' });

    const passwordIsValid = bcrypt.compareSync(oldPassword, user.password_hash);
    if (!passwordIsValid) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    db.run("UPDATE users SET password_hash = ? WHERE id = ?", [newHash, req.user.id], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: 'Failed to update password' });
      res.json({ message: 'Password updated successfully' });
    });
  });
});

// ============================================================
// PROJECTS CRUD ROUTES
// ============================================================

// GET all projects (Public)
app.get('/api/projects', (req, res) => {
  db.all("SELECT * FROM projects ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Parse JSON text columns back into arrays/objects
    const parsedRows = rows.map(row => ({
      ...row,
      gallery: JSON.parse(row.gallery || '[]'),
      highlights: JSON.parse(row.highlights || '[]'),
      specifications: JSON.parse(row.specifications || '{}')
    }));
    res.json(parsedRows);
  });
});

// GET single project (Public)
app.get('/api/projects/:id', (req, res) => {
  db.get("SELECT * FROM projects WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Project not found' });
    
    res.json({
      ...row,
      gallery: JSON.parse(row.gallery || '[]'),
      highlights: JSON.parse(row.highlights || '[]'),
      specifications: JSON.parse(row.specifications || '{}')
    });
  });
});

// POST create project (Admin)
app.post('/api/projects', authenticateToken, (req, res) => {
  const { title, category, status, location, duration, description, highlights, specifications, image, gallery } = req.body;

  if (!title || !category || !status || !location || !description || !image) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const highlightsStr = JSON.stringify(highlights || []);
  const specificationsStr = JSON.stringify(specifications || {});
  const galleryStr = JSON.stringify(gallery || []);

  const stmt = db.prepare(`INSERT INTO projects (title, category, status, location, duration, description, highlights, specifications, image, gallery)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  stmt.run(title, category, status, location, duration || '', description, highlightsStr, specificationsStr, image, galleryStr, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, message: 'Project created successfully' });
  });
  stmt.finalize();
});

// PUT update project (Admin)
app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const { title, category, status, location, duration, description, highlights, specifications, image, gallery } = req.body;

  const highlightsStr = JSON.stringify(highlights || []);
  const specificationsStr = JSON.stringify(specifications || {});
  const galleryStr = JSON.stringify(gallery || []);

  db.run(
    `UPDATE projects SET 
      title = ?, category = ?, status = ?, location = ?, duration = ?, 
      description = ?, highlights = ?, specifications = ?, image = ?, gallery = ?
     WHERE id = ?`,
    [title, category, status, location, duration || '', description, highlightsStr, specificationsStr, image, galleryStr, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Project not found' });
      res.json({ message: 'Project updated successfully' });
    }
  );
});

// DELETE project (Admin)
app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM projects WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  });
});


// ============================================================
// HOUSE STYLES CRUD ROUTES
// ============================================================

// GET all styles (Public)
app.get('/api/house-styles', (req, res) => {
  db.all("SELECT * FROM house_styles", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const parsedRows = rows.map(row => ({
      ...row,
      gallery: JSON.parse(row.gallery || '[]'),
      features: JSON.parse(row.features || '[]'),
      materials: JSON.parse(row.materials || '[]'),
      specifications: JSON.parse(row.specifications || '{}')
    }));
    res.json(parsedRows);
  });
});

// GET single style (Public)
app.get('/api/house-styles/:id', (req, res) => {
  db.get("SELECT * FROM house_styles WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Style not found' });
    
    res.json({
      ...row,
      gallery: JSON.parse(row.gallery || '[]'),
      features: JSON.parse(row.features || '[]'),
      materials: JSON.parse(row.materials || '[]'),
      specifications: JSON.parse(row.specifications || '{}')
    });
  });
});

// POST create style (Admin)
app.post('/api/house-styles', authenticateToken, (req, res) => {
  const { id, title, category, description, longDescription, image, gallery, features, materials, specifications, price, floor_plan_image } = req.body;

  if (!id || !title || !category || !description || !longDescription || !image) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const galleryStr = JSON.stringify(gallery || []);
  const featuresStr = JSON.stringify(features || []);
  const materialsStr = JSON.stringify(materials || []);
  const specificationsStr = JSON.stringify(specifications || {});

  db.run(
    `INSERT INTO house_styles (id, title, category, description, longDescription, image, gallery, features, materials, specifications, price, floor_plan_image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, title, category, description, longDescription, image, galleryStr, featuresStr, materialsStr, specificationsStr, price || '', floor_plan_image || ''],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'A style with this ID already exists.' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'House style created successfully' });
    }
  );
});

// PUT update style (Admin)
app.put('/api/house-styles/:id', authenticateToken, (req, res) => {
  const { title, category, description, longDescription, image, gallery, features, materials, specifications, price, floor_plan_image } = req.body;

  console.log('[PUT /api/house-styles] id:', req.params.id, '| floor_plan_image:', floor_plan_image || '(empty)');

  const galleryStr = JSON.stringify(gallery || []);
  const featuresStr = JSON.stringify(features || []);
  const materialsStr = JSON.stringify(materials || []);
  const specificationsStr = JSON.stringify(specifications || {});

  db.run(
    `UPDATE house_styles SET 
      title = ?, category = ?, description = ?, longDescription = ?, 
      image = ?, gallery = ?, features = ?, materials = ?, specifications = ?, price = ?, floor_plan_image = ?
     WHERE id = ?`,
    [title, category, description, longDescription, image, galleryStr, featuresStr, materialsStr, specificationsStr, price || '', floor_plan_image || '', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Style not found' });
      res.json({ message: 'House style updated successfully' });
    }
  );
});

// DELETE style (Admin)
app.delete('/api/house-styles/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM house_styles WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Style not found' });
    res.json({ message: 'House style deleted successfully' });
  });
});


// ============================================================
// TEAM CRUD ROUTES
// ============================================================

// GET all team members (Public)
app.get('/api/team', (req, res) => {
  db.all("SELECT * FROM team", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST add team member (Admin)
app.post('/api/team', authenticateToken, (req, res) => {
  const { name, designation, qualification, experience, avatar, color } = req.body;

  if (!name || !designation || !qualification || !experience || !avatar) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  db.run(
    `INSERT INTO team (name, designation, qualification, experience, avatar, color)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, designation, qualification, experience, avatar, color || '#1e40af'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Team member added successfully' });
    }
  );
});

// PUT update team member (Admin)
app.put('/api/team/:id', authenticateToken, (req, res) => {
  const { name, designation, qualification, experience, avatar, color } = req.body;

  db.run(
    `UPDATE team SET 
      name = ?, designation = ?, qualification = ?, experience = ?, avatar = ?, color = ?
     WHERE id = ?`,
    [name, designation, qualification, experience, avatar, color || '#1e40af', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Team member not found' });
      res.json({ message: 'Team member updated successfully' });
    }
  );
});

// DELETE team member (Admin)
app.delete('/api/team/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM team WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted successfully' });
  });
});


// ============================================================
// CALCULATOR CONFIG ROUTE
// ============================================================

// GET config (Public)
app.get('/api/calculator-config', (req, res) => {
  db.get("SELECT config_json FROM calculator_config WHERE id = 1", [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Config not found' });
    res.json(JSON.parse(row.config_json));
  });
});

// PUT update config (Admin)
app.put('/api/calculator-config', authenticateToken, (req, res) => {
  const newConfig = req.body;

  if (!newConfig || Object.keys(newConfig).length === 0) {
    return res.status(400).json({ error: 'Invalid config payload' });
  }

  db.run(
    "UPDATE calculator_config SET config_json = ? WHERE id = 1",
    [JSON.stringify(newConfig)],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Calculator configurations updated successfully' });
    }
  );
});


// ============================================================
// LEADS (INQUIRIES) ROUTES
// ============================================================

// POST submit lead (Public)
app.post('/api/leads', (req, res) => {
  const { name, phone, email, message, parameters } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone, and message are required.' });
  }

  const parametersStr = parameters ? JSON.stringify(parameters) : null;

  db.run(
    `INSERT INTO leads (name, phone, email, message, parameters)
     VALUES (?, ?, ?, ?, ?)`,
    [name, phone, email || '', message, parametersStr],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Your inquiry has been submitted successfully.' });
    }
  );
});

// GET all leads (Admin)
app.get('/api/leads', authenticateToken, (req, res) => {
  db.all("SELECT * FROM leads ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const parsedRows = rows.map(row => ({
      ...row,
      parameters: row.parameters ? JSON.parse(row.parameters) : null
    }));
    res.json(parsedRows);
  });
});

// DELETE specific lead (Admin)
app.delete('/api/leads/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM leads WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ message: 'Inquiry record deleted successfully' });
  });
});

// ============================================================
// SERVICES CRUD ROUTES
// ============================================================

// GET all services (Public)
app.get('/api/services', (req, res) => {
  db.all("SELECT * FROM services ORDER BY title ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const parsedRows = rows.map(row => ({
      ...row,
      features: JSON.parse(row.features || '[]')
    }));
    res.json(parsedRows);
  });
});

// GET single service (Public)
app.get('/api/services/:id', (req, res) => {
  db.get("SELECT * FROM services WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Service not found' });
    
    res.json({
      ...row,
      features: JSON.parse(row.features || '[]')
    });
  });
});

// POST create service (Admin)
app.post('/api/services', authenticateToken, (req, res) => {
  const { id, title, shortDesc, fullDesc, icon, image, features } = req.body;

  if (!id || !title || !shortDesc || !fullDesc || !icon || !image) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const featuresStr = JSON.stringify(features || []);

  db.run(
    `INSERT INTO services (id, title, shortDesc, fullDesc, icon, image, features)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id.trim().toLowerCase().replace(/\s+/g, '-'), title, shortDesc, fullDesc, icon, image, featuresStr],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'A service with this ID already exists.' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Service created successfully' });
    }
  );
});

// PUT update service (Admin)
app.put('/api/services/:id', authenticateToken, (req, res) => {
  const { title, shortDesc, fullDesc, icon, image, features } = req.body;

  const featuresStr = JSON.stringify(features || []);

  db.run(
    `UPDATE services SET 
      title = ?, shortDesc = ?, fullDesc = ?, icon = ?, image = ?, features = ?
     WHERE id = ?`,
    [title, shortDesc, fullDesc, icon, image, featuresStr, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Service not found' });
      res.json({ message: 'Service updated successfully' });
    }
  );
});

// DELETE service (Admin)
app.delete('/api/services/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM services WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  });
});

// POST upload file (Admin only)
app.post('/api/upload', authenticateToken, (req, res) => {
  const { fileName, fileType, base64Data } = req.body;

  if (!fileName || !base64Data) {
    return res.status(400).json({ error: 'Filename and base64Data are required.' });
  }

  try {
    const uploadDir = path.join(__dirname, 'uploads');
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean filename and make it unique
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueName = `${Date.now()}-${sanitizedName}`;
    const filePath = path.join(uploadDir, uniqueName);

    // Write file
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Failed to write file to disk:', err);
        return res.status(500).json({ error: 'Failed to save the file to local disk.' });
      }
      res.status(201).json({ url: `/uploads/${uniqueName}` });
    });
  } catch (err) {
    console.error('Upload processing error:', err);
    res.status(500).json({ error: 'File upload processing failed.' });
  }
});

// ============================================================
// BLOGS CRUD ROUTES
// ============================================================

// GET all blogs (Public)
app.get('/api/blogs', (req, res) => {
  db.all("SELECT * FROM blogs ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET single blog (Public)
app.get('/api/blogs/:id', (req, res) => {
  db.get("SELECT * FROM blogs WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Blog post not found' });
    res.json(row);
  });
});

// POST create blog (Admin)
app.post('/api/blogs', authenticateToken, (req, res) => {
  const { id, title, summary, content, image } = req.body;

  if (!id || !title || !summary || !content || !image) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  db.run(
    `INSERT INTO blogs (id, title, summary, content, image)
     VALUES (?, ?, ?, ?, ?)`,
    [id.trim().toLowerCase().replace(/\s+/g, '-'), title, summary, content, image],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'A blog post with this ID/slug already exists.' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Blog post created successfully' });
    }
  );
});

// PUT update blog (Admin)
app.put('/api/blogs/:id', authenticateToken, (req, res) => {
  const { title, summary, content, image } = req.body;

  db.run(
    `UPDATE blogs SET 
      title = ?, summary = ?, content = ?, image = ?
     WHERE id = ?`,
    [title, summary, content, image, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Blog post not found' });
      res.json({ message: 'Blog post updated successfully' });
    }
  );
});

// DELETE blog (Admin)
app.delete('/api/blogs/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM blogs WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  });
});

// ============================================================
// HERO SLIDES ROUTES
// ============================================================

// GET all slides (Public)
app.get('/api/hero-slides', (req, res) => {
  db.all("SELECT * FROM hero_slides ORDER BY id ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST create slide (Admin)
app.post('/api/hero-slides', authenticateToken, (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  db.run("INSERT INTO hero_slides (image) VALUES (?)", [image], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, image });
  });
});

// DELETE slide (Admin)
app.delete('/api/hero-slides/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM hero_slides WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Slide not found' });
    res.json({ message: 'Hero slide deleted successfully' });
  });
});

// ============================================================
// TESTIMONIALS ROUTES
// ============================================================

// GET all testimonials (Public)
app.get('/api/testimonials', (req, res) => {
  db.all("SELECT * FROM testimonials ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST create testimonial (Admin)
app.post('/api/testimonials', authenticateToken, (req, res) => {
  const { rating, text, avatar, name, designation, location } = req.body;
  if (!text || !avatar || !name || !designation || !location) {
    return res.status(400).json({ error: 'All fields (text, avatar, name, designation, location) are required' });
  }

  db.run(
    "INSERT INTO testimonials (rating, text, avatar, name, designation, location) VALUES (?, ?, ?, ?, ?, ?)",
    [rating || 5, text, avatar, name, designation, location],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, rating: rating || 5, text, avatar, name, designation, location });
    }
  );
});

// PUT update testimonial (Admin)
app.put('/api/testimonials/:id', authenticateToken, (req, res) => {
  const { rating, text, avatar, name, designation, location } = req.body;

  db.run(
    `UPDATE testimonials SET 
      rating = ?, text = ?, avatar = ?, name = ?, designation = ?, location = ?
     WHERE id = ?`,
    [rating || 5, text, avatar, name, designation, location, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Testimonial not found' });
      res.json({ message: 'Testimonial updated successfully' });
    }
  );
});

// DELETE testimonial (Admin)
app.delete('/api/testimonials/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM testimonials WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  });
});

// ============================================================
// AUTOMATED WHATSAPP BOT WEBHOOK (Twilio-Compatible)
// ============================================================
app.post('/api/whatsapp-webhook', express.urlencoded({ extended: true }), (req, res) => {
  const incomingMsg = (req.body.Body || '').trim().toLowerCase();
  const rawFrom = req.body.From || ''; // e.g. whatsapp:+97798XXXXXXXX
  const userPhone = rawFrom.replace('whatsapp:', '').trim();

  res.type('text/xml');

  // Helper function to send dynamic response with absolute media URL
  const sendResponse = (title, imgPath) => {
    let absoluteMediaUrl = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80'; // Fallback
    
    if (imgPath) {
      if (imgPath.startsWith('http')) {
        absoluteMediaUrl = imgPath;
      } else {
        const host = req.get('host');
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const cleanPath = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
        absoluteMediaUrl = `${protocol}://${host}${cleanPath}`;
      }
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>
    <Body>Thank you for your interest! Here is the design layout and details for "${title}". Our engineer will contact you shortly to discuss your custom project details.</Body>
    <Media>${absoluteMediaUrl}</Media>
  </Message>
</Response>`;
    res.send(twiml);
  };

  if (incomingMsg === 'yes' || incomingMsg.includes('floor plan') || incomingMsg.includes('floorplan')) {
    // 1. Look up the latest floor plan lead request from this user
    db.get(
      "SELECT * FROM leads WHERE (phone = ? OR message LIKE ?) AND message LIKE '%Requested floor plans%' ORDER BY created_at DESC LIMIT 1",
      [userPhone, `%${userPhone}%`],
      (err, lead) => {
        if (!err && lead) {
          // Parse the title using regex. E.g. "Requested floor plans for design: Traditional Neo-Vernacular. Redirected..."
          const match = lead.message.match(/design:\s*(.*?)\.\s*Redirected/i);
          const parsedTitle = match ? match[1].trim() : '';

          if (parsedTitle) {
            // Find the design style in DB
            db.get(
              "SELECT * FROM house_styles WHERE title = ? OR id = ? OR title LIKE ?",
              [parsedTitle, parsedTitle.toLowerCase().replace(/\s+/g, '-'), `%${parsedTitle}%`],
              (err2, styleRow) => {
                if (!err2 && styleRow) {
                  sendResponse(styleRow.title, styleRow.floor_plan_image || styleRow.image);
                } else {
                  sendResponse(parsedTitle, 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80');
                }
              }
            );
            return;
          }
        }

        // Default Fallback
        sendResponse("Modern Contemporary Villa", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80");
      }
    );
  } else {
    // Standard welcome message matching screenshot 3
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>
    <Body>Welcome to Amulya Builders! If you're interested in obtaining the floorplans of our designs, please reply with "yes" or "floor plan". We're here to help you create your dream home.</Body>
  </Message>
</Response>`;
    res.send(twiml);
  }
});

// ============================================================
// SERVING FRONTEND STATIC FILES IN PRODUCTION
// ============================================================
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res, next) => {
  // If the path starts with /api, bypass frontend serving so it triggers Express 404
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
