document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const lightThemeCss = document.getElementById('light-theme-css');
    const darkThemeCss = document.getElementById('dark-theme-css');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Set theme based on localStorage or default
    initializeTheme();
    
    // Theme toggle button handler
    themeToggleBtn.addEventListener('click', function() {
        toggleTheme();
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            document.addEventListener('click', function closeMenu(e) {
                // Close the menu when clicking outside of it
                if (!mobileNav.contains(e.target) && e.target !== mobileMenuToggle) {
                    mobileNav.classList.remove('active');
                    document.removeEventListener('click', closeMenu);
                }
            });
        });
        
        // Add event listeners to each mobile nav link
        document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                // Close the mobile menu when a link is clicked
                mobileNav.classList.remove('active');
            });
        });
    }
    
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || document.documentElement.getAttribute('data-default-theme') || 'dark';
        setTheme(savedTheme);
    }
    
    function toggleTheme() {
        // Add a rotation animation to the icon
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
            icon.style.transform = 'rotate(180deg)';
            
            // Reset the animation after it completes
            setTimeout(() => {
                icon.style.transform = 'rotate(0)';
            }, 300);
        }
        
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }
    
    function setTheme(theme) {
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            darkThemeCss.removeAttribute('disabled');
            lightThemeCss.setAttribute('disabled', '');
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.classList.remove('light-mode');
            themeToggleBtn.classList.add('dark-mode');
        } else {
            lightThemeCss.removeAttribute('disabled');
            darkThemeCss.setAttribute('disabled', '');
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.classList.remove('dark-mode');
            themeToggleBtn.classList.add('light-mode');
        }
    }
});
