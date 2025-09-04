// js/data.js

// Initialize data in localStorage if it doesn't exist
function initializeData() {
    if (localStorage.getItem('appData')) {
        console.log('App data already exists.');
        return;
    }

    console.log('Initializing app data in localStorage...');
    const initialAppData = {
      "projects": [
        { "id": 1, "name": "Sunderbans Mangrove Restoration", "location": "West Bengal, India", "description": "Large-scale mangrove restoration project...", "targetArea": "5 Hectares", "status": "Needs Evidence", "lastSubmission": "2 days ago", "progress": 75, "target": 10000, "current": 7500, "unit": "Trees Planted" },
        { "id": 2, "name": "Coastal Restoration Initiative", "location": "Odisha, India", "description": "Coastal protection through mangrove plantation", "targetArea": "8 Hectares", "status": "Pending Review", "lastSubmission": "4 days ago", "progress": 45, "target": 15000, "current": 6750, "unit": "Trees Planted" },
        { "id": 3, "name": "Blue Carbon Sequestration", "location": "Tamil Nadu, India", "description": "Carbon sequestration project...", "targetArea": "12 Hectares", "status": "Verified", "lastSubmission": "1 week ago", "progress": 90, "target": 20000, "current": 18000, "unit": "Trees Planted" }
      ],
      "evidenceHistory": [
        { "id": 1, "date": "02 Sep 2025", "status": "Pending Review", "thumbnail": "https://via.placeholder.com/70x70/4CAF50/white?text=🌱" },
        { "id": 2, "date": "28 Aug 2025", "status": "Verified", "thumbnail": "https://via.placeholder.com/70x70/2196F3/white?text=🌿" },
        { "id": 3, "date": "25 Aug 2025", "status": "Verified", "thumbnail": "https://via.placeholder.com/70x70/FF9800/white?text=🌳" }
      ],
      "notifications": [
        { "id": 1, "type": "verified", "message": "Evidence for Sunderbans project has been verified", "time": "2 hours ago" },
        { "id": 2, "type": "new_project", "message": "New project assigned: Marine Conservation", "time": "1 day ago" },
        { "id": 3, "type": "rejected", "message": "Evidence rejected - photo quality insufficient", "time": "2 days ago" }
      ]
    };
    localStorage.setItem('appData', JSON.stringify(initialAppData));
}

// Helper functions to get and set data
function getAppData() {
    return JSON.parse(localStorage.getItem('appData'));
}

function saveAppData(data) {
    localStorage.setItem('appData', JSON.stringify(data));
}

function setCurrentProject(projectId) {
    localStorage.setItem('currentProjectId', projectId);
}

function getCurrentProject() {
    const projectId = localStorage.getItem('currentProjectId');
    if (!projectId) return null;

    const appData = getAppData();
    return appData.projects.find(p => p.id === parseInt(projectId));
}

// Utility function for toasts (can be used on any page)
function showSuccessToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `position: fixed; top: 20px; right: 20px; background: var(--color-success); color: white; padding: 12px 20px; border-radius: 8px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 14px;`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { document.body.removeChild(toast); }, 3000);
}


// Run initialization on script load
initializeData();