import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen, Layout, Users, Calculator, MessageSquare, KeyRound, LogOut,
  Plus, Edit2, Trash2, CheckCircle, AlertCircle, Loader, RefreshCw, Wrench, BookOpen, Images, Quote
} from 'lucide-react';
import { api } from '@/services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data lists states
  const [projects, setProjects] = useState([]);
  const [houseStyles, setHouseStyles] = useState([]);
  const [team, setTeam] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [calcConfig, setCalcConfig] = useState(null);
  const [heroSlides, setHeroSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Status states
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states (modals or edit views)
  const [editingItem, setEditingItem] = useState(null); // stores item being edited
  const [isCreating, setIsCreating] = useState(false); // creation toggle
  
  // Custom form field states
  // 1. Projects Form
  const [projForm, setProjForm] = useState({ title: '', category: 'Residential', status: 'Completed', location: '', duration: '', description: '', image: '', gallery: '', highlights: '', specifications: '' });
  // 2. House Styles Form
  const [styleForm, setStyleForm] = useState({ id: '', title: '', category: 'Modern', description: '', longDescription: '', image: '', gallery: '', features: '', materials: '', specifications: '', price: '', floor_plan_image: '' });
  // 3. Team Form
  const [teamForm, setTeamForm] = useState({ name: '', designation: '', qualification: '', experience: '', avatar: '', color: '#1e40af' });
  // 4. Services Form
  const [serviceForm, setServiceForm] = useState({ id: '', title: '', shortDesc: '', fullDesc: '', icon: 'Wrench', image: '', features: '' });
  // 5. Blogs Form
  const [blogForm, setBlogForm] = useState({ id: '', title: '', summary: '', content: '', image: '' });
  // 6. Change Password Form
  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  // 7. Hero Slide Input Form
  const [newSlideImage, setNewSlideImage] = useState('');
  // 8. Testimonials Form
  const [testForm, setTestForm] = useState({ name: '', designation: '', location: '', avatar: '', rating: 5, text: '' });

  // Check auth
  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  async function fetchData() {
    setLoading(true);
    setError('');
    try {
      const [projData, styleData, teamData, leadsData, calcData, servicesData, blogsData, slidesData, testimonialsData] = await Promise.all([
        api.getProjects(),
        api.getHouseStyles(),
        api.getTeam(),
        api.getLeads(),
        api.getCalculatorConfig(),
        api.getServices(),
        api.getBlogs(),
        api.getHeroSlides(),
        api.getTestimonials()
      ]);
      setProjects(projData);
      setHouseStyles(styleData);
      setTeam(teamData);
      setLeads(leadsData);
      setCalcConfig(calcData);
      setServices(servicesData);
      setBlogs(blogsData);
      setHeroSlides(slidesData);
      setTestimonials(testimonialsData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data. Sessions may have expired.');
      if (err.message.includes('token') || err.message.includes('expired') || err.message.includes('unauthorized')) {
        api.logout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    api.logout();
    navigate('/admin/login');
  }

  const [uploadingImage, setUploadingImage] = useState(false);

  function triggerSuccess(msg) {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 4000);
  }

  async function handleLocalFileUpload(e, onUrlObtained) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');
    
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64Data = event.target.result.split(',')[1];
          const response = await api.uploadImage(file.name, base64Data);
          if (response && response.url) {
            onUrlObtained(response.url);
            triggerSuccess(`File "${file.name}" uploaded successfully!`);
          } else {
            throw new Error('No URL returned from server');
          }
        } catch (uploadErr) {
          setError(`File upload failed: ${uploadErr.message}`);
        } finally {
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(`Failed to read file: ${err.message}`);
      setUploadingImage(false);
    }
  }

  // ============================================================
  // PROJECTS CRUD OPERATIONS
  // ============================================================
  function startEditProject(proj) {
    setEditingItem(proj);
    setIsCreating(false);
    setProjForm({
      title: proj.title,
      category: proj.category,
      status: proj.status,
      location: proj.location,
      duration: proj.duration || '',
      description: proj.description,
      image: proj.image,
      gallery: proj.gallery.join('\n'),
      highlights: proj.highlights.join('\n'),
      specifications: Object.entries(proj.specifications).map(([k, v]) => `${k}:${v}`).join('\n')
    });
  }

  function startCreateProject() {
    setEditingItem(null);
    setIsCreating(true);
    setProjForm({ title: '', category: 'Residential', status: 'Completed', location: '', duration: '', description: '', image: '', gallery: '', highlights: '', specifications: '' });
  }

  async function handleProjectSubmit(e) {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    const formattedPayload = {
      title: projForm.title,
      category: projForm.category,
      status: projForm.status,
      location: projForm.location,
      duration: projForm.duration,
      description: projForm.description,
      image: projForm.image,
      gallery: projForm.gallery.split('\n').map(l => l.trim()).filter(Boolean),
      highlights: projForm.highlights.split('\n').map(l => l.trim()).filter(Boolean),
      specifications: projForm.specifications.split('\n').reduce((acc, curr) => {
        const [k, ...v] = curr.split(':');
        if (k && v.length) acc[k.trim()] = v.join(':').trim();
        return acc;
      }, {})
    };

    try {
      if (isCreating) {
        await api.createProject(formattedPayload);
        triggerSuccess('Project created successfully!');
      } else {
        await api.updateProject(editingItem.id, formattedPayload);
        triggerSuccess('Project updated successfully!');
      }
      setIsCreating(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleDeleteProject(id) {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      triggerSuccess('Project deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Delete operation failed.');
    }
  }

  // ============================================================
  // HOUSE STYLES CRUD OPERATIONS
  // ============================================================
  function startEditStyle(sty) {
    setEditingItem(sty);
    setIsCreating(false);
    setStyleForm({
      id: sty.id,
      title: sty.title,
      category: sty.category,
      description: sty.description,
      longDescription: sty.longDescription,
      image: sty.image,
      gallery: sty.gallery.join('\n'),
      features: sty.features.join('\n'),
      materials: sty.materials.join('\n'),
      specifications: Object.entries(sty.specifications).map(([k, v]) => `${k}:${v}`).join('\n'),
      price: sty.price || '',
      floor_plan_image: sty.floor_plan_image || ''
    });
  }

  function startCreateStyle() {
    setEditingItem(null);
    setIsCreating(true);
    setStyleForm({ id: '', title: '', category: 'Modern', description: '', longDescription: '', image: '', gallery: '', features: '', materials: '', specifications: '', price: '', floor_plan_image: '' });
  }

  async function handleStyleSubmit(e) {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    const formattedPayload = {
      id: isCreating ? styleForm.id.trim().toLowerCase().replace(/\s+/g, '-') : styleForm.id,
      title: styleForm.title,
      category: styleForm.category,
      description: styleForm.description,
      longDescription: styleForm.longDescription,
      image: styleForm.image,
      gallery: styleForm.gallery.split('\n').map(l => l.trim()).filter(Boolean),
      features: styleForm.features.split('\n').map(l => l.trim()).filter(Boolean),
      materials: styleForm.materials.split('\n').map(l => l.trim()).filter(Boolean),
      specifications: styleForm.specifications.split('\n').reduce((acc, curr) => {
        const [k, ...v] = curr.split(':');
        if (k && v.length) acc[k.trim()] = v.join(':').trim();
        return acc;
      }, {}),
      price: styleForm.price,
      floor_plan_image: styleForm.floor_plan_image || ''
    };

    console.log('[handleStyleSubmit] floor_plan_image being sent:', formattedPayload.floor_plan_image || '(empty)');

    try {
      if (isCreating) {
        await api.createHouseStyle(formattedPayload);
        triggerSuccess('Design created successfully!');
      } else {
        await api.updateHouseStyle(editingItem.id, formattedPayload);
        triggerSuccess('Design updated successfully!');
      }
      setIsCreating(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleDeleteStyle(id) {
    if (!window.confirm('Are you sure you want to delete this design?')) return;
    try {
      await api.deleteHouseStyle(id);
      triggerSuccess('Design deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Delete operation failed.');
    }
  }

  // ============================================================
  // TEAM CRUD OPERATIONS
  // ============================================================
  function startEditTeam(t) {
    setEditingItem(t);
    setIsCreating(false);
    setTeamForm({
      name: t.name,
      designation: t.designation,
      qualification: t.qualification,
      experience: t.experience,
      avatar: t.avatar,
      color: t.color || '#1e40af'
    });
  }

  function startCreateTeam() {
    setEditingItem(null);
    setIsCreating(true);
    setTeamForm({ name: '', designation: '', qualification: '', experience: '', avatar: '', color: '#1e40af' });
  }

  async function handleTeamSubmit(e) {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    try {
      if (isCreating) {
        await api.createTeamMember(teamForm);
        triggerSuccess('Team member created successfully!');
      } else {
        await api.updateTeamMember(editingItem.id, teamForm);
        triggerSuccess('Team member updated successfully!');
      }
      setIsCreating(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleDeleteTeam(id) {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      await api.deleteTeamMember(id);
      triggerSuccess('Team member deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Delete operation failed.');
    }
  }

  // ============================================================
  // SERVICES CRUD OPERATIONS
  // ============================================================
  function startEditService(svc) {
    setEditingItem(svc);
    setIsCreating(false);
    setServiceForm({
      id: svc.id,
      title: svc.title,
      shortDesc: svc.shortDesc,
      fullDesc: svc.fullDesc,
      icon: svc.icon || 'Wrench',
      image: svc.image || '',
      features: svc.features.join('\n')
    });
  }

  function startCreateService() {
    setEditingItem(null);
    setIsCreating(true);
    setServiceForm({ id: '', title: '', shortDesc: '', fullDesc: '', icon: 'Wrench', image: '', features: '' });
  }

  async function handleServiceSubmit(e) {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    const formattedPayload = {
      id: isCreating ? serviceForm.id.trim().toLowerCase().replace(/\s+/g, '-') : serviceForm.id,
      title: serviceForm.title,
      shortDesc: serviceForm.shortDesc,
      fullDesc: serviceForm.fullDesc,
      icon: serviceForm.icon,
      image: serviceForm.image,
      features: serviceForm.features.split('\n').map(l => l.trim()).filter(Boolean)
    };

    try {
      if (isCreating) {
        await api.createService(formattedPayload);
        triggerSuccess('Service created successfully!');
      } else {
         await api.updateService(editingItem.id, formattedPayload);
        triggerSuccess('Service updated successfully!');
      }
      setIsCreating(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleDeleteService(id) {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.deleteService(id);
      triggerSuccess('Service deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Delete operation failed.');
    }
  }

  // ============================================================
  // BLOGS CRUD OPERATIONS
  // ============================================================
  function startEditBlog(b) {
    setEditingItem(b);
    setIsCreating(false);
    setBlogForm({
      id: b.id,
      title: b.title,
      summary: b.summary,
      content: b.content,
      image: b.image || ''
    });
  }

  function startCreateBlog() {
    setEditingItem(null);
    setIsCreating(true);
    setBlogForm({ id: '', title: '', summary: '', content: '', image: '' });
  }

  async function handleBlogSubmit(e) {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    const formattedPayload = {
      id: isCreating ? blogForm.id.trim().toLowerCase().replace(/\s+/g, '-') : blogForm.id,
      title: blogForm.title,
      summary: blogForm.summary,
      content: blogForm.content,
      image: blogForm.image
    };

    try {
      if (isCreating) {
        await api.createBlog(formattedPayload);
        triggerSuccess('Blog post created successfully!');
      } else {
        await api.updateBlog(editingItem.id, formattedPayload);
        triggerSuccess('Blog post updated successfully!');
      }
      setIsCreating(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleDeleteBlog(id) {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.deleteBlog(id);
      triggerSuccess('Blog post deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Delete operation failed.');
    }
  }

  // ============================================================
  // CALCULATOR CONFIG OPTIONS EDIT
  // ============================================================
  async function handleCalculatorConfigSubmit(e) {
    e.preventDefault();
    setSaveLoading(true);
    setError('');
    try {
      await api.updateCalculatorConfig(calcConfig);
      triggerSuccess('Calculator config parameters updated successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to update calculator configurations.');
    } finally {
      setSaveLoading(false);
    }
  }

  const updateConfigPackage = (idx, field, val) => {
    const updatedPkgs = [...calcConfig.packages];
    updatedPkgs[idx] = { ...updatedPkgs[idx], [field]: val };
    setCalcConfig({ ...calcConfig, packages: updatedPkgs });
  };

  const updateConfigLocation = (idx, field, val) => {
    const updatedLocs = [...calcConfig.locations];
    updatedLocs[idx] = { ...updatedLocs[idx], [field]: val };
    setCalcConfig({ ...calcConfig, locations: updatedLocs });
  };

  const updateConfigFloor = (idx, field, val) => {
    const updatedFloors = [...calcConfig.floors];
    updatedFloors[idx] = { ...updatedFloors[idx], [field]: val };
    setCalcConfig({ ...calcConfig, floors: updatedFloors });
  };

  const updateConfigTerrain = (idx, field, val) => {
    const updatedTerrains = [...calcConfig.terrains];
    updatedTerrains[idx] = { ...updatedTerrains[idx], [field]: val };
    setCalcConfig({ ...calcConfig, terrains: updatedTerrains });
  };

  const updateConfigStyle = (idx, field, val) => {
    const updatedStyles = [...calcConfig.styles];
    updatedStyles[idx] = { ...updatedStyles[idx], [field]: val };
    setCalcConfig({ ...calcConfig, styles: updatedStyles });
  };

  const updateConfigUpgrade = (idx, field, val) => {
    const updatedUpgrades = [...calcConfig.upgrades];
    updatedUpgrades[idx] = { ...updatedUpgrades[idx], [field]: val };
    setCalcConfig({ ...calcConfig, upgrades: updatedUpgrades });
  };

  const updateConfigDistribution = (field, val) => {
    setCalcConfig({
      ...calcConfig,
      distribution: { ...calcConfig.distribution, [field]: val }
    });
  };

  const updateConfigVariance = (val) => {
    setCalcConfig({ ...calcConfig, variance: val });
  };

  // ============================================================
  // LEADS ACTIONS
  // ============================================================
  async function handleDeleteLead(id) {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      await api.deleteLead(id);
      triggerSuccess('Inquiry record deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to delete inquiry record.');
    }
  }

  // ============================================================
  // HERO SLIDES ACTIONS
  // ============================================================
  async function handleSlideSubmit(e) {
    e.preventDefault();
    if (!newSlideImage.trim()) return;
    setSaveLoading(true);
    setError('');
    try {
      await api.createHeroSlide({ image: newSlideImage.trim() });
      triggerSuccess('Hero slide added successfully!');
      setNewSlideImage('');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to add hero slide.');
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleDeleteSlide(id) {
    if (!window.confirm('Are you sure you want to delete this hero slide?')) return;
    try {
      await api.deleteHeroSlide(id);
      triggerSuccess('Hero slide deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to delete hero slide.');
    }
  }

  // ============================================================
  // TESTIMONIALS ACTIONS
  // ============================================================
  function startEditTestimonial(t) {
    setEditingItem(t);
    setIsCreating(false);
    setTestForm({
      name: t.name,
      designation: t.designation,
      location: t.location,
      avatar: t.avatar,
      rating: t.rating || 5,
      text: t.text
    });
  }

  function startCreateTestimonial() {
    setEditingItem(null);
    setIsCreating(true);
    setTestForm({ name: '', designation: '', location: '', avatar: '', rating: 5, text: '' });
  }

  async function handleTestimonialSubmit(e) {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    try {
      if (isCreating) {
        await api.createTestimonial(testForm);
        triggerSuccess('Testimonial added successfully!');
      } else {
        await api.updateTestimonial(editingItem.id, testForm);
        triggerSuccess('Testimonial updated successfully!');
      }
      setIsCreating(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleDeleteTestimonial(id) {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      triggerSuccess('Testimonial deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to delete testimonial.');
    }
  }

  // ============================================================
  // CHANGE PASSWORD
  // ============================================================
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setError('');
    
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setSaveLoading(true);
    try {
      await api.changePassword(pwForm.oldPassword, pwForm.newPassword);
      triggerSuccess('Admin password changed successfully!');
      setPwForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Failed to change admin password.');
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Amulya Builders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12 font-sans">
        
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 py-4 shadow-sm mb-8">
          <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                Amulya Builders Control panel
              </h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                Admin: {localStorage.getItem('amulya_admin_user') || 'Manager'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
                title="Reload Data"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-700 hover:bg-red-50 font-semibold rounded-xl text-xs transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="container-custom">
          {/* Success / Error notification */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-2 text-xs font-bold shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-2 text-xs font-bold shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Sidebar & content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar (3-columns) */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200/60 shadow-sm space-y-1.5">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 block mb-2">Content Tables</span>
              
              <button
                onClick={() => { setActiveTab('projects'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'projects' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                Projects CRUD
              </button>

              <button
                onClick={() => { setActiveTab('styles'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'styles' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Layout className="w-4 h-4" />
                Designs CRUD
              </button>

              <button
                onClick={() => { setActiveTab('team'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'team' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                Team Profiles
              </button>

              <button
                onClick={() => { setActiveTab('services'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'services' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Wrench className="w-4 h-4" />
                Services CRUD
              </button>

              <button
                onClick={() => { setActiveTab('blogs'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'blogs' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Blog Posts CRUD
              </button>

              <div className="h-px bg-gray-100 my-4" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 block mb-2">Configurations</span>

              <button
                onClick={() => { setActiveTab('config'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'config' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calculator className="w-4 h-4" />
                Calculator Config
              </button>

              <button
                onClick={() => { setActiveTab('leads'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'leads' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Inquiries / Leads
                {leads.length > 0 && (
                  <span className="ml-auto bg-orange-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full">
                    {leads.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('slider'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'slider' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Images className="w-4 h-4" />
                Hero Slider
              </button>

              <button
                onClick={() => { setActiveTab('testimonials'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'testimonials' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Quote className="w-4 h-4" />
                Testimonials CRUD
              </button>

              <div className="h-px bg-gray-100 my-4" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 block mb-2">Security</span>

              <button
                onClick={() => { setActiveTab('password'); setIsCreating(false); setEditingItem(null); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'password' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                Change Password
              </button>
            </div>

            {/* Content Area (9-columns) */}
            <div className="lg:col-span-9 bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm min-h-[480px]">
              
              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center gap-3">
                  <Loader className="w-8 h-8 text-blue-800 animate-spin" />
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Syncing database...</span>
                </div>
              ) : (
                <>
                  
                  {/* TAB 1: PROJECTS */}
                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      
                      {!isCreating && !editingItem ? (
                        <>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-gray-900">Manage Projects</h2>
                            <button
                              onClick={startCreateProject}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" /> Add Project
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                  <th className="py-3 px-4">Title</th>
                                  <th className="py-3 px-4">Category</th>
                                  <th className="py-3 px-4">Location</th>
                                  <th className="py-3 px-4">Status</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                                {projects.map(p => (
                                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3.5 px-4 font-bold text-gray-950">{p.title}</td>
                                    <td className="py-3.5 px-4">{p.category}</td>
                                    <td className="py-3.5 px-4 text-gray-500">{p.location}</td>
                                    <td className="py-3.5 px-4">
                                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                                        p.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-150' : 'bg-blue-50 text-blue-700 border border-blue-150'
                                      }`}>
                                        {p.status}
                                      </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right space-x-2">
                                      <button onClick={() => startEditProject(p)} className="p-1.5 text-blue-800 hover:bg-blue-50 rounded" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                                      <button onClick={() => handleDeleteProject(p.id)} className="p-1.5 text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        // Edit/Create form
                        <form onSubmit={handleProjectSubmit} className="space-y-4">
                          <h2 className="text-lg font-extrabold text-gray-900">{isCreating ? 'Add New Project' : 'Edit Project'}</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Project Title</label>
                              <input type="text" required value={projForm.title} onChange={e => setProjForm({...projForm, title: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
                              <select value={projForm.category} onChange={e => setProjForm({...projForm, category: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800">
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Industrial</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Status</label>
                              <select value={projForm.status} onChange={e => setProjForm({...projForm, status: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800">
                                <option>Completed</option>
                                <option>Ongoing</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Location</label>
                              <input type="text" required value={projForm.location} onChange={e => setProjForm({...projForm, location: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Duration</label>
                              <input type="text" value={projForm.duration} onChange={e => setProjForm({...projForm, duration: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. 14 Months / Ongoing" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase flex justify-between items-center">
                                <span>Cover Image URL</span>
                                <span className="text-[10px] text-gray-400 font-semibold normal-case">Or upload local file</span>
                              </label>
                              <div className="flex gap-2">
                                <input type="text" required value={projForm.image} onChange={e => setProjForm({...projForm, image: e.target.value})} className="flex-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="https://... or /uploads/..." />
                                <div className="relative">
                                  <input type="file" accept="image/*" disabled={uploadingImage} onChange={e => handleLocalFileUpload(e, url => setProjForm({...projForm, image: url}))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                  <button type="button" disabled={uploadingImage} className="h-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50">
                                    {uploadingImage ? '...' : 'Browse'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
                            <textarea rows="4" required value={projForm.description} onChange={e => setProjForm({...projForm, description: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase flex justify-between items-center">
                              <span>Gallery Image URLs (One per line)</span>
                              <div className="relative text-[10px] text-gray-400 font-semibold normal-case">
                                <input type="file" accept="image/*" disabled={uploadingImage} onChange={e => handleLocalFileUpload(e, url => {
                                  const currentGallery = projForm.gallery ? projForm.gallery.trim() : '';
                                  const separator = currentGallery ? '\n' : '';
                                  setProjForm({...projForm, gallery: `${currentGallery}${separator}${url}`});
                                })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                <span className="text-blue-805 hover:underline cursor-pointer font-bold">{uploadingImage ? 'Uploading...' : 'Upload file to gallery'}</span>
                              </div>
                            </label>
                            <textarea rows="3" value={projForm.gallery} onChange={e => setProjForm({...projForm, gallery: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="https://... or /uploads/..." />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Highlights (One per line)</label>
                              <textarea rows="3" value={projForm.highlights} onChange={e => setProjForm({...projForm, highlights: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Specifications (Key:Value per line)</label>
                              <textarea rows="3" value={projForm.specifications} onChange={e => setProjForm({...projForm, specifications: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="Built Area: 3,500 sq.ft." />
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end pt-4">
                            <button type="button" onClick={() => { setIsCreating(false); setEditingItem(null); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={saveLoading} className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center gap-1.5">
                              {saveLoading && <Loader className="w-3.5 h-3.5 animate-spin" />}
                              Save Project
                            </button>
                          </div>
                        </form>
                      )}

                    </div>
                  )}

                  {/* TAB 2: HOUSE STYLES */}
                  {activeTab === 'styles' && (
                    <div className="space-y-6">
                      
                      {!isCreating && !editingItem ? (
                        <>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-gray-900">Manage Designs</h2>
                            <button
                              onClick={startCreateStyle}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" /> Add Design
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                  <th className="py-3 px-4">ID</th>
                                  <th className="py-3 px-4">Title</th>
                                  <th className="py-3 px-4">Category</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                                {houseStyles.map(s => (
                                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3.5 px-4 font-bold text-gray-500">{s.id}</td>
                                    <td className="py-3.5 px-4 font-bold text-gray-950">{s.title}</td>
                                    <td className="py-3.5 px-4">{s.category}</td>
                                    <td className="py-3.5 px-4 text-right space-x-2">
                                      <button onClick={() => startEditStyle(s)} className="p-1.5 text-blue-800 hover:bg-blue-50 rounded" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                                      <button onClick={() => handleDeleteStyle(s.id)} className="p-1.5 text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        // Create/Edit style form
                        <form onSubmit={handleStyleSubmit} className="space-y-4">
                          <h2 className="text-lg font-extrabold text-gray-900">{isCreating ? 'Add Design' : 'Edit Design'}</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Design ID (Permanent url slug)</label>
                              <input type="text" required disabled={!isCreating} value={styleForm.id} onChange={e => setStyleForm({...styleForm, id: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800 disabled:bg-gray-50" placeholder="e.g. traditional-newari" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Title</label>
                              <input type="text" required value={styleForm.title} onChange={e => setStyleForm({...styleForm, title: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
                              <select value={styleForm.category} onChange={e => setStyleForm({...styleForm, category: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800">
                                <option>Modern</option>
                                <option>Traditional</option>
                                <option>Classical</option>
                                <option>Sloped Roof</option>
                                <option>Eco-Friendly</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase flex justify-between items-center">
                                <span>Cover Image URL</span>
                                <span className="text-[10px] text-gray-400 font-semibold normal-case">Or upload local file</span>
                              </label>
                              <div className="flex gap-2">
                                <input type="text" required value={styleForm.image} onChange={e => setStyleForm(prev => ({...prev, image: e.target.value}))} className="flex-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="https://... or /uploads/..." />
                                <div className="relative">
                                  <input type="file" accept="image/*" disabled={uploadingImage} onChange={e => handleLocalFileUpload(e, url => setStyleForm(prev => ({...prev, image: url})))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                  <button type="button" disabled={uploadingImage} className="h-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50">
                                    {uploadingImage ? '...' : 'Browse'}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase flex justify-between items-center">
                                <span>Floor Plan Image URL</span>
                                <span className="text-[10px] text-gray-400 font-semibold normal-case">Or upload local file</span>
                              </label>
                              <div className="flex gap-2">
                                <input type="text" value={styleForm.floor_plan_image || ''} onChange={e => setStyleForm(prev => ({...prev, floor_plan_image: e.target.value}))} className="flex-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="https://... or /uploads/..." />
                                <div className="relative">
                                  <input type="file" accept="image/*" disabled={uploadingImage} onChange={e => handleLocalFileUpload(e, url => setStyleForm(prev => ({...prev, floor_plan_image: url})))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                  <button type="button" disabled={uploadingImage} className="h-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50">
                                    {uploadingImage ? '...' : 'Browse'}
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Design Brochure Price</label>
                              <input type="text" required value={styleForm.price} onChange={e => setStyleForm({...styleForm, price: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. Rs 27,950.00" />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Brief Description</label>
                            <input type="text" required value={styleForm.description} onChange={e => setStyleForm({...styleForm, description: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Design Philosophy (Long Description)</label>
                            <textarea rows="4" required value={styleForm.longDescription} onChange={e => setStyleForm({...styleForm, longDescription: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase flex justify-between items-center">
                              <span>Gallery Image URLs (One per line)</span>
                              <div className="relative text-[10px] text-gray-400 font-semibold normal-case">
                                <input type="file" accept="image/*" disabled={uploadingImage} onChange={e => handleLocalFileUpload(e, url => {
                                  const currentGallery = styleForm.gallery ? styleForm.gallery.trim() : '';
                                  const separator = currentGallery ? '\n' : '';
                                  setStyleForm({...styleForm, gallery: `${currentGallery}${separator}${url}`});
                                })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                <span className="text-blue-805 hover:underline cursor-pointer font-bold">{uploadingImage ? 'Uploading...' : 'Upload file to gallery'}</span>
                              </div>
                            </label>
                            <textarea rows="3" value={styleForm.gallery} onChange={e => setStyleForm({...styleForm, gallery: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="https://... or /uploads/..." />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Distinctive Features (One per line)</label>
                              <textarea rows="3" value={styleForm.features} onChange={e => setStyleForm({...styleForm, features: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Recommended Materials (One per line)</label>
                              <textarea rows="3" value={styleForm.materials} onChange={e => setStyleForm({...styleForm, materials: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Specifications (Key:Value per line)</label>
                              <textarea rows="3" value={styleForm.specifications} onChange={e => setStyleForm({...styleForm, specifications: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="Est. Build Time: 12-14 Months" />
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end pt-4">
                            <button type="button" onClick={() => { setIsCreating(false); setEditingItem(null); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={saveLoading || uploadingImage} className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed">
                              {(saveLoading || uploadingImage) && <Loader className="w-3.5 h-3.5 animate-spin" />}
                              {uploadingImage ? 'Uploading image...' : 'Save Design'}
                            </button>
                          </div>
                        </form>
                      )}

                    </div>
                  )}

                  {/* TAB 3: TEAM */}
                  {activeTab === 'team' && (
                    <div className="space-y-6">
                      
                      {!isCreating && !editingItem ? (
                        <>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-gray-900">Manage Team Profiles</h2>
                            <button
                              onClick={startCreateTeam}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" /> Add Team Member
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                  <th className="py-3 px-4">Name</th>
                                  <th className="py-3 px-4">Designation</th>
                                  <th className="py-3 px-4">Qualifications</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                                {team.map(t => (
                                  <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3.5 px-4 font-bold text-gray-950">{t.name}</td>
                                    <td className="py-3.5 px-4 text-blue-800">{t.designation}</td>
                                    <td className="py-3.5 px-4 text-gray-500">{t.qualification}</td>
                                    <td className="py-3.5 px-4 text-right space-x-2">
                                      <button onClick={() => startEditTeam(t)} className="p-1.5 text-blue-800 hover:bg-blue-50 rounded" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                                      <button onClick={() => handleDeleteTeam(t.id)} className="p-1.5 text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        // Team form
                        <form onSubmit={handleTeamSubmit} className="space-y-4">
                          <h2 className="text-lg font-extrabold text-gray-900">{isCreating ? 'Add Team Member' : 'Edit Team Member'}</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Full Name</label>
                              <input type="text" required value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Designation</label>
                              <input type="text" required value={teamForm.designation} onChange={e => setTeamForm({...teamForm, designation: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Qualifications</label>
                              <input type="text" required value={teamForm.qualification} onChange={e => setTeamForm({...teamForm, qualification: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. B.E. Civil Engineering" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Experience Timeline</label>
                              <input type="text" required value={teamForm.experience} onChange={e => setTeamForm({...teamForm, experience: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. 15+ years" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Avatar Text Initials</label>
                              <input type="text" required maxLength="2" value={teamForm.avatar} onChange={e => setTeamForm({...teamForm, avatar: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. CE" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Avatar Color hex</label>
                              <input type="color" value={teamForm.color} onChange={e => setTeamForm({...teamForm, color: e.target.value})} className="w-full h-9 border border-gray-200 px-3 py-1 rounded-xl focus:outline-none" />
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end pt-4">
                            <button type="button" onClick={() => { setIsCreating(false); setEditingItem(null); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={saveLoading} className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center gap-1.5">
                              {saveLoading && <Loader className="w-3.5 h-3.5 animate-spin" />}
                              Save Member
                            </button>
                          </div>
                        </form>
                      )}

                    </div>
                  )}

                  {/* TAB: SERVICES */}
                  {activeTab === 'services' && (
                    <div className="space-y-6">
                      
                      {!isCreating && !editingItem ? (
                        <>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-gray-900">Manage Services</h2>
                            <button
                              onClick={startCreateService}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" /> Add Service
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                  <th className="py-3 px-4">Title</th>
                                  <th className="py-3 px-4">ID</th>
                                  <th className="py-3 px-4">Icon</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                                {services.map(s => (
                                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3.5 px-4 font-bold text-gray-950">{s.title}</td>
                                    <td className="py-3.5 px-4 text-gray-500">{s.id}</td>
                                    <td className="py-3.5 px-4">{s.icon}</td>
                                    <td className="py-3.5 px-4 text-right space-x-2">
                                      <button onClick={() => startEditService(s)} className="p-1.5 text-blue-800 hover:bg-blue-50 rounded" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                                      <button onClick={() => handleDeleteService(s.id)} className="p-1.5 text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        // Edit/Create form
                        <form onSubmit={handleServiceSubmit} className="space-y-4">
                          <h2 className="text-lg font-extrabold text-gray-900">{isCreating ? 'Add New Service' : 'Edit Service'}</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Service ID (slug)</label>
                              <input type="text" required disabled={!isCreating} value={serviceForm.id} onChange={e => setServiceForm({...serviceForm, id: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800 disabled:bg-gray-50" placeholder="e.g. interior-design" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Title</label>
                              <input type="text" required value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Lucide Icon Name</label>
                              <select value={serviceForm.icon} onChange={e => setServiceForm({...serviceForm, icon: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800">
                                <option value="Home">Home</option>
                                <option value="Building2">Building2</option>
                                <option value="PenTool">PenTool</option>
                                <option value="Wrench">Wrench</option>
                                <option value="Columns">Columns</option>
                                <option value="Layers">Layers</option>
                                <option value="ClipboardList">ClipboardList</option>
                                <option value="BarChart2">BarChart2</option>
                                <option value="Paintbrush">Paintbrush</option>
                                <option value="Hammer">Hammer</option>
                                <option value="HardHat">HardHat</option>
                                <option value="Ruler">Ruler</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase flex justify-between items-center">
                                <span>Cover Image URL</span>
                                <span className="text-[10px] text-gray-400 font-semibold normal-case">Or upload local file</span>
                              </label>
                              <div className="flex gap-2">
                                <input type="text" required value={serviceForm.image} onChange={e => setServiceForm({...serviceForm, image: e.target.value})} className="flex-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="https://... or /uploads/..." />
                                <div className="relative">
                                  <input type="file" accept="image/*" disabled={uploadingImage} onChange={e => handleLocalFileUpload(e, url => setServiceForm({...serviceForm, image: url}))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                  <button type="button" disabled={uploadingImage} className="h-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50">
                                    {uploadingImage ? '...' : 'Browse'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Short Description (for homepage card)</label>
                            <input type="text" required value={serviceForm.shortDesc} onChange={e => setServiceForm({...serviceForm, shortDesc: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Full Description</label>
                            <textarea rows="4" required value={serviceForm.fullDesc} onChange={e => setServiceForm({...serviceForm, fullDesc: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Key Features (One per line)</label>
                            <textarea rows="4" required value={serviceForm.features} onChange={e => setServiceForm({...serviceForm, features: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="NBC Certified&#10;Premium finishes" />
                          </div>

                          <div className="flex gap-2 justify-end pt-4">
                            <button type="button" onClick={() => { setIsCreating(false); setEditingItem(null); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={saveLoading} className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center gap-1.5">
                              {saveLoading && <Loader className="w-3.5 h-3.5 animate-spin" />}
                              Save Service
                            </button>
                          </div>
                        </form>
                      )}

                    </div>
                  )}

                  {/* TAB: BLOGS */}
                  {activeTab === 'blogs' && (
                    <div className="space-y-6">
                      
                      {!isCreating && !editingItem ? (
                        <>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-gray-900">Manage Blog Posts</h2>
                            <button
                              onClick={startCreateBlog}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" /> Add Blog Post
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                  <th className="py-3 px-4">Title</th>
                                  <th className="py-3 px-4">Slug ID</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                                {blogs.map(b => (
                                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3.5 px-4 font-bold text-gray-950">{b.title}</td>
                                    <td className="py-3.5 px-4 text-gray-500">{b.id}</td>
                                    <td className="py-3.5 px-4 text-right space-x-2">
                                      <button onClick={() => startEditBlog(b)} className="p-1.5 text-blue-800 hover:bg-blue-50 rounded" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                                      <button onClick={() => handleDeleteBlog(b.id)} className="p-1.5 text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        // Edit/Create form
                        <form onSubmit={handleBlogSubmit} className="space-y-4">
                          <h2 className="text-lg font-extrabold text-gray-900">{isCreating ? 'Create Blog Post' : 'Edit Blog Post'}</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Slug ID (Permanent url slug)</label>
                              <input type="text" required disabled={!isCreating} value={blogForm.id} onChange={e => setBlogForm({...blogForm, id: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800 disabled:bg-gray-50" placeholder="e.g. guide-to-building-safely" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Title</label>
                              <input type="text" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase flex justify-between items-center">
                              <span>Cover Image URL</span>
                              <span className="text-[10px] text-gray-400 font-semibold normal-case">Or upload local file</span>
                            </label>
                            <div className="flex gap-2">
                              <input type="text" required value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})} className="flex-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="https://... or /uploads/..." />
                              <div className="relative">
                                <input type="file" accept="image/*" disabled={uploadingImage} onChange={e => handleLocalFileUpload(e, url => setBlogForm({...blogForm, image: url}))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                <button type="button" disabled={uploadingImage} className="h-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50">
                                  {uploadingImage ? '...' : 'Browse'}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Summary Snippet</label>
                            <input type="text" required value={blogForm.summary} onChange={e => setBlogForm({...blogForm, summary: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="A short description summarizing the post..." />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Blog Post Content (Support paragraphs separated by double newlines)</label>
                            <textarea rows="10" required value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="Use double newline spacing. Use '### Heading' for subheadings and '- list item' for bullets." />
                          </div>

                          <div className="flex gap-2 justify-end pt-4">
                            <button type="button" onClick={() => { setIsCreating(false); setEditingItem(null); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={saveLoading} className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center gap-1.5">
                              {saveLoading && <Loader className="w-3.5 h-3.5 animate-spin" />}
                              Save Blog Post
                            </button>
                          </div>
                        </form>
                      )}

                    </div>
                  )}

                  {/* TAB 4: CALCULATOR CONFIG */}
                  {activeTab === 'config' && calcConfig && (
                    <form onSubmit={handleCalculatorConfigSubmit} className="space-y-6">
                      <h2 className="text-lg font-extrabold text-gray-900">Configure Calculator Rates</h2>
                      <p className="text-xs text-gray-400 font-medium">Update Indicative Market rates and regional location adjustment multipliers for Nepal.</p>
                      
                      {/* Package Rates */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-gray-150 pb-2">1. Indicative Base Package Rates (per sq. ft.)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {calcConfig.packages.map((pkg, idx) => (
                            <div key={pkg.id} className="p-4 bg-gray-50 rounded-xl border border-gray-250/30 space-y-2">
                              <label className="text-xs font-extrabold text-gray-900 block">{pkg.title} Rate (रू)</label>
                              <input
                                type="number"
                                required
                                value={pkg.rate}
                                onChange={(e) => updateConfigPackage(idx, 'rate', Number(e.target.value))}
                                className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-black text-blue-800 focus:outline-none focus:border-blue-850"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Location Factors */}
                      <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-gray-150 pb-2">2. Regional Location Adjustment Factors</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {calcConfig.locations.map((loc, idx) => (
                            <div key={loc.id} className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                              <label className="text-[10px] font-bold text-gray-600 block leading-tight">{loc.title}</label>
                              <input
                                type="number"
                                step="0.01"
                                required
                                value={loc.factor}
                                onChange={(e) => updateConfigLocation(idx, 'factor', Number(e.target.value))}
                                className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Floor Load Adjustment Factors */}
                      <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-gray-150 pb-2">3. Floor Load Adjustment Multipliers</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {calcConfig.floors.map((flr, idx) => (
                            <div key={flr.id} className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                              <label className="text-[10px] font-bold text-gray-600 block leading-tight">{flr.title}</label>
                              <input
                                type="number"
                                step="0.01"
                                required
                                value={flr.factor}
                                onChange={(e) => updateConfigFloor(idx, 'factor', Number(e.target.value))}
                                className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Terrain Factors */}
                      <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-gray-150 pb-2">4. Terrain & Soil Profile Factors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {calcConfig.terrains.map((trn, idx) => (
                            <div key={trn.id} className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-2">
                              <label className="text-[10px] font-bold text-gray-600 block leading-tight">{trn.title}</label>
                              <input
                                type="number"
                                step="0.01"
                                required
                                value={trn.factor}
                                onChange={(e) => updateConfigTerrain(idx, 'factor', Number(e.target.value))}
                                className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                              />
                              <input
                                type="text"
                                required
                                value={trn.desc}
                                onChange={(e) => updateConfigTerrain(idx, 'desc', e.target.value)}
                                className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-[10px] text-gray-600 focus:outline-none"
                                placeholder="Description"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Style Factors */}
                      <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-gray-150 pb-2">5. Architectural Style Factors</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {calcConfig.styles.map((sty, idx) => (
                            <div key={sty.id} className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                              <label className="text-[10px] font-bold text-gray-600 block leading-tight">{sty.title}</label>
                              <input
                                type="number"
                                step="0.01"
                                required
                                value={sty.factor}
                                onChange={(e) => updateConfigStyle(idx, 'factor', Number(e.target.value))}
                                className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Upgrade Costs */}
                      <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-gray-150 pb-2">6. Optional Upgrades Costs (NPR)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {calcConfig.upgrades.map((upg, idx) => (
                            <div key={upg.id} className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-2">
                              <label className="text-[10px] font-bold text-gray-600 block leading-tight">{upg.title}</label>
                              <input
                                type="number"
                                required
                                value={upg.cost}
                                onChange={(e) => updateConfigUpgrade(idx, 'cost', Number(e.target.value))}
                                className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-blue-800 focus:outline-none"
                              />
                              <input
                                type="text"
                                required
                                value={upg.desc}
                                onChange={(e) => updateConfigUpgrade(idx, 'desc', e.target.value)}
                                className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-[10px] text-gray-600 focus:outline-none"
                                placeholder="Description"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Distribution & Variance */}
                      <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-gray-150 pb-2">7. Cost Distribution & Variance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                            <label className="text-[10px] font-bold text-gray-600 block leading-tight">Civil (Ratio)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={calcConfig.distribution.civil}
                              onChange={(e) => updateConfigDistribution('civil', Number(e.target.value))}
                              className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                            />
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                            <label className="text-[10px] font-bold text-gray-600 block leading-tight">Finishes (Ratio)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={calcConfig.distribution.finishes}
                              onChange={(e) => updateConfigDistribution('finishes', Number(e.target.value))}
                              className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                            />
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                            <label className="text-[10px] font-bold text-gray-600 block leading-tight">MEP (Ratio)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={calcConfig.distribution.mep}
                              onChange={(e) => updateConfigDistribution('mep', Number(e.target.value))}
                              className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                            />
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                            <label className="text-[10px] font-bold text-gray-600 block leading-tight">Permits (Ratio)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={calcConfig.distribution.permits}
                              onChange={(e) => updateConfigDistribution('permits', Number(e.target.value))}
                              className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                            />
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1 flex items-center justify-center">
                            <span className="text-[9px] font-semibold text-gray-500 block leading-none">Total: {Math.round((calcConfig.distribution.civil + calcConfig.distribution.finishes + calcConfig.distribution.mep + calcConfig.distribution.permits) * 100)}%</span>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-250/30 space-y-1">
                            <label className="text-[10px] font-bold text-gray-600 block leading-tight">Variance (Ratio)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={calcConfig.variance}
                              onChange={(e) => updateConfigVariance(Number(e.target.value))}
                              className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-bold text-gray-900 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button type="submit" disabled={saveLoading} className="px-5 py-3 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center gap-1.5 shadow-sm">
                          {saveLoading && <Loader className="w-3.5 h-3.5 animate-spin" />}
                          Update Configurations
                        </button>
                      </div>
                    </form>
                  )}

                  {/* TAB 5: LEADS */}
                  {activeTab === 'leads' && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-extrabold text-gray-900">Inquiry Leads</h2>
                      
                      {leads.length === 0 ? (
                        <p className="text-xs text-gray-500 font-semibold py-8 text-center bg-gray-50 rounded-xl">No leads submitted yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {leads.map(lead => (
                            <div key={lead.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-250/40 relative shadow-sm hover:shadow-md transition-shadow">
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              
                              <div className="space-y-3">
                                <div>
                                  <span className="text-[10px] text-gray-400 font-bold block">{new Date(lead.created_at).toLocaleString('en-NP')}</span>
                                  <h3 className="text-sm font-bold text-gray-950 mt-0.5">{lead.name}</h3>
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
                                    <span>📞 {lead.phone}</span>
                                    {lead.email && <span>✉️ {lead.email}</span>}
                                  </div>
                                </div>

                                <div className="bg-white p-3.5 rounded-xl border border-gray-200/60 text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                                  {lead.message}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB: HERO SLIDER */}
                  {activeTab === 'slider' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-extrabold text-gray-900">Manage Hero Image Slider</h2>
                      </div>

                      {/* Add new slide image form */}
                      <form onSubmit={handleSlideSubmit} className="bg-gray-50 p-5 rounded-2xl border border-gray-250/30 space-y-4">
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Add Slider Image</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-750 uppercase flex justify-between items-center">
                              <span>Slide Image URL</span>
                              <span className="text-[10px] text-gray-400 font-semibold normal-case">Or upload local file</span>
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                required
                                value={newSlideImage}
                                onChange={e => setNewSlideImage(e.target.value)}
                                className="flex-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800"
                                placeholder="https://... or /uploads/..."
                              />
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="image/*"
                                  disabled={uploadingImage}
                                  onChange={e => handleLocalFileUpload(e, url => setNewSlideImage(url))}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                />
                                <button type="button" disabled={uploadingImage} className="h-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50">
                                  {uploadingImage ? '...' : 'Browse'}
                                </button>
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={saveLoading || !newSlideImage.trim()}
                            className="h-10 px-5 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center justify-center gap-1.5"
                          >
                            {saveLoading && <Loader className="w-3.5 h-3.5 animate-spin" />}
                            Add Slide Image
                          </button>
                        </div>
                      </form>

                      {/* Display grid of current slides */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Current Slider Slides</h3>
                        {heroSlides.length === 0 ? (
                          <p className="text-xs text-gray-500 font-semibold py-8 text-center bg-gray-50 rounded-xl">No slides uploaded yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {heroSlides.map((slide, idx) => (
                              <div key={slide.id || idx} className="group relative rounded-xl overflow-hidden aspect-video border border-gray-200 shadow-sm bg-black">
                                <img
                                  src={slide.image}
                                  alt={`Slide ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    onClick={() => handleDeleteSlide(slide.id)}
                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow flex items-center gap-1 text-[10px] font-bold"
                                    title="Delete Slide"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Delete Slide
                                  </button>
                                </div>
                                <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[9px] font-black rounded">
                                  Slide {idx + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB: TESTIMONIALS */}
                  {activeTab === 'testimonials' && (
                    <div className="space-y-6">
                      
                      {!isCreating && !editingItem ? (
                        <>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-gray-900">Manage Testimonials</h2>
                            <button
                              onClick={startCreateTestimonial}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" /> Add Testimonial
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                  <th className="py-3 px-4">Name</th>
                                  <th className="py-3 px-4">Designation</th>
                                  <th className="py-3 px-4">Location</th>
                                  <th className="py-3 px-4">Rating</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                                {testimonials.map(t => (
                                  <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3.5 px-4 font-bold text-gray-950 flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-blue-800 text-white font-black text-[9px] flex items-center justify-center">{t.avatar}</div>
                                      {t.name}
                                    </td>
                                    <td className="py-3.5 px-4 text-blue-800">{t.designation}</td>
                                    <td className="py-3.5 px-4 text-gray-500">{t.location}</td>
                                    <td className="py-3.5 px-4 text-orange-500 font-bold">{"★".repeat(t.rating)}</td>
                                    <td className="py-3.5 px-4 text-right space-x-2">
                                      <button onClick={() => startEditTestimonial(t)} className="p-1.5 text-blue-800 hover:bg-blue-50 rounded" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                                      <button onClick={() => handleDeleteTestimonial(t.id)} className="p-1.5 text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        // Edit/Create form
                        <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                          <h2 className="text-lg font-extrabold text-gray-900">{isCreating ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Client Name</label>
                              <input type="text" required value={testForm.name} onChange={e => setTestForm({...testForm, name: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Designation / Role</label>
                              <input type="text" required value={testForm.designation} onChange={e => setTestForm({...testForm, designation: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. Homeowner / CEO" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 uppercase">Location</label>
                              <input type="text" required value={testForm.location} onChange={e => setTestForm({...testForm, location: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. Lakeside, Kathmandu" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700 uppercase">Initials (Avatar)</label>
                                <input type="text" required maxLength="2" value={testForm.avatar} onChange={e => setTestForm({...testForm, avatar: e.target.value.toUpperCase()})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="e.g. KA" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700 uppercase">Rating Stars</label>
                                <select value={testForm.rating} onChange={e => setTestForm({...testForm, rating: Number(e.target.value)})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800">
                                  <option value="5">5 Stars</option>
                                  <option value="4">4 Stars</option>
                                  <option value="3">3 Stars</option>
                                  <option value="2">2 Stars</option>
                                  <option value="1">1 Star</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase">Client Feedback / Review Text</label>
                            <textarea rows="4" required value={testForm.text} onChange={e => setTestForm({...testForm, text: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" placeholder="Type review here..." />
                          </div>

                          <div className="flex gap-2 justify-end pt-4">
                            <button type="button" onClick={() => { setIsCreating(false); setEditingItem(null); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={saveLoading} className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 flex items-center gap-1.5">
                              {saveLoading && <Loader className="w-3.5 h-3.5 animate-spin" />}
                              Save Testimonial
                            </button>
                          </div>
                        </form>
                      )}

                    </div>
                  )}

                  {/* TAB 6: SECURITY */}
                  {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4">
                      <h2 className="text-lg font-extrabold text-gray-900">Change Admin Password</h2>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase">Old Password</label>
                        <input type="password" required value={pwForm.oldPassword} onChange={e => setPwForm({...pwForm, oldPassword: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase">New Password</label>
                        <input type="password" required value={pwForm.newPassword} onChange={e => setPwForm({...pwForm, newPassword: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase">Confirm New Password</label>
                        <input type="password" required value={pwForm.confirmPassword} onChange={e => setPwForm({...pwForm, confirmPassword: e.target.value})} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-800" />
                      </div>

                      <button type="submit" disabled={saveLoading} className="w-full py-3 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors flex items-center justify-center gap-1.5 mt-4">
                        {saveLoading && <Loader className="w-4 h-4 animate-spin" />}
                        Update Password
                      </button>
                    </form>
                  )}

                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
