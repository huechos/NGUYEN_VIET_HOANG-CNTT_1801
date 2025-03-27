document.addEventListener('DOMContentLoaded', function() {
    // Calculator Functionality
    const locationSelect = document.querySelector('.calculator-form select');
    const roomTypeButtons = document.querySelectorAll('.room-type-selector button');
    const guestCounter = document.querySelector('.guest-counter');
    const minusBtn = guestCounter?.querySelector('.minus');
    const plusBtn = guestCounter?.querySelector('.plus');
    const guestCount = guestCounter?.querySelector('span');
    const earningsResult = document.querySelector('.earnings-result h3');
    
    // City earnings data (monthly estimates)
    const cityEarnings = {
        'Hà Nội': {
            'Toàn bộ nhà': {
                base: 8900000,
                perGuest: 500000
            },
            'Phòng riêng': {
                base: 4500000,
                perGuest: 300000
            },
            'Phòng chung': {
                base: 2800000,
                perGuest: 200000
            }
        },
        'TP. Hồ Chí Minh': {
            'Toàn bộ nhà': {
                base: 12500000,
                perGuest: 700000
            },
            'Phòng riêng': {
                base: 6000000,
                perGuest: 400000
            },
            'Phòng chung': {
                base: 3500000,
                perGuest: 250000
            }
        },
        'Đà Nẵng': {
            'Toàn bộ nhà': {
                base: 7200000,
                perGuest: 400000
            },
            'Phòng riêng': {
                base: 3800000,
                perGuest: 250000
            },
            'Phòng chung': {
                base: 2500000,
                perGuest: 150000
            }
        },
        'Nha Trang': {
            'Toàn bộ nhà': {
                base: 6800000,
                perGuest: 400000
            },
            'Phòng riêng': {
                base: 3500000,
                perGuest: 200000
            },
            'Phòng chung': {
                base: 2200000,
                perGuest: 150000
            }
        }
    };

    let currentCity = '';
    let currentRoomType = 'Toàn bộ nhà';
    let currentGuests = 4;

    // Update earnings calculation
    function updateEarnings() {
        if (!currentCity || !cityEarnings[currentCity]) return;

        const earnings = cityEarnings[currentCity][currentRoomType];
        const total = earnings.base + (earnings.perGuest * (currentGuests - 1));
        
        // Animate the number change
        animateNumber(earningsResult, total);
    }

    // Number animation function
    function animateNumber(element, final) {
        const start = parseInt(element.textContent.replace(/\D/g,''));
        const duration = 1000;
        const steps = 20;
        const increment = (final - start) / steps;
        let current = start;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;
            if (step >= steps) {
                current = final;
                clearInterval(timer);
            }
            element.textContent = formatCurrency(Math.round(current));
        }, duration / steps);
    }

    // Format currency
    function formatCurrency(number) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(number);
    }

    // Location select handler
    locationSelect?.addEventListener('change', function() {
        currentCity = this.value;
        updateEarnings();
    });

    // Room type buttons handler
    roomTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            roomTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentRoomType = this.textContent;
            updateEarnings();
        });
    });

    // Guest counter handlers
    let guestValue = 4;
    
    minusBtn?.addEventListener('click', function() {
        if (guestValue > 1) {
            guestValue--;
            guestCount.textContent = `${guestValue} khách`;
            currentGuests = guestValue;
            updateEarnings();
        }
        minusBtn.disabled = guestValue === 1;
    });

    plusBtn?.addEventListener('click', function() {
        if (guestValue < 16) {
            guestValue++;
            guestCount.textContent = `${guestValue} khách`;
            currentGuests = guestValue;
            updateEarnings();
            minusBtn.disabled = false;
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll behavior
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
            navbar.classList.add('scrolled');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // FAQ Accordion animation
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Remove active class from all buttons
            accordionButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to current button if expanding
            if (!isExpanded) {
                this.classList.add('active');
            }
        });
    });

    // Add intersection observer for animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.step-card, .protection-item, .stat-item').forEach(element => {
        animateOnScroll.observe(element);
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .navbar.scrolled {
            transform: translateY(-100%);
        }

        .accordion-button.active {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
}); 