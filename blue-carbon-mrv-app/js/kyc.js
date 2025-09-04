// js/kyc.js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-kyc-btn').addEventListener('click', () => {
        console.log('KYC documents submitted.');
        // Here you would handle file uploads.
        showSuccessToast('Documents submitted for verification!');
        
        // Redirect to the dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
});