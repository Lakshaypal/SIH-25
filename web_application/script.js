document.addEventListener("DOMContentLoaded", function() {
    // Get the current page's path
    const currentPage = window.location.pathname.split("/").pop();

    // Get all navigation links
    const navLinks = document.querySelectorAll('.bottom-nav .nav-item');

    // Remove active class from all links first
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Find the link that matches the current page and add the active class
    const activeLink = document.querySelector(`.bottom-nav .nav-item[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        // Default to dashboard if no match is found (e.g., on index.html)
        const dashboardLink = document.querySelector('.bottom-nav .nav-item[href="dashboard.html"]');
        if(dashboardLink) dashboardLink.classList.add('active');
    }
});