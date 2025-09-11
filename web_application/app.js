document.addEventListener('DOMContentLoaded', function() {
    // This script is specifically for the create.html page.
    // We check for the form's existence to avoid errors on other pages.
    const createProjectForm = document.getElementById('createProjectForm');
    if (!createProjectForm) {
        return; // Exit if we're not on the create page
    }

    // --- STATE & ELEMENTS ---
    const appState = {
        uploadedFiles: {} // Simple state to track uploaded files
    };

    const elements = {
        uploadModal: document.getElementById('uploadModal'),
        modalCloseBtn: document.querySelector('.modal-close-btn'),
        modalTitle: document.getElementById('modalTitle'),
        fileInput: document.getElementById('fileInput'),
        fileNameDisplay: document.getElementById('fileName'),
        confirmUploadBtn: document.getElementById('confirmUploadBtn'),
        uploadItems: document.querySelectorAll('.upload-item'),
        elevationItems: document.querySelectorAll('.elevation-item') // Added for sea level buttons
    };

    let currentDocType = null; // To track which document is being uploaded

    // --- EVENT LISTENERS ---

    // 1. Form Submission Handler
    createProjectForm.addEventListener('submit', handleCreateProject);

    // 2. Open Modal for each Upload Button
    elements.uploadItems.forEach(item => {
        const uploadButton = item.querySelector('.btn-upload');
        if (uploadButton) {
            uploadButton.addEventListener('click', () => {
                currentDocType = item.dataset.doc;
                elements.modalTitle.textContent = `Upload ${currentDocType}`;
                elements.fileInput.value = ''; // Clear previous selection
                elements.fileNameDisplay.textContent = '';
                elements.uploadModal.style.display = 'flex';
            });
        }
    });
    
    // 3. [NEW] Sea Level Button Click Handler
    elements.elevationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'selected' from all items
            elements.elevationItems.forEach(i => i.classList.remove('selected'));
            // Add 'selected' to the one that was clicked
            item.classList.add('selected');
        });
    });


    // 4. Modal Closing Logic
    elements.modalCloseBtn.addEventListener('click', closeModal);
    elements.uploadModal.addEventListener('click', (e) => {
        if (e.target === elements.uploadModal) {
            closeModal();
        }
    });

    function closeModal() {
        elements.uploadModal.style.display = 'none';
    }

    // 5. File Input Change Handler
    elements.fileInput.addEventListener('change', () => {
        if (elements.fileInput.files.length > 0) {
            elements.fileNameDisplay.textContent = `Selected: ${elements.fileInput.files[0].name}`;
        } else {
            elements.fileNameDisplay.textContent = '';
        }
    });

    // 6. Confirm Upload Button Handler
    elements.confirmUploadBtn.addEventListener('click', handleConfirmUpload);


    // --- FUNCTIONS ---

    function handleConfirmUpload() {
        if (elements.fileInput.files.length > 0 && currentDocType) {
            appState.uploadedFiles[currentDocType] = { name: elements.fileInput.files[0].name };
            
            const targetItem = document.querySelector(`.upload-item[data-doc="${currentDocType}"]`);
            if (targetItem) {
                const icon = targetItem.querySelector('.upload-icon');
                const button = targetItem.querySelector('.btn-upload');
                
                targetItem.classList.add('uploaded');
                if (icon) icon.textContent = '✅';
                if (button) {
                    button.textContent = 'Uploaded';
                    button.classList.add('uploaded');
                    button.disabled = true;
                }
            }
            closeModal();
            showNotification(`${currentDocType} uploaded successfully!`, 'success');
            currentDocType = null;
        } else {
            showNotification('Please select a file first.', 'error');
        }
    }

    function handleCreateProject(e) {
        e.preventDefault();
        
        // --- Validation ---
        const inputs = createProjectForm.querySelectorAll('input[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
             if (input.type === 'radio') {
                const radioGroup = document.getElementsByName(input.name);
                if (![...radioGroup].some(r => r.checked)) isFormValid = false;
            } else if (!input.value.trim()) {
                isFormValid = false;
                input.style.borderColor = 'var(--color-error-600, #d92d20)';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isFormValid) {
            showNotification('Please fill in all required project details.', 'error');
            return;
        }

        const requiredDocsCount = elements.uploadItems.length;
        if (Object.keys(appState.uploadedFiles).length < requiredDocsCount) {
             showNotification('Please upload all required documents.', 'error');
             return;
        }
        
        // --- Submission ---
        const submitBtn = createProjectForm.querySelector('button[type="submit"]');
        showLoadingState(submitBtn);
        
        setTimeout(() => {
            submitBtn.textContent = 'Submitted Successfully!';
            submitBtn.style.backgroundColor = 'var(--color-success-600, #02994f)';
            submitBtn.disabled = true;
            showNotification('Project submitted successfully for review!', 'success');
            
            setTimeout(() => {
                window.location.href = 'projects.html';
            }, 2000);

        }, 1500);
    }

    // --- UI HELPER FUNCTIONS ---

    function showLoadingState(element) {
        if (!element) return;
        element.dataset.originalText = element.textContent;
        element.innerHTML = `<span class="spinner"></span> Loading...`;
        element.disabled = true;
        
        if (!document.querySelector('#spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.innerHTML = `
            .spinner {
                width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
                border-top-color: #fff; border-radius: 50%; display: inline-block;
                animation: spin 1s linear infinite; margin-right: 8px; vertical-align: middle;
            }
            @keyframes spin { to { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }
    }

    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed', top: '20px', right: '20px', padding: '15px 20px',
            backgroundColor: '#333', color: '#fff', borderRadius: '8px', 
            zIndex: '2000', transform: 'translateX(120%)', 
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        });
        
        const colors = {
            success: 'var(--color-success-600, #02994f)',
            error: 'var(--color-error-600, #d92d20)',
            info: 'var(--color-brand-blue-600, #0052ff)'
        };
        notification.style.backgroundColor = colors[type];

        document.body.appendChild(notification);
        
        setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
});