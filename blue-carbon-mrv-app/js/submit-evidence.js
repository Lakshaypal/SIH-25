// js/submit-evidence.js
let capturedPhotos = []; // State for this page only

document.addEventListener('DOMContentLoaded', () => {
    const currentProject = getCurrentProject();
    if (!currentProject) {
        alert('No project selected. Redirecting to dashboard.');
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Set up event listeners for this page
    document.getElementById('take-photo-btn').addEventListener('click', takePhoto);
    document.getElementById('retake-btn').addEventListener('click', retakePhoto);
    document.getElementById('submit-evidence-btn').addEventListener('click', submitEvidence);
    document.getElementById('back-to-project').addEventListener('click', () => {
        history.back(); // Simple back navigation
    });
});

function takePhoto() {
    // Simulate photo capture
    const photoData = {
        id: Date.now(),
        url: `https://via.placeholder.com/300x300/4CAF50/white?text=🌱`
    };
    capturedPhotos.push(photoData);

    document.getElementById('take-photo-btn').style.display = 'none';
    const preview = document.getElementById('photo-preview');
    preview.classList.remove('hidden');
    document.getElementById('preview-image').src = photoData.url;
}

function retakePhoto() {
    capturedPhotos = [];
    document.getElementById('photo-preview').classList.add('hidden');
    document.getElementById('take-photo-btn').style.display = 'flex';
}

function submitEvidence() {
    if (capturedPhotos.length === 0) {
        alert('Please take at least one photo.');
        return;
    }

    const loadingModal = document.getElementById('loading-modal');
    loadingModal.classList.remove('hidden');

    // Simulate submission
    setTimeout(() => {
        const appData = getAppData();
        const newEvidence = {
            id: Date.now(),
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'Pending Review',
            thumbnail: capturedPhotos[0].url
        };
        
        // Add new evidence to the start of the array
        appData.evidenceHistory.unshift(newEvidence);
        saveAppData(appData); // Save updated data to localStorage

        loadingModal.classList.add('hidden');
        showSuccessToast('Evidence submitted successfully!');
        
        // Redirect back to project details after a delay
        setTimeout(() => {
            window.location.href = 'project-details.html';
        }, 1500);
    }, 2000);
}