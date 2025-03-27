document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Search bar interaction
    const searchBar = document.querySelector('.search-bar');
    const searchItems = document.querySelectorAll('.search-item');
    const guestCounters = document.querySelectorAll('.guest-counter');
    const dateInputs = document.querySelectorAll('.date-input');

    // Set minimum date for date inputs to today
    dateInputs.forEach(input => {
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
    });

    // Handle search item focus
    searchItems.forEach(item => {
        const input = item.querySelector('.search-input');
        if (input) {
            input.addEventListener('focus', () => {
                searchItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        }
        
        item.addEventListener('click', function(e) {
            if (e.target === item || e.target.closest('.search-item') === item) {
                searchItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // Handle guest counter
    guestCounters.forEach(counter => {
        const minusBtn = counter.querySelector('.minus');
        const plusBtn = counter.querySelector('.plus');
        const countSpan = counter.querySelector('.count');
        let count = 0;

        minusBtn.addEventListener('click', () => {
            if (count > 0) {
                count--;
                countSpan.textContent = count;
                updateGuestCount();
            }
            minusBtn.disabled = count === 0;
        });

        plusBtn.addEventListener('click', () => {
            count++;
            countSpan.textContent = count;
            minusBtn.disabled = false;
            updateGuestCount();
        });
    });

    // Update total guest count
    function updateGuestCount() {
        const counts = Array.from(document.querySelectorAll('.count')).map(el => parseInt(el.textContent));
        const total = counts.reduce((a, b) => a + b, 0);
        const guestCount = document.querySelector('.guest-count');
        
        if (total === 0) {
            guestCount.textContent = 'Thêm khách';
        } else {
            guestCount.textContent = `${total} khách`;
        }
    }

    // Handle date inputs
    const checkInInput = document.querySelector('.check-in input');
    const checkOutInput = document.querySelector('.check-out input');

    checkInInput.addEventListener('change', function() {
        // Set minimum date for checkout to be after checkin
        checkOutInput.setAttribute('min', this.value);
        if (checkOutInput.value && checkOutInput.value < this.value) {
            checkOutInput.value = this.value;
        }
    });

    // Search button click handler
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', function() {
        // Add animation
        this.classList.add('searching');
        
        // Get search parameters
        const location = document.querySelector('.location .search-input').value;
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        const guests = document.querySelector('.guest-count').textContent;

        // Validate search parameters
        if (!location) {
            alert('Vui lòng nhập địa điểm bạn muốn đến');
            this.classList.remove('searching');
            return;
        }

        // Simulate search delay
        setTimeout(() => {
            this.classList.remove('searching');
            // Here you would typically handle the actual search
            alert(`Đang tìm kiếm:
Địa điểm: ${location}
Check-in: ${checkIn || 'Chưa chọn'}
Check-out: ${checkOut || 'Chưa chọn'}
Khách: ${guests}`);
        }, 1000);
    });

    // Close guest dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const guestsDropdown = document.querySelector('.guest-dropdown');
        const guestsItem = document.querySelector('.search-item.guests');
        
        if (!guestsItem.contains(e.target)) {
            guestsDropdown.style.display = 'none';
        }
    });

    // Sticky header
    let header = document.querySelector('.header');
    let searchSection = document.querySelector('.search');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Property card hover effect
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Responsive menu toggle
    const menuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
});
