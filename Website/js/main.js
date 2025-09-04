document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    handleRouting();
});

// --- NAVIGATION ---
function renderNavigation() {
    const navPlaceholder = document.getElementById('navigation-placeholder');
    if (!navPlaceholder) return;
    
    const navHTML = `
        <nav class="nav container mx-auto justify-between">
            <a href="/" class="flex items-center space-x-2 font-semibold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M11 20A7 7 0 0 1 4 13H2a9 9 0 0 0 18 0h-2a7 7 0 0 1-7 7Z"/><path d="M12 16a3 3 0 0 0 3-3V4H9v9a3 3 0 0 0 3 3Z"/></svg>
                <span>VeriCarbon</span>
            </a>
            <div class="flex items-center space-x-4 text-sm text-muted-foreground font-medium">
                <a href="/upload.html">Submit Project</a>
                <a href="/verify.html">Verify Credits</a>
                <a href="/admin.html">Admin</a>
            </div>
        </nav>
    `;
    navPlaceholder.innerHTML = navHTML;
}

// --- ROUTING & PAGE LOGIC ---
function handleRouting() {
    const path = window.location.pathname;

    if (path === '/' || path.endsWith('index.html')) {
        initIndexPage();
    } else if (path.endsWith('admin.html')) {
        initAdminPage();
    } else if (path.endsWith('upload.html')) {
        initUploadPage();
    } else if (path.endsWith('verify.html')) {
        initVerifyPage();
    }
}

// --- PAGE INITIALIZERS ---
function initIndexPage() {
    const projects = getProjects();
    const stats = {
        total: projects.length,
        verified: projects.filter(p => p.status === "verified").length,
        totalCredits: projects.reduce((sum, p) => sum + (p.carbonCredits || 0), 0)
    };

    // Render Stats
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="card text-center"><div class="card-content p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary mx-auto mb-4"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <h3 class="text-3xl font-bold text-foreground mb-2">${stats.total}</h3><p class="text-muted-foreground">Total Projects</p>
            </div></div>
            <div class="card text-center"><div class="card-content p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-status-verified mx-auto mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <h3 class="text-3xl font-bold text-foreground mb-2">${stats.verified}</h3><p class="text-muted-foreground">Verified on Blockchain</p>
            </div></div>
            <div class="card text-center"><div class="card-content p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-earth mx-auto mb-4"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                <h3 class="text-3xl font-bold text-foreground mb-2">${stats.totalCredits.toLocaleString()}</h3><p class="text-muted-foreground">Carbon Credits Issued</p>
            </div></div>
        `;
    }

    // Render Recent Projects
    const recentProjectsSection = document.getElementById('recent-projects-section');
    const recentProjectsContainer = document.getElementById('recent-projects-container');
    if (projects.length > 0 && recentProjectsSection && recentProjectsContainer) {
        recentProjectsSection.classList.remove('hidden');
        const recent = projects.slice(0, 3);
        recentProjectsContainer.innerHTML = recent.map(project => `
            <div class="card shadow-lg hover:shadow-xl transition-shadow">
                <div class="card-header pb-4">
                    <div class="flex items-start justify-between">
                        <h4 class="text-lg font-semibold line-clamp-2">${project.projectName}</h4>
                        ${getStatusBadge(project.status)}
                    </div>
                    <p class="card-description">${project.location}</p>
                </div>
                <div class="card-content">
                    <div class="space-y-3">
                        <div class="text-sm space-y-1">
                            <div class="flex justify-between"><span class="text-muted-foreground">NGO:</span><span class="font-medium">${project.ngoName}</span></div>
                            <div class="flex justify-between"><span class="text-muted-foreground">Credits:</span><span class="font-medium">${project.carbonCredits.toLocaleString()}</span></div>
                        </div>
                        ${project.status === 'verified' ? `<a href="/verify.html?id=${project.id}" class="btn btn-outline btn-sm w-full">View Certificate</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function initAdminPage() {
    renderAdminProjects();
}

function renderAdminProjects() {
    const projects = getProjects();
    const listContainer = document.getElementById('projects-list-container');
    const statsContainer = document.getElementById('stats-container');
    if (!listContainer || !statsContainer) return;

    const stats = {
        pending: projects.filter(p => p.status === 'pending').length,
        approved: projects.filter(p => p.status === 'approved').length,
        verified: projects.filter(p => p.status === 'verified').length,
    };

    statsContainer.innerHTML = `
        <div class="card"><div class="card-content p-6"><div class="flex items-center space-x-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-status-pending"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg><div><p class="text-2xl font-bold">${stats.pending}</p><p class="text-sm text-muted-foreground">Pending Review</p></div></div></div></div>
        <div class="card"><div class="card-content p-6"><div class="flex items-center space-x-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-status-approved"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><div><p class="text-2xl font-bold">${stats.approved}</p><p class="text-sm text-muted-foreground">Approved</p></div></div></div></div>
        <div class="card"><div class="card-content p-6"><div class="flex items-center space-x-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-status-verified"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg><div><p class="text-2xl font-bold">${stats.verified}</p><p class="text-sm text-muted-foreground">Verified</p></div></div></div></div>
    `;

    if (projects.length === 0) {
        listContainer.innerHTML = `<div class="card text-center py-12"><div class="card-content"><h3 class="text-lg font-medium mb-2">No Projects Yet</h3><p class="text-muted-foreground">Projects will appear here for review.</p></div></div>`;
        return;
    }

    listContainer.innerHTML = projects.map(project => `
        <div class="card shadow-lg">
            <div class="card-header pb-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div>
                        <h3 class="card-title text-xl">${project.projectName}</h3>
                        <div class="card-description flex items-center space-x-4 mt-2">
                            <span class="flex items-center space-x-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>${project.location}</span></span>
                            <span class="flex items-center space-x-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg><span>${new Date(project.submittedAt).toLocaleDateString()}</span></span>
                        </div>
                    </div>
                    ${getStatusBadge(project.status)}
                </div>
            </div>
            <div class="card-content">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div><span class="font-medium">NGO:</span> ${project.ngoName}</div>
                        <div><span class="font-medium">Carbon Credits:</span> ${project.carbonCredits.toLocaleString()}</div>
                    </div>
                    ${project.description ? `<p class="text-muted-foreground text-sm">${project.description}</p>` : ''}
                    ${project.tokenId ? `
                        <div class="p-4 bg-status-verified/10 rounded-lg border border-status-verified/20">
                            <p class="text-sm font-medium text-status-verified mb-2">Blockchain Details:</p>
                            <div class="space-y-1 text-xs">
                                <p><span class="font-medium">Token ID:</span> #${project.tokenId}</p>
                                <p><span class="font-medium">Transaction:</span> ${project.transactionHash}</p>
                            </div>
                        </div>
                    ` : ''}
                    <div class="flex flex-col sm:flex-row gap-2">
                        ${getAdminActions(project)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners after rendering
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', handleAdminAction);
    });
}

function handleAdminAction(event) {
    const button = event.currentTarget;
    const { action, projectId } = button.dataset;

    if (action === 'approve') {
        updateProject(projectId, { status: 'approved', approvedAt: new Date().toISOString() });
        showToast({ title: "Project Approved", description: "Ready for blockchain verification." });
    } else if (action === 'mint') {
        const mockTxHash = "0x" + Math.random().toString(16).substr(2, 40);
        const mockTokenId = Math.floor(Math.random() * 1000).toString();
        updateProject(projectId, { status: 'verified', verifiedAt: new Date().toISOString(), tokenId: mockTokenId, transactionHash: mockTxHash });
        showToast({ title: "Carbon Credit Minted!", description: `Token #${mockTokenId} created.` });
    }
    renderAdminProjects();
}

function initUploadPage() {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file');
    const fileLabel = document.getElementById('file-label');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileLabel.textContent = fileInput.files[0].name;
        } else {
            fileLabel.textContent = "Click to upload project image";
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.carbonCredits = parseInt(data.carbonCredits);
        
        // Simulate file upload and getting a URL
        if (data.imageUrl && data.imageUrl.size > 0) {
            data.imageUrl = URL.createObjectURL(data.imageUrl);
        } else {
            delete data.imageUrl; 
        }
        
        // Simulate API call
        setTimeout(() => {
            addProject(data);
            showToast({ title: "Report Submitted", description: "Your project is now under review." });
            window.location.href = '/';
        }, 1000);
    });
}

function initVerifyPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const container = document.getElementById('verify-container');

    if (projectId) {
        const project = getProject(projectId);
        if (project && project.status === 'verified') {
            renderCertificate(project, container);
        } else {
            renderNotFound(container, "This verified project could not be found.");
        }
    } else {
        renderAllVerified(container);
    }
}

// --- RENDER HELPERS ---
function getStatusBadge(status) {
    return `<span class="badge status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
}

function getAdminActions(project) {
    if (project.status === 'pending') {
        return `<button class="btn btn-status-approved" data-action="approve" data-project-id="${project.id}">Approve Project</button>`;
    }
    if (project.status === 'approved') {
        return `<button class="btn btn-gradient" data-action="mint" data-project-id="${project.id}">Mint Carbon Credit</button>`;
    }
    if (project.status === 'verified') {
        return `<a href="/verify.html?id=${project.id}" class="btn btn-outline">View Public Certificate</a>`;
    }
    return '';
}

function renderCertificate(project, container) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <div class="mb-6">
              <a href="/verify.html" class="text-muted-foreground hover:text-foreground flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                <span>Back to all projects</span>
              </a>
            </div>
            <div class="card shadow-xl bg-gradient-to-br from-background to-forest-light/10 border-status-verified/20">
              <div class="card-header text-center pb-6">
                <div class="flex justify-center mb-4"><div class="p-4 bg-status-verified/10 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-status-verified"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg></div></div>
                <h2 class="card-title text-3xl mb-2">Carbon Credit Certificate</h2>
                <p class="card-description text-lg">Verified on Blockchain • Token #${project.tokenId}</p>
              </div>
              <div class="card-content space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Project Details</h3>
                            <div class="space-y-3">
                                <p class="font-medium text-foreground">${project.projectName}</p>
                                <p class="text-muted-foreground flex items-center space-x-1 mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>${project.location}</span></p>
                                ${project.description ? `<p class="text-sm text-muted-foreground">${project.description}</p>` : ''}
                                <div class="flex items-center space-x-4 text-sm">
                                    <div><span class="font-medium">NGO:</span> ${project.ngoName}</div>
                                    <div><span class="font-medium">Credits:</span> ${project.carbonCredits.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                        ${project.imageUrl ? `<div><h4 class="font-medium mb-2">Project Image</h4><img src="${project.imageUrl}" alt="${project.projectName}" class="w-full h-48 object-cover rounded-lg border"/></div>` : ''}
                    </div>
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Verification Timeline</h3>
                            <!-- Timeline items here -->
                        </div>
                        <div class="p-6 bg-status-verified/10 rounded-lg border border-status-verified/20">
                            <h4 class="font-semibold mb-3 text-status-verified flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span>Blockchain Proof</span></h4>
                            <div class="space-y-2 text-sm">
                                <div><span class="font-medium">Token ID:</span> #${project.tokenId}</div>
                                <div><span class="font-medium">Transaction Hash:</span><p class="font-mono text-xs break-all mt-1">${project.transactionHash}</p></div>
                                <a href="https://polygonscan.com/tx/${project.transactionHash}" target="_blank" class="btn btn-outline btn-sm mt-3">View on Polygonscan</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-t pt-6 text-center">
                    <span class="badge status-verified">Verified Carbon Credit Certificate</span>
                    <p class="text-xs text-muted-foreground mt-2">This certificate is cryptographically secured on the blockchain.</p>
                </div>
              </div>
            </div>
        </div>`;
}

function renderAllVerified(container) {
    const verifiedProjects = getProjects().filter(p => p.status === 'verified');
    let content = `
        <div class="text-center mb-8">
            <div class="flex justify-center mb-4"><div class="p-3 bg-status-verified/10 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-status-verified"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div></div>
            <h1 class="text-3xl font-bold text-foreground mb-2">Verified Carbon Credits</h1>
            <p class="text-muted-foreground">Browse blockchain-verified environmental projects</p>
        </div>
    `;
    if (verifiedProjects.length === 0) {
        content += `<div class="card text-center py-12"><div class="card-content"><h3 class="text-lg font-medium mb-2">No Verified Projects Yet</h3><p class="text-muted-foreground">Verified projects will appear here.</p></div></div>`;
    } else {
        content += `<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">` + verifiedProjects.map(project => `
            <div class="card shadow-lg hover:shadow-xl transition-shadow">
                <div class="card-header pb-4">
                    <div class="flex items-start justify-between">
                        <div>
                            <h4 class="card-title text-lg line-clamp-2">${project.projectName}</h4>
                            <p class="card-description flex items-center space-x-1 mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>${project.location}</span></p>
                        </div>
                        <span class="badge status-verified">#${project.tokenId}</span>
                    </div>
                </div>
                <div class="card-content">
                    <div class="space-y-4">
                        ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.projectName}" class="w-full h-32 object-cover rounded-md"/>` : ''}
                        <div class="text-sm space-y-2">
                            <div class="flex justify-between"><span class="text-muted-foreground">NGO:</span><span class="font-medium">${project.ngoName}</span></div>
                            <div class="flex justify-between"><span class="text-muted-foreground">Credits:</span><span class="font-medium">${project.carbonCredits.toLocaleString()}</span></div>
                            <div class="flex justify-between"><span class="text-muted-foreground">Verified:</span><span class="font-medium">${new Date(project.verifiedAt).toLocaleDateString()}</span></div>
                        </div>
                        <a href="/verify.html?id=${project.id}" class="btn btn-primary w-full">View Certificate</a>
                    </div>
                </div>
            </div>
        `).join('') + `</div>`;
    }
    container.innerHTML = content;
}

function renderNotFound(container, message) {
    container.innerHTML = `
        <div class="max-w-2xl mx-auto text-center">
            <h1 class="text-2xl font-bold mb-4">Project Not Found</h1>
            <p class="text-muted-foreground mb-8">${message}</p>
            <a href="/verify.html" class="btn btn-primary">Browse All Projects</a>
        </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Header Interactivity ---
    handleMobileMenu();
    handleActiveNav();

    // --- Page-Specific Initializers ---
    const pageId = document.body.id;
    if (pageId === 'page-admin') {
        initAdminInteractions();
    } else if (pageId === 'page-upload') {
        initUploadForm();
    }
});

function handleMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    if (!menuToggle) return;

    menuToggle.addEventListener('click', () => {
        const isMenuOpen = document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
    });
}

function handleActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '') {
        // Handle root path for index.html
        document.querySelectorAll('a[href="/index.html"], a[href="/"]').forEach(link => link.classList.add('active'));
        return;
    }

    const navLinks = document.querySelectorAll('.site-nav-desktop a, .mobile-menu a');
    navLinks.forEach(link => {
        if (link.href.endsWith(currentPage)) {
            link.classList.add('active');
        }
    });
}

function initAdminInteractions() {
    const container = document.getElementById('projects-list-container');
    container.addEventListener('click', (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const { action, projectId } = button.dataset;
        button.disabled = true;
        
        if (action === 'approve') {
            button.textContent = 'Approving...';
            setTimeout(() => {
                updateProject(projectId, { status: 'approved', approvedAt: new Date().toISOString() });
                showToast({ title: "Project Approved", description: "The project is now ready to be minted." });
               
                button.parentElement.innerHTML = `<button class="btn btn-gradient" data-action="mint" data-project-id="${projectId}">Mint Carbon Credit</button>`;
                button.closest('.card').querySelector('.badge').className = 'badge status-approved';
                button.closest('.card').querySelector('.badge').textContent = 'approved';
            }, 1000);
        } else if (action === 'mint') {
            button.textContent = 'Minting...';
            setTimeout(() => {
                const mockTxHash = "0x" + Math.random().toString(16).substr(2, 40);
                const mockTokenId = Math.floor(Math.random() * 1000).toString();
                updateProject(projectId, { status: 'verified', verifiedAt: new Date().toISOString(), tokenId: mockTokenId, transactionHash: mockTxHash });
                showToast({ title: "Carbon Credit Minted!", description: `Token #${mockTokenId} created.` });
                button.parentElement.innerHTML = `<a href="/verify-detail.html" class="btn btn-outline">View Public Certificate</a>`;
                button.closest('.card').querySelector('.badge').className = 'badge status-verified';
                button.closest('.card').querySelector('.badge').textContent = 'verified';
            }, 1500);
        }
    });
}

function initUploadForm() {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-upload');
    const fileLabel = document.getElementById('file-label');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileLabel.textContent = fileInput.files[0].name;
        } else {
            fileLabel.textContent = "Click to upload image";
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.carbonCredits = parseInt(data.carbonCredits);
        
        setTimeout(() => {
            addProject(data);
            showToast({ title: "Project Submitted Successfully", description: "Your project is under review." });
            setTimeout(() => window.location.href = '/', 1000);
        }, 1500);
    });
}

// --- TOAST NOTIFICATIONS ---
function showToast({ title, description, variant = 'default' }) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${variant}`;
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        ${description ? `<div class="toast-description">${description}</div>` : ''}
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000);
}