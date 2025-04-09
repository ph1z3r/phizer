/*
 * Reactions System
 * Handles like/dislike functionality for blog posts
 * Copyright (c) 2025 ph1z3r
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all reaction buttons
    const likeButtons = document.querySelectorAll('.reaction-btn.like');
    const dislikeButtons = document.querySelectorAll('.reaction-btn.dislike');
    
    // Setup local storage for reactions if not already present
    if (!localStorage.getItem('postReactions')) {
        localStorage.setItem('postReactions', JSON.stringify({}));
    }
    
    // Function to get post reactions from local storage
    function getPostReactions() {
        return JSON.parse(localStorage.getItem('postReactions'));
    }
    
    // Function to save post reactions to local storage
    function savePostReactions(reactions) {
        localStorage.setItem('postReactions', JSON.stringify(reactions));
    }
    
    // Function to update reaction UI
    function updateReactionUI(postId, liked, disliked) {
        const likeBtn = document.querySelector(`.reaction-btn.like[data-post-id="${postId}"]`);
        const dislikeBtn = document.querySelector(`.reaction-btn.dislike[data-post-id="${postId}"]`);
        
        if (likeBtn) {
            if (liked) {
                likeBtn.classList.add('active');
                likeBtn.querySelector('.reaction-count').textContent = 
                    parseInt(likeBtn.querySelector('.reaction-count').textContent) + 1;
            } else if (likeBtn.classList.contains('active')) {
                likeBtn.classList.remove('active');
                likeBtn.querySelector('.reaction-count').textContent = 
                    Math.max(0, parseInt(likeBtn.querySelector('.reaction-count').textContent) - 1);
            }
        }
        
        if (dislikeBtn) {
            if (disliked) {
                dislikeBtn.classList.add('active');
                dislikeBtn.querySelector('.reaction-count').textContent = 
                    parseInt(dislikeBtn.querySelector('.reaction-count').textContent) + 1;
            } else if (dislikeBtn.classList.contains('active')) {
                dislikeBtn.classList.remove('active');
                dislikeBtn.querySelector('.reaction-count').textContent = 
                    Math.max(0, parseInt(dislikeBtn.querySelector('.reaction-count').textContent) - 1);
            }
        }
    }
    
    // Set initial state for reaction buttons
    function setInitialReactionState() {
        const reactions = getPostReactions();
        
        likeButtons.forEach(button => {
            const postId = button.getAttribute('data-post-id');
            if (reactions[postId] && reactions[postId].liked) {
                button.classList.add('active');
            }
        });
        
        dislikeButtons.forEach(button => {
            const postId = button.getAttribute('data-post-id');
            if (reactions[postId] && reactions[postId].disliked) {
                button.classList.add('active');
            }
        });
    }
    
    // Handle like button clicks
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const postId = this.getAttribute('data-post-id');
            const reactions = getPostReactions();
            
            if (!reactions[postId]) {
                reactions[postId] = { liked: false, disliked: false };
            }
            
            // Toggle like state
            if (reactions[postId].liked) {
                reactions[postId].liked = false;
                updateReactionUI(postId, false, false);
            } else {
                // If post was disliked, remove dislike first
                if (reactions[postId].disliked) {
                    reactions[postId].disliked = false;
                    updateReactionUI(postId, false, false);
                }
                
                reactions[postId].liked = true;
                updateReactionUI(postId, true, false);
                
                // Show fancy animation for like
                const likeIcon = this.querySelector('i');
                likeIcon.classList.add('pulse-animation');
                setTimeout(() => {
                    likeIcon.classList.remove('pulse-animation');
                }, 1000);
            }
            
            savePostReactions(reactions);
        });
    });
    
    // Handle dislike button clicks
    dislikeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const postId = this.getAttribute('data-post-id');
            const reactions = getPostReactions();
            
            if (!reactions[postId]) {
                reactions[postId] = { liked: false, disliked: false };
            }
            
            // Toggle dislike state
            if (reactions[postId].disliked) {
                reactions[postId].disliked = false;
                updateReactionUI(postId, false, false);
            } else {
                // If post was liked, remove like first
                if (reactions[postId].liked) {
                    reactions[postId].liked = false;
                    updateReactionUI(postId, false, false);
                }
                
                reactions[postId].disliked = true;
                updateReactionUI(postId, false, true);
                
                // Show fancy animation for dislike
                const dislikeIcon = this.querySelector('i');
                dislikeIcon.classList.add('shake-animation');
                setTimeout(() => {
                    dislikeIcon.classList.remove('shake-animation');
                }, 1000);
            }
            
            savePostReactions(reactions);
        });
    });
    
    // Initialize reaction state
    setInitialReactionState();
});