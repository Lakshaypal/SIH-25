// js/signup.js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('register-btn').addEventListener('click', () => {
        // In a real app, you would save the form data.
        console.log('User registered. Proceeding to KYC.');
        window.location.href = 'kyc.html';
    });
});