// js/welcome.js
document.addEventListener('DOMContentLoaded', () => {
    // This script is simple, it just handles navigation.
    // The previous version had a connect wallet screen as the login,
    // we will maintain that logic.
    document.getElementById('go-to-login-btn').addEventListener('click', () => {
        // For this example, login will take you to the dashboard.
        // In a real app, this would involve a wallet connection.
        window.location.href = 'dashboard.html';
    });

    document.getElementById('go-to-signup-btn').addEventListener('click', () => {
        window.location.href = 'signup.html';
    });
});