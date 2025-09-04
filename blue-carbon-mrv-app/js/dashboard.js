// js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupNotifications();
});

function loadProjects() {
    const appData = getAppData();
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    appData.projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.projectId = project.id; // Store project ID

    card.addEventListener('click', () => {
        setCurrentProject(project.id);
        window.location.href = 'project-details.html';
    });
    
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

function setupNotifications() {
    const appData = getAppData();
    const notificationsList = document.getElementById('notifications-list');
    const badge = document.getElementById('notification-badge');

    // Populate list
    notificationsList.innerHTML = '';
    appData.notifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = `notification-item ${notification.type}`;
        item.innerHTML = `<div class="notification-message">${notification.message}</div><div class="notification-time">${notification.time}</div>`;
        notificationsList.appendChild(item);
    });

    // Update badge
    badge.textContent = appData.notifications.length;
    badge.style.display = appData.notifications.length > 0 ? 'flex' : 'none';

    // Toggle visibility
    document.getElementById('notification-btn').addEventListener('click', () => {
        document.getElementById('notifications-panel').classList.toggle('hidden');
    });
    document.querySelector('.close-notifications').addEventListener('click', () => {
        document.getElementById('notifications-panel').classList.add('hidden');
    });
}