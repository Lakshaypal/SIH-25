// Application State
const appState = {
    isLoggedIn: false,
    currentPage: 'auth',
    currentUser: null,
    uploadedFiles: {}
};

// Sample user data
const sampleUser = {
    name: "John Doe",
    email: "john.doe@email.com", 
    phone: "+1 (555) 123-4567",
    address: "123 Green Street, Eco City, EC 12345",
    organization: "EcoTech Solutions",
    memberSince: "September 2025",
    kycStatus: "Pending",
    activeProjects: 0,
    carbonCredits: 0,
    verifiedReports: 0,
    projects: []
};

// DOM Elements
const elements = {
    authPage: document.getElementById('auth-page'),
    dashboardPage: document.getElementById('dashboard-page'),
    projectsPage: document.getElementById('projects-page'),
    createPage: document.getElementById('create-page'),
    profilePage: document.getElementById('profile-page'),
    appHeader: document.getElementById('app-header'),
    bottomNav: document.getElementById('bottom-nav'),
    loginForm: document.getElementById('login-form'),
    signupForm: document.getElementById('signup-form'),
    createProjectForm: document.getElementById('create-project-form')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Ensure only auth page is visible by default
    console.log('Initializing app - showing auth page only');
    showPage('auth');
}

// CRITICAL: Single Page Navigation Function - FIXED
function showPage(pageId) {
    console.log('Switching to page:', pageId);
    
    // Get all page elements
    const allPages = [
        elements.authPage,
        elements.dashboardPage,
        elements.projectsPage,
        elements.createPage,
        elements.profilePage
    ];
    
    // Hide ALL pages first
    allPages.forEach(page => {
        if (page) {
            page.classList.remove('active');
            page.style.display = 'none'; // Force hide
            console.log(`Hiding page: ${page.id}`);
        }
    });
    
    // Show target page
    const targetPageElement = document.getElementById(`${pageId}-page`);
    if (targetPageElement) {
        targetPageElement.style.display = 'flex'; // Force show
        targetPageElement.classList.add('active');
        targetPageElement.classList.add('fade-in');
        console.log(`Showing page: ${pageId}-page`);
    }
    
    // Handle header and bottom nav visibility based on page
    if (pageId === 'auth') {
        elements.appHeader.classList.add('hidden');
        elements.bottomNav.classList.add('hidden');
        console.log('Auth page - hiding header and nav');
    } else {
        elements.appHeader.classList.remove('hidden');
        elements.bottomNav.classList.remove('hidden');
        console.log('App page - showing header and nav');
    }
    
    // Update navigation states
    updateNavigation(pageId);
    appState.currentPage = pageId;
    
    // Debug log
    setTimeout(() => {
        console.log(`Page switch complete - current page: ${pageId}`);
        debugPageVisibility();
    }, 100);
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Header logo click navigation
    const headerLogo = document.getElementById('header-logo');
    if (headerLogo) {
        headerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            if (appState.isLoggedIn) {
                showPage('dashboard');
            }
        });
    }
    
    // Auth tab switching
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Tab clicked:', tab.dataset.tab);
            switchAuthTab(tab.dataset.tab);
        });
    });

    // Auth switch links
    const authSwitchLinks = document.querySelectorAll('[data-switch]');
    authSwitchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Switch link clicked:', link.dataset.switch);
            switchAuthTab(link.dataset.switch);
        });
    });

    // Form submissions
    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', function(e) {
            console.log('Login form submitted');
            handleLogin(e);
        });
    }
    
    if (elements.signupForm) {
        elements.signupForm.addEventListener('submit', function(e) {
            console.log('Signup form submitted');
            handleSignup(e);
        });
    }
    
    if (elements.createProjectForm) {
        elements.createProjectForm.addEventListener('submit', function(e) {
            console.log('Create project form submitted');
            handleCreateProject(e);
        });
    }

    // Bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = item.dataset.page;
            console.log('Nav item clicked:', page);
            if (page && appState.isLoggedIn) {
                showPage(page);
            }
        });
    });

    // Quick action buttons and navigation buttons
    const actionButtons = document.querySelectorAll('[data-navigate]');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const page = button.dataset.navigate;
            console.log('Action button clicked:', page);
            if (page && appState.isLoggedIn) {
                showPage(page);
            }
        });
    });

    // File upload zones
    const uploadZones = document.querySelectorAll('.upload-zone');
    uploadZones.forEach(zone => {
        zone.addEventListener('click', function(e) {
            console.log('Upload zone clicked:', zone.dataset.doc);
            handleFileUpload(e);
        });
    });

    // Edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleEditProfile();
        });
    }
}

// Authentication Functions
function switchAuthTab(tab) {
    console.log('Switching to tab:', tab);
    
    const tabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    const targetTab = document.querySelector(`[data-tab="${tab}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Hide both forms first
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    
    // Show the correct form
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        console.log('Showing login form');
    } else if (tab === 'signup') {
        signupForm.classList.remove('hidden');
        console.log('Showing signup form');
    }
}

function handleLogin(e) {
    e.preventDefault();
    console.log('Processing login...');
    
    const emailInput = e.target.querySelector('input[type="email"]');
    const passwordInput = e.target.querySelector('input[type="password"]');
    
    const email = emailInput ? emailInput.value : '';
    const password = passwordInput ? passwordInput.value : '';
    
    console.log('Login attempt with email:', email);
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login
    const submitBtn = e.target.querySelector('.auth-submit-btn');
    showLoadingState(submitBtn);
    
    setTimeout(() => {
        appState.currentUser = sampleUser;
        login();
        hideLoadingState(submitBtn, 'Sign In');
        showNotification('Welcome back!', 'success');
    }, 1000);
}

function handleSignup(e) {
    e.preventDefault();
    console.log('Processing signup...');
    
    const inputs = e.target.querySelectorAll('input');
    console.log('Found inputs:', inputs.length);
    
    const userData = {};
    
    // Extract form data by index since we know the order
    if (inputs.length >= 6) {
        userData.name = inputs[0].value.trim();
        userData.email = inputs[1].value.trim();
        userData.phone = inputs[2].value.trim();
        userData.address = inputs[3].value.trim();
        userData.organization = inputs[4].value.trim();
        userData.password = inputs[5].value.trim();
    }
    
    console.log('Signup data:', userData);
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.phone || !userData.address || !userData.organization || !userData.password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email
    if (!isValidEmail(userData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate signup
    const submitBtn = e.target.querySelector('.auth-submit-btn');
    showLoadingState(submitBtn);
    
    setTimeout(() => {
        const newUser = {
            ...userData,
            memberSince: "September 2025",
            kycStatus: "Pending",
            activeProjects: 0,
            carbonCredits: 0,
            verifiedReports: 0,
            projects: []
        };
        
        appState.currentUser = newUser;
        login();
        hideLoadingState(submitBtn, 'Sign Up');
        showNotification('Account created successfully!', 'success');
    }, 1000);
}

function login() {
    console.log('User logged in, switching to dashboard:', appState.currentUser);
    appState.isLoggedIn = true;
    populateUserData();
    
    // Critical: Force page switch with delay to ensure auth forms are processed
    setTimeout(() => {
        console.log('Executing page switch to dashboard...');
        showPage('dashboard');
    }, 100);
}

function logout() {
    appState.isLoggedIn = false;
    appState.currentUser = null;
    showPage('auth');
    showNotification('Logged out successfully', 'info');
}

function updateNavigation(activePage) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.dataset.page === activePage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// User Data Management
function populateUserData() {
    if (!appState.currentUser) return;
    
    const user = appState.currentUser;
    console.log('Populating user data:', user);
    
    // Update user name in dashboard
    const userNameEl = document.getElementById('user-name');
    if (userNameEl) {
        userNameEl.textContent = user.name.split(' ')[0]; // First name only
    }
    
    // Update profile page
    const profileElements = {
        'profile-name': user.name,
        'profile-email': user.email,
        'profile-phone': user.phone,
        'profile-address': user.address,
        'profile-organization': user.organization,
        'profile-member-since': user.memberSince
    };
    
    Object.entries(profileElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Project Creation
function handleCreateProject(e) {
    e.preventDefault();
    console.log('Creating project...');
    
    const inputs = e.target.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--color-error)';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    showLoadingState(submitBtn);
    
    setTimeout(() => {
        hideLoadingState(submitBtn, 'Submit Project');
        showNotification('Project submitted successfully for review!', 'success');
        
        // Reset form
        e.target.reset();
        appState.uploadedFiles = {};
        updateUploadZones();
        
        // Navigate to projects page
        setTimeout(() => {
            showPage('projects');
        }, 1000);
    }, 2000);
}

// File Upload Simulation
function handleFileUpload(e) {
    const zone = e.currentTarget;
    const docType = zone.dataset.doc;
    
    console.log('Uploading file for:', docType);
    
    // Simulate file selection
    const originalContent = zone.innerHTML;
    zone.innerHTML = '<div class="upload-icon">⏳</div><p class="upload-text">Uploading...</p><span class="upload-status">Please wait</span>';
    
    setTimeout(() => {
        appState.uploadedFiles[docType] = {
            name: `${docType}_document.pdf`,
            size: '2.4 MB',
            uploadedAt: new Date().toISOString()
        };
        
        zone.classList.add('uploaded');
        zone.innerHTML = '<div class="upload-icon">✓</div><p class="upload-text">' + zone.querySelector('.upload-text').textContent + '</p><span class="upload-status">Uploaded</span>';
        
        showNotification(`Document uploaded successfully`, 'success');
    }, 1000);
}

function updateUploadZones() {
    const uploadZones = document.querySelectorAll('.upload-zone');
    uploadZones.forEach(zone => {
        const docType = zone.dataset.doc;
        if (!appState.uploadedFiles[docType]) {
            zone.classList.remove('uploaded');
            const uploadText = zone.querySelector('.upload-text').textContent;
            zone.innerHTML = `<div class="upload-icon">📄</div><p class="upload-text">${uploadText}</p><span class="upload-status">Click to upload</span>`;
        }
    });
}

// Profile Management
function handleEditProfile() {
    showNotification('Edit profile feature coming soon!', 'info');
}

// UI Helper Functions
function showLoadingState(element) {
    if (!element) return;
    const originalText = element.textContent;
    element.dataset.originalText = originalText;
    element.textContent = 'Loading...';
    element.disabled = true;
    element.style.opacity = '0.7';
}

function hideLoadingState(element, text = null) {
    if (!element) return;
    const originalText = text || element.dataset.originalText || 'Submit';
    element.textContent = originalText;
    element.disabled = false;
    element.style.opacity = '1';
}

function showNotification(message, type = 'info') {
    console.log('Notification:', message, type);
    
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification status status--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: 500;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Enhanced form validation
function validateInput(input) {
    const value = input.value.trim();
    
    if (!value) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && !isValidEmail(value)) {
        showInputError(input, 'Please enter a valid email address');
        return false;
    }
    
    if (input.type === 'tel' && !isValidPhone(value)) {
        showInputError(input, 'Please enter a valid phone number');
        return false;
    }
    
    clearInputError(input);
    return true;
}

function showInputError(input, message) {
    clearInputError(input);
    input.style.borderColor = 'var(--color-error)';
    
    const errorEl = document.createElement('div');
    errorEl.className = 'input-error';
    errorEl.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    `;
    errorEl.textContent = message;
    
    input.parentNode.appendChild(errorEl);
}

function clearInputError(input) {
    input.style.borderColor = '';
    const errorEl = input.parentNode.querySelector('.input-error');
    if (errorEl) {
        errorEl.remove();
    }
}

// Demo functionality for testing
function runDemo() {
    console.log('Running demo...');
    
    // Switch to signup tab first
    switchAuthTab('signup');
    
    setTimeout(() => {
        // Auto-fill signup form for demo
        const signupInputs = document.querySelectorAll('#signup-form input');
        if (signupInputs.length >= 6) {
            signupInputs[0].value = 'John Doe';
            signupInputs[1].value = 'john.doe@email.com';
            signupInputs[2].value = '+1 (555) 123-4567';
            signupInputs[3].value = '123 Green Street, Eco City, EC 12345';
            signupInputs[4].value = 'EcoTech Solutions';
            signupInputs[5].value = 'password123';
        }
        showNotification('Demo form pre-filled. Click Sign Up to continue!', 'info');
    }, 500);
}

// Debug function to check page visibility
function debugPageVisibility() {
    const pages = document.querySelectorAll('.page');
    console.log('=== Page Visibility Debug ===');
    pages.forEach(page => {
        const isActive = page.classList.contains('active');
        const computedStyle = window.getComputedStyle(page);
        const inlineDisplay = page.style.display;
        console.log(`${page.id}: active=${isActive}, computed_display=${computedStyle.display}, inline_display=${inlineDisplay}`);
    });
    console.log('Current logged in state:', appState.isLoggedIn);
    console.log('Current page:', appState.currentPage);
    console.log('=============================');
}

// Add demo button for testing
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!appState.isLoggedIn) {
            const demoBtn = document.createElement('button');
            demoBtn.textContent = 'Fill Demo Data';
            demoBtn.className = 'btn btn--outline btn--sm';
            demoBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 1000;
                font-size: 12px;
                padding: 8px 12px;
            `;
            demoBtn.addEventListener('click', runDemo);
            document.body.appendChild(demoBtn);
        }
    }, 1000);
});

// Add debug button for development
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const debugBtn = document.createElement('button');
        debugBtn.textContent = 'Debug Pages';
        debugBtn.className = 'btn btn--outline btn--sm';
        debugBtn.style.cssText = `
            position: fixed;
            bottom: 70px;
            left: 20px;
            z-index: 1000;
            font-size: 12px;
            padding: 8px 12px;
        `;
        debugBtn.addEventListener('click', debugPageVisibility);
        document.body.appendChild(debugBtn);
    }, 1000);
});