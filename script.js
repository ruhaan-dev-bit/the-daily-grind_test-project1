// Base Menu Price Registry
const basePrices = {
    0: 4.50, // Cappuccino
    1: 5.00, // Cold Coffee
    2: 4.75, // Latte
    3: 6.20, // Garlic Bread
    4: 6.80  // Cheese Sandwich
};

// 1. Organic Market Price Variance Generator
function generateRandomPrices() {
    for (let id in basePrices) {
        const original = basePrices[id];
        // Adds subtle organic market pricing shifts (+/- $0.20)
        const variance = (Math.random() * 0.40 - 0.20);
        const currentPrice = (original + variance).toFixed(2);
        
        document.getElementById(`price-${id}`).innerText = `$${currentPrice}`;
    }
}

// 2. Dynamic Hour Specials Engine (Highlights Chef Specialties)
function grindAndRefreshSpecials() {
    generateRandomPrices();
    
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => card.classList.remove('special-highlight'));

    // Pick a random selection index out of the 5 cards
    const randomSpecialIdx = Math.floor(Math.random() * 5);
    const specialCard = document.querySelector(`.menu-card[data-index="${randomSpecialIdx}"]`);
    
    if (specialCard) {
        specialCard.classList.add('special-highlight');
        
        // Formulates a live promotional markdown calculation (15% to 30% off)
        const origVal = parseFloat(basePrices[randomSpecialIdx]);
        const discountPercent = 0.15 + (Math.random() * 0.15);
        const discountedVal = (origVal * (1 - discountPercent)).toFixed(2);
        
        const origElement = document.getElementById(`orig-price-${randomSpecialIdx}`);
        const finalElement = document.getElementById(`price-${randomSpecialIdx}`);
        
        origElement.innerText = `$${origVal.toFixed(2)}`;
        finalElement.innerText = `$${discountedVal}`;
    }
}

// 3. Manual Shuffler Button Controller
function triggerManualGrind() {
    const gear = document.getElementById('gear-icon');
    gear.classList.add('spinning');
    
    grindAndRefreshSpecials();
    
    setTimeout(() => {
        gear.classList.remove('spinning');
    }, 800);
}

// Auto-shuffle the menu items smoothly every 5 seconds
setInterval(grindAndRefreshSpecials, 5000);

// Run configuration sets on load
window.addEventListener('DOMContentLoaded', () => {
    grindAndRefreshSpecials();
});

// 4. Sticky Header Animations on Window Scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('navbar');
    header.classList.toggle('sticky', window.scrollY > 40);
});

// 5. Active Link Highlighting matching current layout sections
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 180) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// 6. Interactive Form submission Alert system
document.getElementById('resForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`☕ Outstanding choice, ${name}! Your cozy work desk has been reserved at The Daily Grind Co. We will have your custom spot ready on your arrival!`);
    this.reset();
});