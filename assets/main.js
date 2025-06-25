document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('active');
        });
        
        // Show current testimonial
        testimonialCards[index].style.display = 'block';
        testimonialCards[index].classList.add('active');
    }
    
    // Initialize the first testimonial
    showTestimonial(currentIndex);
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex >= testimonialCards.length) {
            currentIndex = 0;
        }
        showTestimonial(currentIndex);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = testimonialCards.length - 1;
        }
        showTestimonial(currentIndex);
    });
});

function toggleFaq(element) {
            const faqItem = element.closest('.faq-item');
            const isActive = faqItem.classList.contains('faq-active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('faq-active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('faq-active');
            }
        }





         let isDragging = false;
        let currentContainer = null;
        
        // Initialize slider functionality for all containers
        function initSliders() {
            const containers = document.querySelectorAll('.image-container');
            
            containers.forEach(container => {
                const sliderHandle = container.querySelector('.slider-handle');
                const afterImage = container.querySelector('.after-image');
                
                // Mouse events
                sliderHandle.addEventListener('mousedown', (e) => startDrag(e, container));
                
                // Touch events for mobile
                sliderHandle.addEventListener('touchstart', (e) => startDrag(e, container));
            });
            
            // Global mouse/touch events
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
        }
        
        function startDrag(e, container) {
            isDragging = true;
            currentContainer = container;
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging || !currentContainer) return;
            
            const rect = currentContainer.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            const sliderHandle = currentContainer.querySelector('.slider-handle');
            const afterImage = currentContainer.querySelector('.after-image');
            
            sliderHandle.style.left = percentage + '%';
            afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
        }
        
        function stopDrag() {
            isDragging = false;
            currentContainer = null;
        }
        
        // Control functions
        function showBefore(caseNumber) {
            const container = document.querySelector(`[data-case="${caseNumber}"]`);
            const afterImage = container.querySelector('.after-image');
            const sliderHandle = container.querySelector('.slider-handle');
            
            afterImage.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
            sliderHandle.style.left = '0%';
            updateActiveButton(caseNumber, 0);
        }
        
        function showAfter(caseNumber) {
            const container = document.querySelector(`[data-case="${caseNumber}"]`);
            const afterImage = container.querySelector('.after-image');
            const sliderHandle = container.querySelector('.slider-handle');
            
            afterImage.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
            sliderHandle.style.left = '100%';
            updateActiveButton(caseNumber, 2);
        }
        
        function showComparison(caseNumber) {
            const container = document.querySelector(`[data-case="${caseNumber}"]`);
            const afterImage = container.querySelector('.after-image');
            const sliderHandle = container.querySelector('.slider-handle');
            
            afterImage.style.clipPath = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)';
            sliderHandle.style.left = '50%';
            updateActiveButton(caseNumber, 1);
        }
        
        function updateActiveButton(caseNumber, buttonIndex) {
            const card = document.querySelector(`[data-case="${caseNumber}"]`).closest('.comparison-card');
            const buttons = card.querySelectorAll('.control-btn');
            
            buttons.forEach((btn, i) => {
                btn.classList.toggle('active', i === buttonIndex);
            });
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            initSliders();
            
            // Initialize both cards with comparison view
            showComparison(1);
            showComparison(2);
        });


        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            const scrollButton = document.querySelector('.footer-scroll-top');
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });

        // Initially hide the scroll button
        document.querySelector('.footer-scroll-top').style.display = 'none';


        // Counter Animation Function
        function animateCounter(element, target, duration = 2000) {
            let startTime = null;
            const startValue = 0;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
                
                element.textContent = currentValue.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animation);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
            
            requestAnimationFrame(animation);
        }
        
        // Intersection Observer for trigger animation when section is visible
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.count-animated');
                    
                    counters.forEach((counter, index) => {
                        const target = parseInt(counter.dataset.target);
                        // Stagger the animation start times slightly
                        setTimeout(() => {
                            animateCounter(counter, target);
                        }, index * 200);
                    });
                    
                    // Unobserve after animation starts
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Start observing the counter section
        const counterSection = document.querySelector('.count-section');
        observer.observe(counterSection);
        
        // Fallback: Start animation after 1 second if intersection observer doesn't trigger
        setTimeout(() => {
            const counters = document.querySelectorAll('.count-animated');
            counters.forEach((counter, index) => {
                if (counter.textContent === '0') {
                    const target = parseInt(counter.dataset.target);
                    setTimeout(() => {
                        animateCounter(counter, target);
                    }, index * 200);
                }
            });
        }, 1000);


        // Testimonial 
       let currentSlideIndex = 0;
let slides, indicators;

document.addEventListener('DOMContentLoaded', () => {
  slides = document.querySelectorAll('.clients-slide');
  indicators = document.querySelectorAll('.clients-indicator');
  showSlide(currentSlideIndex);

  // Auto slide
  setInterval(() => {
    changeSlide(1);
  }, 5000);

  // Touch swipe
  let startX = 0, endX = 0;
  const slider = document.querySelector('.clients-slider');
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  slider.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      changeSlide(diff > 0 ? 1 : -1);
    }
  }
});

function showSlide(n) {
  if (!slides || !indicators) return;

  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(dot => dot.classList.remove('active'));

  currentSlideIndex = (n + slides.length) % slides.length;
  slides[currentSlideIndex].classList.add('active');
  indicators[currentSlideIndex].classList.add('active');
}

function changeSlide(n) {
  showSlide(currentSlideIndex + n);
}

function currentSlide(n) {
  showSlide(n - 1);
}
        // why choose us

        class ServiceCarousel {
        constructor() {
            this.wrapper = document.getElementById('carouselWrapper');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            this.indicators = document.getElementById('indicators');
            this.cards = Array.from(document.querySelectorAll('.service-card'));
            this.cardsPerSlide = 3;
            this.totalSlides = Math.ceil(this.cards.length / this.cardsPerSlide);
            this.currentIndex = 0;

            this.init();
            this.setupEventListeners();
            this.createIndicators();
            this.updateCarousel();
        }

        init() {
            // Set wrapper width based on slides
            const slideWidth = 350 + 30; // card width + gap
            this.wrapper.style.width = `${this.totalSlides * this.cardsPerSlide * slideWidth}px`;
        }

        setupEventListeners() {
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());

            this.startAutoPlay();

            this.wrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.wrapper.addEventListener('mouseleave', () => this.startAutoPlay());

           window.addEventListener('resize', () => {
            this.cardsPerSlide = window.innerWidth <= 1024 ? 1 : 3;
            this.updateCarousel();
        });

        }

        createIndicators() {
            this.indicators.innerHTML = '';
            for (let i = 0; i < this.totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                indicator.addEventListener('click', () => this.goToSlide(i));
                this.indicators.appendChild(indicator);
            }
        }


        updateCarousel() {
            const isMobile = window.innerWidth <= 1024;
            const card = this.cards[0];
            const cardWidth = card.offsetWidth;
            const gap = parseFloat(getComputedStyle(this.wrapper).gap || 0);
            const cardsPerSlide = isMobile ? 1 : this.cardsPerSlide;
            const slideWidth = cardWidth + gap;

            const offset = -(this.currentIndex * slideWidth * cardsPerSlide);
            this.wrapper.style.transform = `translateX(${offset}px)`;

            this.updateIndicators();
        }


        updateIndicators() {
            const indicators = this.indicators.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }

        prev() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.totalSlides - 1;
            }
            this.updateCarousel();
        }

        next() {
            if (this.currentIndex < this.totalSlides - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.updateCarousel();
        }

        goToSlide(index) {
            this.currentIndex = index;
            this.updateCarousel();
        }

        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => {
                this.next();
            }, 4000);
        }

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new ServiceCarousel();
    });

    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Read more clicked');
        });
    });