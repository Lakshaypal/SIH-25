const PROJECTS_KEY = 'carbonProjects';

const initialProjects = [
    {
        id: 'proj_1',
        projectName: 'Reforestation in Borneo',
        location: 'Borneo, Indonesia',
        description: 'Planting native trees to restore rainforest habitat for orangutans and sequester carbon.',
        ngoName: 'Forest Savers Inc.',
        carbonCredits: 1500,
        status: 'verified',
        submittedAt: new Date('2023-10-15T09:00:00Z').toISOString(),
        approvedAt: new Date('2023-10-20T14:30:00Z').toISOString(),
        verifiedAt: new Date('2023-10-25T18:00:00Z').toISOString(),
        tokenId: '721',
        transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        imageUrl: 'https://images.unsplash.com/photo-1542882283-5358055531d0?q=80&w=1200'
    },
    {
        id: 'proj_2',
        projectName: 'Mangrove Restoration Project',
        location: 'Sundarbans, Bangladesh',
        description: 'Restoring mangrove forests to protect coastlines from erosion and create a carbon sink.',
        ngoName: 'Coastal Guardians',
        carbonCredits: 800,
        status: 'approved',
        submittedAt: new Date('2023-11-01T11:20:00Z').toISOString(),
        approvedAt: new Date('2023-11-05T10:00:00Z').toISOString(),
        verifiedAt: null,
        tokenId: null,
        transactionHash: null,
        imageUrl: 'https://images.unsplash.com/photo-1619366989429-8973581a0134?q=80&w=1200'
    },
    {
        id: 'proj_3',
        projectName: 'Solar Power for Rural Villages',
        location: 'Kenya',
        description: 'Providing clean energy solutions to communities, reducing reliance on fossil fuels.',
        ngoName: 'LightUp Africa',
        carbonCredits: 1200,
        status: 'pending',
        submittedAt: new Date('2023-11-10T16:45:00Z').toISOString(),
        approvedAt: null,
        verifiedAt: null,
        tokenId: null,
        transactionHash: null,
        imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9c?q=80&w=1200'
    }
];

function initializeData() {
    if (!localStorage.getItem(PROJECTS_KEY)) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
    }
}

function getProjects() {
    initializeData();
    const projects = JSON.parse(localStorage.getItem(PROJECTS_KEY));
    
    return projects.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

function getProject(id) {
    const projects = getProjects();
    return projects.find(p => p.id === id);
}

function addProject(projectData) {
    const projects = getProjects();
    const newProject = {
        id: `proj_${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        ...projectData,
    };
    projects.push(newProject);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return newProject;
}

function updateProject(projectId, updates) {
    let projects = getProjects();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
        projects[projectIndex] = { ...projects[projectIndex], ...updates };
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        return projects[projectIndex];
    }
    return null;
}
