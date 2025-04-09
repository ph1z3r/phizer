document.addEventListener('DOMContentLoaded', function() {
    // Hide content initially and show loading screen
    const mainContent = document.querySelector('.main-content');
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (mainContent) {
        mainContent.style.opacity = '0';
    }
    
    // Function to add animation classes to elements
    function animateElements() {
        // Animate hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-in');
        }
        
        // Animate navigation buttons with staggered delay
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach((button, index) => {
            button.style.setProperty('--animation-order', index);
            button.classList.add('animate-in');
        });
        
        // Animate portfolio items with staggered delay
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, 100 * index);
        });
        
        // Animate blog posts with staggered delay
        const blogPosts = document.querySelectorAll('.post-item');
        blogPosts.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('animate-in');
            }, 100 * index);
        });
        
        // Animate section headers
        const sectionHeaders = document.querySelectorAll('section h2');
        sectionHeaders.forEach((header) => {
            header.classList.add('animate-in');
        });
    }
    
    // Show page content after loading delay
    setTimeout(function() {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            
            // After loading screen fades out, show content
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.style.opacity = '1';
                    mainContent.classList.add('fade-in');
                    
                    // Start animating elements after fade in
                    animateElements();
                }
            }, 500);
        }
    }, 3000); // 3 seconds delay
});