// js/project-details.js
document.addEventListener('DOMContentLoaded', () => {
    const currentProject = getCurrentProject();

    if (!currentProject) {
        alert('No project selected. Redirecting to dashboard.');
        window.location.href = 'dashboard.html';
        return;
    }

    loadProjectDetails(currentProject);
    loadEvidenceHistory();

    document.getElementById('submit-evidence-fab').addEventListener('click', () => {
        // The current project ID is already set in localStorage
        window.location.href = 'submit-evidence.html';
    });
});

function loadProjectDetails(project) {
    document.getElementById('project-title').textContent = project.name;
    document.getElementById('project-name').textContent = project.name;
    document.getElementById('project-description').textContent = project.description;
    document.getElementById('project-location').textContent = project.location;
    document.getElementById('project-target-area').textContent = project.targetArea;
    document.getElementById('progress-text').textContent = `${project.current.toLocaleString()} / ${project.target.toLocaleString()} ${project.unit}`;
    document.getElementById('progress-percentage').textContent = `${project.progress}% Complete`;
    document.getElementById('progress-fill').style.width = `${project.progress}%`;
}

function loadEvidenceHistory() {
    const appData = getAppData();
    const evidenceList = document.getElementById('evidence-list');
    if (!evidenceList) return;
    
    evidenceList.innerHTML = '';
    appData.evidenceHistory.forEach(evidence => {
        const item = document.createElement('div');
        item.className = 'evidence-item';
        const statusClass = evidence.status.toLowerCase().replace(/\s+/g, '-');
        item.innerHTML = `
          <div class="evidence-thumbnail"><img src="${evidence.thumbnail}" alt="Evidence thumbnail"></div>
          <div class="evidence-info">
            <div class="evidence-date">${evidence.date}</div>
            <span class="status-badge ${statusClass}">${evidence.status}</span>
          </div>
        `;
        evidenceList.appendChild(item);
    });
}