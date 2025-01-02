// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.boxShadow = 'none';
    }
});

// Statistics Counter Animation
const startCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS

    const updateCount = () => {
        count += increment;
        if(count < target) {
            el.textContent = Math.floor(count);
            requestAnimationFrame(updateCount);
        } else {
            el.textContent = target;
        }
    };

    updateCount();
};

// Intersection Observer for Statistics
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => startCount(counter));
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Start observing statistics section
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted with data:', data);
        
        // Show success message
        alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت.');
        
        // Reset form
        this.reset();
    });
}

// Newsletter Subscription Handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('شكراً لاشتراكك في النشرة البريدية!');
        
        // Reset form
        this.reset();
    });
}

// Property Search Handler
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get search parameters
        const formData = new FormData(this);
        const searchParams = Object.fromEntries(formData);
        
        // Here you would typically handle the search
        console.log('Search parameters:', searchParams);
        
        // You could redirect to a search results page
        // window.location.href = `/search?${new URLSearchParams(searchParams)}`;
    });
}

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const sidebar = document.querySelector('.sidebar');

if (mobileMenuButton && sidebar) {
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchForm = document.querySelector('.search-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update form based on selected tab
            const tabType = button.textContent.trim();
            updateFormForTab(tabType);
        });
    });

    // Dynamic Price Ranges based on Tab
    function updateFormForTab(tabType) {
        const priceSelect = searchForm.querySelector('select[class="search-input"]');
        if (tabType === 'للإيجار') {
            updatePriceRangesForRent(priceSelect);
        } else {
            updatePriceRangesForSale(priceSelect);
        }
    }

    function updatePriceRangesForRent(select) {
        select.innerHTML = `
            <option value="">السعر (شهرياً)</option>
            <option value="0-5000">حتى 5,000 ريال</option>
            <option value="5000-10000">5,000 - 10,000 ريال</option>
            <option value="10000-20000">10,000 - 20,000 ريال</option>
            <option value="20000+">أكثر من 20,000 ريال</option>
        `;
    }

    function updatePriceRangesForSale(select) {
        select.innerHTML = `
            <option value="">السعر</option>
            <option value="0-500000">حتى 500,000 ريال</option>
            <option value="500000-1000000">500,000 - 1,000,000 ريال</option>
            <option value="1000000-2000000">1,000,000 - 2,000,000 ريال</option>
            <option value="2000000+">أكثر من 2,000,000 ريال</option>
        `;
    }

    // Search Form Submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(searchForm);
        const searchData = {};
        
        for (let [key, value] of formData.entries()) {
            searchData[key] = value;
        }
        
        // You can handle the search data here
        console.log('Search Data:', searchData);
        // TODO: Implement actual search functionality
    });

    // Advanced Search Toggle
    const advancedSearchBtn = document.createElement('button');
    advancedSearchBtn.className = 'advanced-search-toggle';
    advancedSearchBtn.innerHTML = 'خيارات متقدمة <i class="fas fa-chevron-down"></i>';
    
    const filtersRow = document.querySelector('.filters');
    filtersRow.parentNode.insertBefore(advancedSearchBtn, filtersRow);
    
    let filtersVisible = true;
    advancedSearchBtn.addEventListener('click', () => {
        filtersVisible = !filtersVisible;
        filtersRow.style.display = filtersVisible ? 'grid' : 'none';
        advancedSearchBtn.innerHTML = filtersVisible ? 
            'خيارات متقدمة <i class="fas fa-chevron-up"></i>' : 
            'خيارات متقدمة <i class="fas fa-chevron-down"></i>';
    });

    // Auto-complete for location search
    const locationInput = document.querySelector('.main-search input');
    let timeoutId;

    locationInput.addEventListener('input', (e) => {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            const searchTerm = e.target.value;
            if (searchTerm.length >= 3) {
                // Simulate API call for locations
                searchLocations(searchTerm);
            }
        }, 300);
    });

    function searchLocations(term) {
        // This is where you would typically make an API call
        // For demonstration, we'll use dummy data
        const dummyLocations = [
            'الرياض - النرجس',
            'الرياض - الملقا',
            'الرياض - العارض',
            'جدة - الشاطئ',
            'جدة - الروضة'
        ].filter(loc => loc.includes(term));

        showLocationSuggestions(dummyLocations);
    }

    function showLocationSuggestions(locations) {
        // Remove existing suggestions
        const existingSuggestions = document.querySelector('.location-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }

        if (locations.length === 0) return;

        // Create suggestions container
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'location-suggestions';

        // Add suggestions
        locations.forEach(location => {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion-item';
            suggestion.textContent = location;
            suggestion.addEventListener('click', () => {
                locationInput.value = location;
                suggestionsDiv.remove();
            });
            suggestionsDiv.appendChild(suggestion);
        });

        // Position and show suggestions
        locationInput.parentNode.appendChild(suggestionsDiv);
    }

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-search')) {
            const suggestions = document.querySelector('.location-suggestions');
            if (suggestions) {
                suggestions.remove();
            }
        }
    });
});