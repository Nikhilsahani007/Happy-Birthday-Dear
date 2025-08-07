// Application state
let currentPageIndex = 1;
const totalPages = 5;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Ensure first page is active
    showPage(1);
    
    // Add dynamic confetti and particles to celebration page
    if (currentPageIndex === 5) {
        createDynamicEffects();
    }
}

function nextPage() {
    if (currentPageIndex < totalPages) {
        const currentPage = document.getElementById(`page-${currentPageIndex}`);
        const nextPageIndex = currentPageIndex + 1;
        const nextPage = document.getElementById(`page-${nextPageIndex}`);
        
        // Add exit animation to current page
        currentPage.classList.add('prev');
        currentPage.classList.remove('active');
        
        // Show next page with entrance animation
        setTimeout(() => {
            nextPage.classList.add('active');
            currentPageIndex = nextPageIndex;
            
            // Add special effects for celebration page
            if (currentPageIndex === 5) {
                setTimeout(() => {
                    createDynamicEffects();
                }, 500);
            }
        }, 100);
    }
}

function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active', 'prev');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPageIndex = pageNumber;
    }
}

function restartExperience() {
    // Reset all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active', 'prev');
    });
    
    // Remove dynamic effects
    removeDynamicEffects();
    
    // Show first page after a brief delay for smooth transition
    setTimeout(() => {
        currentPageIndex = 1;
        showPage(1);
    }, 300);
}

function createDynamicEffects() {
    createConfetti();
    createFloatingHearts();
    createSparkleRain();
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
    
    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiDrop ${Math.random() * 3 + 2}s linear forwards;
                z-index: 1000;
            `;
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
}

function createFloatingHearts() {
    const celebrationPage = document.getElementById('page-5');
    const hearts = ['💖', '💝', '🎉', '🎊', '🌟', '⭐'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                bottom: -50px;
                animation: heartFloat ${Math.random() * 4 + 3}s ease-out forwards;
                pointer-events: none;
                z-index: 999;
            `;
            
            celebrationPage.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 7000);
        }, i * 200);
    }
}

function createSparkleRain() {
    const celebrationPage = document.getElementById('page-5');
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-drop';
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 15 + 10}px;
                left: ${Math.random() * 100}%;
                top: -30px;
                animation: sparkleDrop ${Math.random() * 4 + 2}s linear forwards;
                pointer-events: none;
                z-index: 998;
            `;
            
            celebrationPage.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 6000);
        }, i * 150);
    }
}

function removeDynamicEffects() {
    // Remove all dynamically created elements
    document.querySelectorAll('.confetti-piece, .floating-heart, .sparkle-drop').forEach(el => {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });
}

// Add CSS animations for dynamic effects
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes confettiDrop {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translateY(-20vh) scale(1);
        }
        100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes sparkleDrop {
        0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(10vh) rotate(180deg) scale(1);
        }
        90% {
            opacity: 1;
            transform: translateY(90vh) rotate(540deg) scale(1);
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0);
            opacity: 0;
        }
    }
    
    .confetti-piece {
        pointer-events: none;
    }
    
    .floating-heart {
        pointer-events: none;
    }
    
    .sparkle-drop {
        pointer-events: none;
    }
`;

document.head.appendChild(dynamicStyles);

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const activeButton = document.querySelector('.page.active .btn');
        if (activeButton) {
            event.preventDefault();
            activeButton.click();
        }
    }
    
    // Arrow key navigation
    if (event.key === 'ArrowRight' && currentPageIndex < totalPages) {
        nextPage();
    } else if (event.key === 'ArrowLeft' && currentPageIndex > 1) {
        // Go back functionality (optional)
        const prevPageIndex = currentPageIndex - 1;
        const currentPage = document.getElementById(`page-${currentPageIndex}`);
        const prevPage = document.getElementById(`page-${prevPageIndex}`);
        
        currentPage.classList.remove('active');
        prevPage.classList.remove('prev');
        prevPage.classList.add('active');
        currentPageIndex = prevPageIndex;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentPageIndex < totalPages) {
            // Swipe left - go to next page
            nextPage();
        } else if (diff < 0 && currentPageIndex > 1) {
            // Swipe right - go to previous page
            const prevPageIndex = currentPageIndex - 1;
            const currentPage = document.getElementById(`page-${currentPageIndex}`);
            const prevPage = document.getElementById(`page-${prevPageIndex}`);
            
            currentPage.classList.remove('active');
            prevPage.classList.remove('prev');
            prevPage.classList.add('active');
            currentPageIndex = prevPageIndex;
        }
    }
}

// Prevent default touch behaviors that might interfere
document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// Add button click animations
document.addEventListener('click', function(event) {
    if (event.target.matches('.btn') || event.target.closest('.btn')) {
        const button = event.target.matches('.btn') ? event.target : event.target.closest('.btn');
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Preload next page content for smooth transitions
function preloadNextPage() {
    if (currentPageIndex < totalPages) {
        const nextPage = document.getElementById(`page-${currentPageIndex + 1}`);
        if (nextPage) {
            // Trigger any animations or content loading for the next page
            nextPage.style.willChange = 'transform, opacity';
        }
    }
}

// Optimize performance by calling preload on user interaction
document.addEventListener('mouseenter', preloadNextPage);
document.addEventListener('touchstart', preloadNextPage);