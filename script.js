document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Intersection Observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate child elements with delays
                if (entry.target.id === 'why-us') {
                    const cards = entry.target.querySelectorAll('.benefit-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, index * 150);
                    });
                }
                
                if (entry.target.id === 'services') {
                    const cards = entry.target.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, index * 150);
                    });
                }
                
                if (entry.target.id === 'contact') {
                    const formGroups = entry.target.querySelectorAll('.form-group');
                    const btn = entry.target.querySelector('.btn');
                    const socialIcons = entry.target.querySelectorAll('.social-icon');
                    
                    formGroups.forEach(group => {
                        group.classList.add('active');
                    });
                    
                    setTimeout(() => {
                        btn.classList.add('active');
                    }, 400);
                    
                    socialIcons.forEach(icon => {
                        icon.classList.add('active');
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just log it and show an alert
            console.log({ name, email, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let fromTop = window.scrollY + 100;
        
        document.querySelectorAll('nav a').forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
    
    // Initial active state for first section
    document.querySelector('nav a').click();
});