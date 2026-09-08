/**
 * MUHAMMAD FATHUL ADITYA - PROFESSIONAL PORTFOLIO INTERACTIVITY
 * High-performance, clean vanilla JS with AOS, Typed.js, and SweetAlert2
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });
    }

    // 2. Initialize Dynamic Typing Effect
    const typedTarget = document.getElementById('typedElement');
    if (typedTarget && typeof Typed !== 'undefined') {
        new Typed('#typedElement', {
            strings: [
                'Enterprise Fullstack Solutions',
                'Smart HRM & Automated Payroll',
                'High-Concurrency RESTful APIs',
                'Cloud Architecture & Linux VPS',
                'IoT & Bluetooth Hardware Bridges'
            ],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 2000,
            startDelay: 400,
            loop: true,
            smartBackspace: true
        });
    }

    // 3. Navbar Sticky Effect on Scroll
    const navbar = document.getElementById('mainNavbar');
    const handleNavbarScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // 4. Hash-Based & Scroll-Synced Active Navigation
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-link-custom'));
    const navbarCollapse = document.getElementById('navbarContent');
    let isUserClickingLink = false;
    let clickScrollTimer = null;

    /**
     * Set active class on the nav link matching the given hash (#home, #tentang, etc.)
     */
    function setActiveNavByHash(targetHash) {
        if (!targetHash) targetHash = '#home';
        if (!targetHash.startsWith('#')) targetHash = `#${targetHash}`;

        let matched = false;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === targetHash) {
                link.classList.add('active');
                matched = true;
            } else {
                link.classList.remove('active');
            }
        });

        if (!matched && navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }
    }

    /**
     * Determine which section is currently active based on scroll position
     * and synchronize active nav-link and URL hash
     */
    function syncActiveNavWithScroll() {
        if (isUserClickingLink) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Bottom of page -> activate last section (#contact)
        if (scrollY + windowHeight >= documentHeight - 60) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                const hash = `#${lastSection.id}`;
                setActiveNavByHash(hash);
                if (window.location.hash !== hash) {
                    history.replaceState(null, null, hash);
                }
            }
            return;
        }

        // Top of page -> activate #home
        if (scrollY < 80) {
            setActiveNavByHash('#home');
            if (window.location.hash && window.location.hash !== '#home') {
                history.replaceState(null, null, '#home');
            }
            return;
        }

        // Find which section is currently within the active threshold
        let currentSectionId = 'home';
        const scrollCheckPosition = scrollY + 160;

        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            const top = sec.offsetTop;
            const height = sec.offsetHeight;

            if (scrollCheckPosition >= top && scrollCheckPosition < top + height) {
                currentSectionId = sec.id;
                break;
            }
        }

        const activeHash = `#${currentSectionId}`;
        setActiveNavByHash(activeHash);

        if (window.location.hash !== activeHash) {
            history.replaceState(null, null, activeHash);
        }
    }

    // Smooth scroll and immediate active update when clicking internal hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.length <= 1) return;

            const targetSection = document.querySelector(href);
            if (targetSection) {
                e.preventDefault();
                isUserClickingLink = true;

                // Immediately set active on clicked nav item
                setActiveNavByHash(href);
                history.replaceState(null, null, href);

                // Calculate scroll position taking navbar height into account
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - navHeight + 2;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navbarCollapse && window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }

                // Unlock scroll spy after smooth scroll finishes
                clearTimeout(clickScrollTimer);
                clickScrollTimer = setTimeout(() => {
                    isUserClickingLink = false;
                    syncActiveNavWithScroll();
                }, 850);
            }
        });
    });

    // Listen to window scroll (throttled via requestAnimationFrame)
    let isScrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                syncActiveNavWithScroll();
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }, { passive: true });

    // Listen to hashchange event (back/forward browser navigation)
    window.addEventListener('hashchange', () => {
        if (window.location.hash) {
            setActiveNavByHash(window.location.hash);
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                const navHeight = navbar ? navbar.offsetHeight : 80;
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight + 2,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Check hash on initial load
    if (window.location.hash) {
        setActiveNavByHash(window.location.hash);
        setTimeout(() => {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                const navHeight = navbar ? navbar.offsetHeight : 80;
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight + 2,
                    behavior: 'smooth'
                });
            }
        }, 200);
    } else {
        syncActiveNavWithScroll();
    }

    // 6. Interactive Skill Filter Tabs
    const filterButtons = document.querySelectorAll('.skill-tab-btn');
    const skillBoxes = document.querySelectorAll('.skill-box-modern');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            skillBoxes.forEach(box => {
                const category = box.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    box.style.display = 'flex';
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });

    // 7. Copy Email to Clipboard Feature
    const btnCopyEmail = document.getElementById('btnCopyEmail');
    const textEmail = document.getElementById('textEmail');

    if (btnCopyEmail && textEmail) {
        btnCopyEmail.addEventListener('click', function () {
            const emailValue = textEmail.textContent.trim();
            navigator.clipboard.writeText(emailValue).then(() => {
                const originalHtml = btnCopyEmail.innerHTML;
                btnCopyEmail.innerHTML = '<i class="fas fa-check text-success"></i>';
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Email berhasil disalin!',
                        showConfirmButton: false,
                        timer: 2000,
                        background: '#0d1424',
                        color: '#f8fafc'
                    });
                }

                setTimeout(() => {
                    btnCopyEmail.innerHTML = originalHtml;
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // 8. Back to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Contact Form Submission Handling
    const contactForm = document.getElementById('kontakForm');
    const submitBtn = document.getElementById('btnSubmitForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('senderName').value.trim();
            const email = document.getElementById('senderEmail').value.trim();
            const subject = document.getElementById('senderSubject').value.trim();
            const message = document.getElementById('senderMessage').value.trim();

            if (!name || !email || !message) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Form Belum Lengkap',
                    text: 'Silakan isi nama, email, dan pesan Anda.',
                    background: '#0d1424',
                    color: '#f8fafc'
                });
                return;
            }

            // Disable submit button during processing
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
            }

            // Target backend endpoint
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const endpoint = isLocal ? 'send_email.php' : 'https://fathuladitya15.github.io/web-profile/send_email.php';

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', `[Subject: ${subject}]\n\n${message}`);

            fetch(endpoint, {
                method: 'POST',
                body: formData
            })
            .then(res => {
                if (res.ok) {
                    return res.text();
                }
                throw new Error('Network error or static host');
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Pesan Terkirim!',
                    text: 'Terima kasih telah menghubungi saya. Saya akan merespons secepatnya.',
                    background: '#0d1424',
                    color: '#f8fafc',
                    confirmButtonColor: '#3b82f6'
                });
                contactForm.reset();
            })
            .catch(error => {
                // If static hosting (e.g. GitHub pages) does not support PHP mailer:
                console.info('Contact fallback triggered:', error);
                Swal.fire({
                    title: 'Hubungi via WhatsApp / Email?',
                    html: `Pesan Anda sudah siap:<br><strong>"${name}"</strong> (${email})<br><br>Apakah Anda ingin meneruskan pesan ini langsung via WhatsApp atau membuka aplikasi email?`,
                    icon: 'question',
                    showCancelButton: true,
                    showDenyButton: true,
                    confirmButtonText: '<i class="fab fa-whatsapp"></i> Kirim via WhatsApp',
                    denyButtonText: '<i class="fas fa-envelope"></i> Kirim via Email Client',
                    cancelButtonText: 'Tutup',
                    confirmButtonColor: '#25d366',
                    denyButtonColor: '#3b82f6',
                    cancelButtonColor: '#64748b',
                    background: '#0d1424',
                    color: '#f8fafc'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const waText = encodeURIComponent(`Halo Fathul, saya ${name} (${email}).\nPerihal: ${subject}\n\nPesan:\n${message}`);
                        window.open(`https://wa.me/6289657476880?text=${waText}`, '_blank');
                    } else if (result.isDenied) {
                        const mailtoLink = `mailto:muhamadfathuladitya15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`)}`;
                        window.location.href = mailtoLink;
                    }
                });
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message Now';
                }
            });
        });
    }
});