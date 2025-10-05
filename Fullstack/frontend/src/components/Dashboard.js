import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('worklist');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const tabs = [
    { id: 'worklist', label: 'Worklist', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'create-rating', label: 'Create Rating', icon: '📄' },
    { id: 'batch', label: 'Batch', icon: '📚' },
    { id: 'report', label: 'Report', icon: '🖨️' },
    { id: 'administration', label: 'Administration', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'worklist':
        return (
          <div className="tab-content">
            <h2>Worklist</h2>
            <p>Manage your credit risk rating tasks and assignments.</p>
            <div className="content-placeholder">
              <div className="card">
                <h3>Pending Reviews</h3>
                <p>5 items pending review</p>
              </div>
              <div className="card">
                <h3>Completed Today</h3>
                <p>12 items completed</p>
              </div>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="tab-content">
            <h2>Search</h2>
            <p>Search for credit risk ratings and related information.</p>
            <div className="search-box">
              <input type="text" placeholder="Enter search terms..." />
              <button>Search</button>
            </div>
          </div>
        );
      case 'create-rating':
        return (
          <div className="tab-content">
            <h2>Create Rating</h2>
            <p>Create new credit risk ratings for clients.</p>
            <div className="form-placeholder">
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" placeholder="Enter client name" />
              </div>
              <div className="form-group">
                <label>Risk Category</label>
                <select>
                  <option>Low Risk</option>
                  <option>Medium Risk</option>
                  <option>High Risk</option>
                </select>
              </div>
              <button className="create-button">Create Rating</button>
            </div>
          </div>
        );
      case 'batch':
        return (
          <div className="tab-content">
            <h2>Batch Processing</h2>
            <p>Process multiple credit risk ratings in batches.</p>
            <div className="batch-actions">
              <button>Upload Batch File</button>
              <button>Process Pending Batches</button>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="tab-content">
            <h2>Reports</h2>
            <p>Generate and view various reports.</p>
            <div className="report-options">
              <div className="report-card">
                <h3>Monthly Summary</h3>
                <p>Generate monthly credit risk summary</p>
              </div>
              <div className="report-card">
                <h3>Client Portfolio</h3>
                <p>View client portfolio analysis</p>
              </div>
            </div>
          </div>
        );
      case 'administration':
        return (
          <div className="tab-content">
            <h2>Administration</h2>
            <p>Manage system settings and user permissions.</p>
            <div className="admin-sections">
              <div className="admin-card">
                <h3>User Management</h3>
                <p>Manage users and permissions</p>
              </div>
              <div className="admin-card">
                <h3>System Settings</h3>
                <p>Configure system parameters</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="platform-title">Credit Risk Rating Platform</h1>
          <div className="maybank-logo">
            <div className="tiger-icon">🐅</div>
            <span className="maybank-text">Maybank</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <div className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {(tab.id === 'report' || tab.id === 'administration') && (
                <span className="dropdown-arrow">▼</span>
              )}
            </button>
          ))}
        </div>
        
        {/* User Info and Notifications */}
        <div className="nav-user-info">
          <div className="notification">
            <span className="notification-icon">✉️</span>
            <span className="notification-count">0</span>
          </div>
          <div className="user-profile-container" ref={dropdownRef}>
            <div className="user-profile" onClick={toggleUserDropdown}>
              <span className="user-icon">👤</span>
              <span className="username">{user?.username || 'ratingmanager'}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            {showUserDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-item">
                  <span className="dropdown-icon">👤</span>
                  <span>Profile</span>
                </div>
                <div className="dropdown-item">
                  <span className="dropdown-icon">⚙️</span>
                  <span>Settings</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout-item" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;