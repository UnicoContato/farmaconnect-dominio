const header = document.getElementById('main-header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

const revealElements = document.querySelectorAll('.reveal');

const revealFunc = () => {
    let windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
        let elementTop = el.getBoundingClientRect().top;
        let revealPoint = 50;
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealFunc);
window.addEventListener('load', revealFunc);

const modal = document.getElementById('privacy-modal');
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalOverlay = document.getElementById('modal-overlay');

openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

const hideModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

closeModal.addEventListener('click', hideModal);
closeModalBtn.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);