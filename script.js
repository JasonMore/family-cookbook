// Family Cookbook Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');
    const viewRecipeButtons = document.querySelectorAll('.btn-view-recipe');

    // Cache searchable content for better performance
    const searchableContent = Array.from(recipeCards).map(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('.recipe-description').textContent.toLowerCase();
        const ingredients = card.querySelector('.recipe-details ul')?.textContent.toLowerCase() || '';
        return {
            card: card,
            text: title + ' ' + description + ' ' + ingredients
        };
    });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        searchableContent.forEach(item => {
            if (item.text.includes(searchTerm)) {
                item.card.classList.remove('hidden');
            } else {
                item.card.classList.add('hidden');
            }
        });
    });

    // Category filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter recipes
            recipeCards.forEach(card => {
                if (category === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });

            // Clear search when filtering by category
            searchInput.value = '';
        });
    });

    // View recipe toggle functionality
    viewRecipeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const recipeCard = this.closest('.recipe-card');
            recipeCard.classList.toggle('expanded');
            
            // Scroll to recipe if expanding, respecting user motion preferences
            if (recipeCard.classList.contains('expanded')) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                recipeCard.scrollIntoView({ 
                    behavior: prefersReducedMotion ? 'auto' : 'smooth', 
                    block: 'nearest' 
                });
            }
        });
    });
});
