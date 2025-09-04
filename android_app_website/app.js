// Application data
const appData = {
  "projects": [
    {
      "id": 1,
      "name": "Sunderbans Mangrove Restoration",
      "location": "West Bengal, India",
      "description": "Large-scale mangrove restoration project in the Sundarbans delta region",
      "targetArea": "5 Hectares",
      "status": "Needs Evidence",
      "lastSubmission": "2 days ago",
      "progress": 75,
      "target": 10000,
      "current": 7500,
      "unit": "Trees Planted"
    },
    {
      "id": 2,
      "name": "Coastal Restoration Initiative",
      "location": "Odisha, India", 
      "description": "Coastal protection through mangrove plantation",
      "targetArea": "8 Hectares",
      "status": "Pending Review",
      "lastSubmission": "4 days ago",
      "progress": 45,
      "target": 15000,
      "current": 6750,
      "unit": "Trees Planted"
    },
    {
      "id": 3,
      "name": "Blue Carbon Sequestration",
      "location": "Tamil Nadu, India",
      "description": "Carbon sequestration project through coastal vegetation",
      "targetArea": "12 Hectares", 
      "status": "Verified",
      "lastSubmission": "1 week ago",
      "progress": 90,
      "target": 20000,
      "current": 18000,
      "unit": "Trees Planted"
    }
  ],
  "evidenceHistory": [
    {
      "id": 1,
      "date": "02 Sep 2025",
      "status": "Pending Review",
      "thumbnail": "https://via.placeholder.com/70x70/4CAF50/white?text=🌱"
    },
    {
      "id": 2, 
      "date": "28 Aug 2025",
      "status": "Verified",
      "thumbnail": "https://via.placeholder.com/70x70/2196F3/white?text=🌿"
    },
    {
      "id": 3,
      "date": "25 Aug 2025", 
      "status": "Verified",
      "thumbnail": "https://via.placeholder.com/70x70/FF9800/white?text=🌳"
    }
  ],
  "notifications": [
    {
      "id": 1,
      "type": "verified",
      "message": "Evidence for Sunderbans project has been verified",
      "time": "2 hours ago"
    },
    {
      "id": 2,
      "type": "new_project", 
      "message": "New project assigned: Marine Conservation",
      "time": "1 day ago"
    },
    {
      "id": 3,
      "type": "rejected",
      "message": "Evidence rejected - photo quality insufficient",
      "time": "2 days ago"
    }
  ]
};

// Application state
let currentProject = null;
let isOffline = false;
let capturedPhotos = [];
let capturedVideo = null;

// DOM elements - will be set after DOM loads
let screens = {};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Set up DOM element references
  screens = {
    login: document.getElementById('login-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    projectDetails: document.getElementById('project-details-screen'),
    evidenceSubmission: document.getElementById('evidence-submission-screen')
  };
  
  // Verify elements exist
  console.log('Screen elements:', screens);
  
  initializeApp();
  setupEventListeners();
  updateTimestamp();
  setInterval(updateTimestamp, 60000); // Update every minute
});

function initializeApp() {
  console.log('Initializing app...');
  showScreen('login');
  loadNotifications();
  simulateNetworkStatus();
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Login screen
  const connectBtn = document.getElementById('connect-wallet-btn');
  if (connectBtn) {
    connectBtn.addEventListener('click', function(e) {
      console.log('Connect wallet button clicked');
      e.preventDefault();
      showWalletModal();
    });
  } else {
    console.error('Connect wallet button not found');
  }
  
  // Wallet modal
  const walletModal = document.getElementById('wallet-modal');
  if (walletModal) {
    walletModal.addEventListener('click', handleModalClick);
  }
  
  // Wallet options
  document.querySelectorAll('.wallet-option').forEach(option => {
    option.addEventListener('click', function(e) {
      console.log('Wallet option clicked:', e.currentTarget.dataset.wallet);
      handleWalletConnection(e);
    });
  });
  
  // Modal close button
  const modalCloseBtn = document.querySelector('.modal-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      hideWalletModal();
    });
  }
  
  // Navigation buttons
  const backToDashboard = document.getElementById('back-to-dashboard');
  if (backToDashboard) {
    backToDashboard.addEventListener('click', () => showScreen('dashboard'));
  }
  
  const backToProject = document.getElementById('back-to-project');
  if (backToProject) {
    backToProject.addEventListener('click', () => showScreen('projectDetails'));
  }
  
  // Notifications
  const notificationBtn = document.getElementById('notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', toggleNotifications);
  }
  
  const closeNotifications = document.querySelector('.close-notifications');
  if (closeNotifications) {
    closeNotifications.addEventListener('click', hideNotifications);
  }
  
  // Project details
  const submitEvidenceFab = document.getElementById('submit-evidence-fab');
  if (submitEvidenceFab) {
    submitEvidenceFab.addEventListener('click', () => showScreen('evidenceSubmission'));
  }
  
  // Evidence submission
  const takePhotoBtn = document.getElementById('take-photo-btn');
  if (takePhotoBtn) {
    takePhotoBtn.addEventListener('click', takePhoto);
  }
  
  const retakeBtn = document.getElementById('retake-btn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', retakePhoto);
  }
  
  const addVideoBtn = document.getElementById('add-video-btn');
  if (addVideoBtn) {
    addVideoBtn.addEventListener('click', recordVideo);
  }
  
  const submitEvidenceBtn = document.getElementById('submit-evidence-btn');
  if (submitEvidenceBtn) {
    submitEvidenceBtn.addEventListener('click', submitEvidence);
  }
  
  // Checklist toggle
  const checklistToggle = document.getElementById('checklist-toggle');
  if (checklistToggle) {
    checklistToggle.addEventListener('click', toggleChecklist);
  }
  
  // Loading modal
  const loadingModal = document.getElementById('loading-modal');
  if (loadingModal) {
    loadingModal.addEventListener('click', handleLoadingModalClick);
  }
}

// Screen navigation
function showScreen(screenName) {
  console.log('Showing screen:', screenName);
  
  Object.keys(screens).forEach(key => {
    if (screens[key]) {
      screens[key].classList.add('hidden');
    }
  });
  
  if (screens[screenName]) {
    screens[screenName].classList.remove('hidden');
  } else {
    console.error('Screen not found:', screenName);
  }
  
  if (screenName === 'dashboard') {
    loadProjects();
  } else if (screenName === 'projectDetails') {
    loadProjectDetails();
  } else if (screenName === 'evidenceSubmission') {
    resetEvidenceForm();
  }
}

// Wallet connection
function showWalletModal() {
  console.log('Showing wallet modal...');
  const walletModal = document.getElementById('wallet-modal');
  if (walletModal) {
    walletModal.classList.remove('hidden');
    console.log('Wallet modal shown');
  } else {
    console.error('Wallet modal element not found');
  }
}

function hideWalletModal() {
  console.log('Hiding wallet modal...');
  const walletModal = document.getElementById('wallet-modal');
  if (walletModal) {
    walletModal.classList.add('hidden');
  }
}

function handleModalClick(e) {
  if (e.target.classList.contains('modal-overlay')) {
    hideWalletModal();
  }
}

function handleWalletConnection(e) {
  const walletType = e.currentTarget.dataset.wallet;
  console.log('Connecting to wallet:', walletType);
  
  // Show connecting state
  e.currentTarget.textContent = 'Connecting...';
  e.currentTarget.style.opacity = '0.7';
  
  // Simulate wallet connection
  setTimeout(() => {
    console.log('Wallet connected, navigating to dashboard');
    hideWalletModal();
    showScreen('dashboard');
  }, 1000);
}

// Dashboard functionality
function loadProjects() {
  console.log('Loading projects...');
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) {
    console.error('Projects grid not found');
    return;
  }
  
  projectsGrid.innerHTML = '';
  
  appData.projects.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.onclick = () => selectProject(project);
  
  const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
  
  card.innerHTML = `
    <div class="project-card-header">
      <h3 class="project-card-title">${project.name}</h3>
      <span class="status-badge ${statusClass}">${project.status}</span>
    </div>
    <p class="project-card-location">📍 ${project.location}</p>
    <div class="project-card-meta">
      <span>Evidence submitted: ${project.lastSubmission}</span>
    </div>
  `;
  
  return card;
}

function selectProject(project) {
  console.log('Selected project:', project.name);
  currentProject = project;
  showScreen('projectDetails');
}

// Project details
function loadProjectDetails() {
  if (!currentProject) {
    console.error('No current project selected');
    return;
  }
  
  console.log('Loading project details for:', currentProject.name);
  
  const elements = {
    'project-title': currentProject.name,
    'project-name': currentProject.name,
    'project-description': currentProject.description,
    'project-location': currentProject.location,
    'project-target-area': currentProject.targetArea
  };
  
  Object.keys(elements).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = elements[id];
    }
  });
  
  // Progress
  const progressText = document.getElementById('progress-text');
  if (progressText) {
    progressText.textContent = `${currentProject.current.toLocaleString()} / ${currentProject.target.toLocaleString()} ${currentProject.unit}`;
  }
  
  const progressPercentage = document.getElementById('progress-percentage');
  if (progressPercentage) {
    progressPercentage.textContent = `${currentProject.progress}% Complete`;
  }
  
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    progressFill.style.width = `${currentProject.progress}%`;
  }
  
  loadEvidenceHistory();
}

function loadEvidenceHistory() {
  const evidenceList = document.getElementById('evidence-list');
  if (!evidenceList) return;
  
  evidenceList.innerHTML = '';
  
  appData.evidenceHistory.forEach(evidence => {
    const evidenceItem = createEvidenceItem(evidence);
    evidenceList.appendChild(evidenceItem);
  });
}

function createEvidenceItem(evidence) {
  const item = document.createElement('div');
  item.className = 'evidence-item';
  
  const statusClass = evidence.status.toLowerCase().replace(/\s+/g, '-');
  
  item.innerHTML = `
    <div class="evidence-thumbnail">
      <img src="${evidence.thumbnail}" alt="Evidence thumbnail">
    </div>
    <div class="evidence-info">
      <div class="evidence-date">${evidence.date}</div>
      <span class="status-badge ${statusClass}">${evidence.status}</span>
    </div>
  `;
  
  return item;
}

// Evidence submission
function resetEvidenceForm() {
  capturedPhotos = [];
  capturedVideo = null;
  
  const photoPreview = document.getElementById('photo-preview');
  if (photoPreview) photoPreview.classList.add('hidden');
  
  const takePhotoBtn = document.getElementById('take-photo-btn');
  if (takePhotoBtn) takePhotoBtn.style.display = 'flex';
  
  const multiplePhotos = document.getElementById('multiple-photos');
  if (multiplePhotos) multiplePhotos.innerHTML = '';
  
  const evidenceNotes = document.getElementById('evidence-notes');
  if (evidenceNotes) evidenceNotes.value = '';
  
  // Reset checklist
  document.querySelectorAll('#checklist-content input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('#checklist-content .form-control').forEach(input => input.value = '');
  
  // Reset video button
  const videoBtn = document.getElementById('add-video-btn');
  if (videoBtn) {
    videoBtn.textContent = '🎥 Record Video (15s max)';
    videoBtn.style.background = '';
    videoBtn.style.color = '';
  }
  
  updateTimestamp();
  updateGPSCoordinates();
}

function takePhoto() {
  console.log('Taking photo...');
  // Simulate photo capture
  const photoData = generateMockPhoto();
  capturedPhotos.push(photoData);
  
  if (capturedPhotos.length === 1) {
    // Show first photo as preview
    const takePhotoBtn = document.getElementById('take-photo-btn');
    if (takePhotoBtn) takePhotoBtn.style.display = 'none';
    
    const photoPreview = document.getElementById('photo-preview');
    if (photoPreview) photoPreview.classList.remove('hidden');
    
    const previewImage = document.getElementById('preview-image');
    if (previewImage) previewImage.src = photoData.url;
  }
  
  updateMultiplePhotos();
}

function retakePhoto() {
  capturedPhotos = [];
  
  const photoPreview = document.getElementById('photo-preview');
  if (photoPreview) photoPreview.classList.add('hidden');
  
  const takePhotoBtn = document.getElementById('take-photo-btn');
  if (takePhotoBtn) takePhotoBtn.style.display = 'flex';
  
  const multiplePhotos = document.getElementById('multiple-photos');
  if (multiplePhotos) multiplePhotos.innerHTML = '';
}

function recordVideo() {
  console.log('Recording video...');
  // Simulate video recording
  capturedVideo = {
    id: Date.now(),
    url: 'data:video/mp4;base64,mock-video-data',
    duration: 12,
    timestamp: new Date().toISOString()
  };
  
  // Show video recorded feedback
  const videoBtn = document.getElementById('add-video-btn');
  if (videoBtn) {
    videoBtn.textContent = '✅ Video Recorded (12s)';
    videoBtn.style.background = 'var(--color-success)';
    videoBtn.style.color = 'white';
  }
}

function generateMockPhoto() {
  const colors = ['4CAF50', '2196F3', 'FF9800', 'F44336', '9C27B0'];
  const emojis = ['🌱', '🌿', '🌳', '🍃', '🌾'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  return {
    id: Date.now() + Math.random(),
    url: `https://via.placeholder.com/300x300/${randomColor}/white?text=${randomEmoji}`,
    timestamp: new Date().toISOString()
  };
}

function updateMultiplePhotos() {
  const container = document.getElementById('multiple-photos');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (capturedPhotos.length > 1) {
    capturedPhotos.slice(1).forEach((photo, index) => {
      const photoItem = document.createElement('div');
      photoItem.className = 'photo-item';
      photoItem.innerHTML = `
        <img src="${photo.url}" alt="Photo ${index + 2}">
        <button class="photo-delete" onclick="deletePhoto(${index + 1})">×</button>
      `;
      container.appendChild(photoItem);
    });
  }
}

function deletePhoto(index) {
  capturedPhotos.splice(index, 1);
  if (capturedPhotos.length === 0) {
    retakePhoto();
  } else {
    if (index === 0) {
      // Update preview if first photo was deleted
      const previewImage = document.getElementById('preview-image');
      if (previewImage) previewImage.src = capturedPhotos[0].url;
    }
    updateMultiplePhotos();
  }
}

function submitEvidence() {
  if (capturedPhotos.length === 0) {
    alert('Please take at least one photo before submitting.');
    return;
  }
  
  console.log('Submitting evidence...');
  
  // Show loading modal
  const loadingModal = document.getElementById('loading-modal');
  if (loadingModal) loadingModal.classList.remove('hidden');
  
  // Simulate submission
  setTimeout(() => {
    // Add new evidence to history
    const newEvidence = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      status: 'Pending Review',
      thumbnail: capturedPhotos[0].url
    };
    
    appData.evidenceHistory.unshift(newEvidence);
    
    // Hide loading modal
    const loadingModal = document.getElementById('loading-modal');
    if (loadingModal) loadingModal.classList.add('hidden');
    
    // Navigate back to project details
    showScreen('projectDetails');
    
    // Show success notification
    showSuccessToast('Evidence submitted successfully!');
    
    // Store offline if needed
    if (isOffline) {
      storeOfflineSubmission(newEvidence);
    }
  }, 2000);
}

function handleLoadingModalClick(e) {
  // Prevent closing loading modal by clicking
  e.stopPropagation();
}

// Notifications
function loadNotifications() {
  const notificationsList = document.getElementById('notifications-list');
  if (!notificationsList) return;
  
  notificationsList.innerHTML = '';
  
  appData.notifications.forEach(notification => {
    const notificationItem = createNotificationItem(notification);
    notificationsList.appendChild(notificationItem);
  });
  
  updateNotificationBadge();
}

function createNotificationItem(notification) {
  const item = document.createElement('div');
  item.className = `notification-item ${notification.type}`;
  
  item.innerHTML = `
    <div class="notification-message">${notification.message}</div>
    <div class="notification-time">${notification.time}</div>
  `;
  
  return item;
}

function toggleNotifications() {
  const panel = document.getElementById('notifications-panel');
  if (panel) {
    panel.classList.toggle('hidden');
  }
}

function hideNotifications() {
  const panel = document.getElementById('notifications-panel');
  if (panel) {
    panel.classList.add('hidden');
  }
}

function updateNotificationBadge() {
  const badge = document.getElementById('notification-badge');
  if (badge) {
    badge.textContent = appData.notifications.length;
    badge.style.display = appData.notifications.length > 0 ? 'flex' : 'none';
  }
}

// Checklist functionality
function toggleChecklist() {
  const content = document.getElementById('checklist-content');
  const toggle = document.getElementById('checklist-toggle');
  
  if (content) content.classList.toggle('hidden');
  if (toggle) toggle.classList.toggle('expanded');
}

// Utility functions
function updateTimestamp() {
  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });
  
  const timestampElement = document.getElementById('timestamp');
  if (timestampElement) {
    timestampElement.textContent = timestamp;
  }
}

function updateGPSCoordinates() {
  // Simulate GPS coordinates for different locations in India
  const locations = [
    { lat: 21.9162, lng: 87.0569, name: "Sundarbans" },
    { lat: 19.7515, lng: 75.7139, name: "Odisha Coast" },
    { lat: 11.0168, lng: 76.9558, name: "Tamil Nadu Coast" }
  ];
  
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const coords = `${randomLocation.lat.toFixed(4)}° N, ${randomLocation.lng.toFixed(4)}° E`;
  
  const gpsElement = document.getElementById('gps-coords');
  if (gpsElement) {
    gpsElement.textContent = coords;
  }
}

function simulateNetworkStatus() {
  // Randomly simulate offline mode
  setInterval(() => {
    const shouldBeOffline = Math.random() < 0.1; // 10% chance of going offline
    updateConnectionStatus(shouldBeOffline);
  }, 30000); // Check every 30 seconds
}

function updateConnectionStatus(offline = false) {
  isOffline = offline;
  const statusIndicator = document.querySelector('.status-indicator');
  const statusText = document.querySelector('.status-text');
  
  if (statusIndicator && statusText) {
    if (offline) {
      statusIndicator.className = 'status-indicator offline';
      statusText.textContent = 'Offline';
    } else {
      statusIndicator.className = 'status-indicator online';
      statusText.textContent = 'Online';
    }
  }
}

function storeOfflineSubmission(evidence) {
  // Simulate storing offline submission
  console.log('Storing offline submission:', evidence);
  showSuccessToast('Evidence stored offline. Will sync when online.');
}

function showSuccessToast(message) {
  // Create and show a simple toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-success);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 14px;
    max-width: 300px;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Handle browser back button
window.addEventListener('popstate', function(e) {
  // Simple back navigation
  if (!screens.login || !screens.login.classList.contains('hidden')) {
    return; // Already on login
  } else if (!screens.dashboard || !screens.dashboard.classList.contains('hidden')) {
    return; // Already on dashboard  
  } else if (!screens.projectDetails || !screens.projectDetails.classList.contains('hidden')) {
    showScreen('dashboard');
  } else if (!screens.evidenceSubmission || !screens.evidenceSubmission.classList.contains('hidden')) {
    showScreen('projectDetails');
  }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
  if (!touchStartX || !touchStartY) {
    return;
  }
  
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  
  const deltaX = touchStartX - touchEndX;
  const deltaY = touchStartY - touchEndY;
  
  // Detect swipe gestures
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      // Swipe left - could implement next/forward navigation
    } else {
      // Swipe right - could implement back navigation
      handleSwipeBack();
    }
  }
  
  touchStartX = 0;
  touchStartY = 0;
});

function handleSwipeBack() {
  if (screens.projectDetails && !screens.projectDetails.classList.contains('hidden')) {
    showScreen('dashboard');
  } else if (screens.evidenceSubmission && !screens.evidenceSubmission.classList.contains('hidden')) {
    showScreen('projectDetails');
  }
}

// Export functions for global access (for inline event handlers)
window.deletePhoto = deletePhoto;
