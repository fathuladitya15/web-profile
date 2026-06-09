// AOS
AOS.init({
    duration: 1000,
    once: true
});

// Scroll Top
const scrollBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {

    if(window.scrollY > 300){
        scrollBtn.classList.add('show');
    }else{
        scrollBtn.classList.remove('show');
    }

});

scrollBtn.addEventListener('click', () => {

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

});

// Active Menu
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(pageYOffset >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});

new Swiper(".skillSwiper", {

    loop: true,

    speed: 4000,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    freeMode: true,

    grabCursor: true,

    slidesPerView: 2,

    spaceBetween: 20,

    breakpoints: {

        576: {
            slidesPerView: 3
        },

        768: {
            slidesPerView: 4
        },

        992: {
            slidesPerView: 5
        },

        1200: {
            slidesPerView: 6
        }
    }

});


document.addEventListener('DOMContentLoaded', function () {

    new Typed('.typing-text', {
        strings: [
            'Fullstack Developer',
            'Laravel Specialist',
            'API Engineer',
            'Cloud & VPS Engineer'
        ],
        typeSpeed: 80,
        backSpeed: 40,
        loop: true
    });

});