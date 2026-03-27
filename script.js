// ========== 1. DARK/LIGHT MODE TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    updateToggleIcon(true);
} else {
    body.classList.remove('dark');
    updateToggleIcon(false);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateToggleIcon(isDark);
});

function updateToggleIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========== 2. RESPONSIVE MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Animate hamburger bars
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active link highlight on scroll (scroll reveal + active menu)
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
});

// ========== 3. FORM VALIDATION (with live feedback) ==========
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');
const formFeedback = document.getElementById('formFeedback');

function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        nameError.textContent = 'Full name is required';
        return false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    }
    nameError.textContent = '';
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (email === '') {
        emailError.textContent = 'Email address is required';
        return false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Enter a valid email (e.g., name@example.com)';
        return false;
    }
    emailError.textContent = '';
    return true;
}

function validateSubject() {
    const subject = subjectInput.value.trim();
    if (subject === '') {
        subjectError.textContent = 'Subject is required';
        return false;
    } else if (subject.length < 3) {
        subjectError.textContent = 'Subject must be at least 3 characters';
        return false;
    }
    subjectError.textContent = '';
    return true;
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        messageError.textContent = 'Message cannot be empty';
        return false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    }
    messageError.textContent = '';
    return true;
}

// Real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
subjectInput.addEventListener('input', validateSubject);
messageInput.addEventListener('input', validateMessage);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        formFeedback.innerHTML = '<span style="color: #10b981;">✅ Message sent successfully! I\'ll get back to you soon.</span>';
        contactForm.reset();
        // clear errors
        setTimeout(() => {
            formFeedback.innerHTML = '';
        }, 4000);
    } else {
        formFeedback.innerHTML = '<span style="color: #ef4444;">❌ Please fix the errors above.</span>';
        setTimeout(() => {
            if (formFeedback.innerHTML.includes('fix')) formFeedback.innerHTML = '';
        }, 4000);
    }
});

// ========== 4. SCROLL REVEAL ANIMATION + SKILLS PROGRESS BAR ANIMATION ==========
// Animate skill bars when they come into view
const progressBars = document.querySelectorAll('.progress-fill');
let animated = false;

function animateSkills() {
    if (animated) return;
    const skillsSection = document.getElementById('skills');
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
        animated = true;
        window.removeEventListener('scroll', animateSkillsOnScroll);
    }
}

function animateSkillsOnScroll() {
    animateSkills();
}

window.addEventListener('scroll', animateSkillsOnScroll);
// Also trigger on load if visible
animateSkills();

// Extra: scroll reveal for project cards & stats (simple fade-in)
const revealElements = document.querySelectorAll('.project-card, .stat-card, .skill-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// initialize active class on hero link
document.querySelector('.nav-link[href="#home"]').classList.add('active-nav');

// minor hamburger animation class toggle (styling optional)
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
    });
}