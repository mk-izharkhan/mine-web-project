Conversation unstarred. Conversation opened. 1 unread message.

Skip to content
Using Gmail with screen readers
This browser version is no longer supported. Please upgrade to a supported browser.
1 of 35
New 1 correct j.s
Inbox

MK Khan
3:25?PM (9 minutes ago)
to me

// ============================================
// GLAM HAVEN - ORIGINAL JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeSearch();
    initializeCart();
    initializeScrollEffects();
    initializeCountdownTimer();
    initializeNewsletterForm();
    initializeProductInteractions();
});

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        });
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-button');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query === '') {
        showToast('Please enter a search term', 'info');
        return;
    }
    
    const products = document.querySelectorAll('.product-item');
    let foundCount = 0;
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const category = product.querySelector('.product-cat').textContent.toLowerCase();
        
        if (title.includes(query) || category.includes(query)) {
            product.style.display = 'block';
            foundCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    if (foundCount > 0) {
        showToast(`Found ${foundCount} product(s) matching "${query}"`, 'success');
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    } else {
        showToast(`No products found for "${query}"`, 'info');
        // Reset display
        products.forEach(product => {
            product.style.display = 'block';
        });
    }
}

// ============================================
// CART FUNCTIONALITY
// ============================================
let cart = {
    items: [],
    count: 0
};

function initializeCart() {
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productTitle = productItem.querySelector('.product-title').textContent;
            const productPrice = productItem.querySelector('.price-current').textContent;
            
            addToCart(productTitle, productPrice);
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.background = 'linear-gradient(120deg, #43a047 0%, #2e7d32 100%)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    });
}

function addToCart(title, price) {
    cart.items.push({ title, price });
    cart.count++;
    updateCartBadge();
    showToast(`"${title}" added to cart!`, 'success');
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        cartBadge.textContent = cart.count;
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initializeScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    observeElements();
}

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.product-item, .category-item, .benefit-card, .deal-banner');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initializeCountdownTimer() {
    const endDate = new Date('2025-12-31T23:59:59').getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            document.getElementById('timerDays').textContent = '00';
            document.getElementById('timerHours').textContent = '00';
            document.getElementById('timerMins').textContent = '00';
            document.getElementById('timerSecs').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('timerDays').textContent = String(days).padStart(2, '0');
        document.getElementById('timerHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('timerMins').textContent = String(minutes).padStart(2, '0');
        document.getElementById('timerSecs').textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================
// NEWSLETTER FORM
// ============================================
function initializeNewsletterForm() {
    const form = document.getElementById('subscribeForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                showToast('Thank you for subscribing! Check your email for exclusive offers.', 'success');
                emailInput.value = '';
            }
        });
    }
}

// ============================================
// PRODUCT INTERACTIONS
// ============================================
function initializeProductInteractions() {
    // Add wishlist functionality
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        // Create wishlist button
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'wishlist-btn';
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.style.cssText = `
            position: absolute;
            top: 16px;
            left: 16px;
            width: 40px;
            height: 40px;
            background: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #d81b60;
            transition: all 0.3s ease;
            z-index: 10;
        `;
        
        wishlistBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('Added to wishlist!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('Removed from wishlist', 'info');
            }
        });
        
        item.querySelector('.product-img').appendChild(wishlistBtn);
    });
}

// ============================================
// HELPER FUNCTION: SCROLL TO PRODUCTS
// ============================================
function scrollToProducts(category) {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Showing ${category} products`, 'info');
    }
}

// Make function globally available
window.scrollToProducts = scrollToProducts;

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}

// ============================================
// DEAL BUTTONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const dealButtons = document.querySelectorAll('.deal-action-btn');
    
    dealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dealTitle = this.closest('.deal-banner').querySelector('h3').textContent;
            showToast(`Exploring ${dealTitle}...`, 'info');
            
            setTimeout(() => {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }, 800);
        });
    });
});

// ============================================
// CATEGORY ITEMS CLICK HANDLERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            scrollToProducts(categoryName);
        });
    });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// PRODUCT HOVER EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-item');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
});

// ============================================
// SEARCH INPUT CLEAR ON ESCAPE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.blur();
                // Reset all products display
                document.querySelectorAll('.product-item').forEach(product => {
                    product.style.display = 'block';
                });
            }
        });
    }
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c Welcome to Glam Haven! ', 'background: linear-gradient(120deg, #d81b60 0%, #8e24aa 100%); color: white; font-size: 20px; padding: 10px; border-radius: 8px; font-weight: bold;');
console.log('%c Discover premium beauty products at amazing prices! ', 'color: #d81b60; font-size: 14px; font-weight: 600;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        document.getElementById('searchInput').blur();
    }
});
