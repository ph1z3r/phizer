/*
 * Mobile Navigation
 * Handles the functionality of the mobile navigation menu
 * Copyright (c) 2025 ph1z3r
 */

document.addEventListener('DOMContentLoaded', function() {
    // Simple toggle for mobile menu - completely rewritten for reliability
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    let menuOpen = false;
    
    // Function to toggle menu visibility with animations
    function toggleMobileMenu() {
        if (menuOpen) {
            // Close the menu with animation
            mobileNav.classList.add('hide');
            mobileNav.classList.remove('show');
            setTimeout(() => {
                mobileNav.style.display = 'none';
                mobileNav.classList.remove('hide');
            }, 300);
            // Animate the icon switch
            const oldIcon = mobileMenuToggle.querySelector('i');
            if (oldIcon) {
                oldIcon.style.transition = 'transform 0.3s ease';
                oldIcon.style.transform = 'rotate(-90deg)';
                
                setTimeout(() => {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    const newIcon = mobileMenuToggle.querySelector('i');
                    if (newIcon) {
                        newIcon.style.transform = 'rotate(0)';
                    }
                }, 150);
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        } else {
            // Open the menu with animation
            mobileNav.style.display = 'flex';
            mobileNav.classList.add('show');
            mobileNav.classList.remove('hide');
            // Animate the icon switch
            const oldIcon = mobileMenuToggle.querySelector('i');
            if (oldIcon) {
                oldIcon.style.transition = 'transform 0.3s ease';
                oldIcon.style.transform = 'rotate(90deg)';
                
                setTimeout(() => {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
                    const newIcon = mobileMenuToggle.querySelector('i');
                    if (newIcon) {
                        newIcon.style.transform = 'rotate(0)';
                    }
                }, 150);
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            }
        }
        menuOpen = !menuOpen;
    }
    
    // Initially hide the mobile menu
    mobileNav.style.display = 'none';
    
    // Toggle on button click
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menuOpen && !mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Close menu when screen size changes
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMobileMenu();
        }
    });
});