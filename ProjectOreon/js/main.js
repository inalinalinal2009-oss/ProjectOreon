// Основной JavaScript файл для сайта ДЖЕМ-Трейдинг

document.addEventListener('DOMContentLoaded', function() {
    
    // === 1. Управление шапкой при скролле ===
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Обновляем прогресс путешествия
        updateJourneyProgress();
    });
    
    // === 2. Анимация появления элементов при скролле ===
    const fadeElements = document.querySelectorAll('.fade-up');
    
    function checkFade() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.9) {
                el.classList.add('appear');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    checkFade();
    
    // === 3. ПУТЬ ГРУЗА: управление видимостью этапов ===
    const stages = document.querySelectorAll('.journey-stage');
    const steps = document.querySelectorAll('.step');
    const progressBar = document.getElementById('journeyProgress');
    
    function updateJourneyProgress() {
        let maxVisibleStage = 0;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        stages.forEach((stage, index) => {
            const rect = stage.getBoundingClientRect();
            const stageTop = rect.top + scrollY;
            const stageBottom = rect.bottom + scrollY;
            
            // Проверяем, виден ли этап
            if (rect.top < windowHeight * 0.7 && rect.bottom > 100) {
                stage.classList.add('visible');
                maxVisibleStage = Math.max(maxVisibleStage, index + 1);
            } else {
                stage.classList.remove('visible');
            }
            
            // Обновляем активный шаг
            if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.3) {
                steps.forEach((step, i) => {
                    if (i === index) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
            }
        });
        
        // Обновляем прогресс-бар
        const progress = (maxVisibleStage / stages.length) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Отмечаем пройденные шаги
        steps.forEach((step, index) => {
            if (index < maxVisibleStage) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
    }
    
    // Первоначальное обновление
    setTimeout(updateJourneyProgress, 100);
    
    // === 4. Модальное окно политики конфиденциальности ===
    const modal = document.getElementById('privacyModal');
    const privacyLink = document.getElementById('privacyPolicyLink');
    const closeBtn = document.querySelector('.modal-close');
    
    if (privacyLink && modal) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
    
    // === 5. Кнопки "Связаться" ===
    const contactButtons = [
        document.getElementById('headerContactBtn'),
        document.querySelector('.cta-button')
    ];
    
    contactButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    const form = document.querySelector('.contact-form');
                    if (form) {
                        form.style.transition = 'box-shadow 0.3s ease';
                        form.style.boxShadow = '0 0 0 3px rgba(42,109,244,0.3)';
                        setTimeout(() => {
                            form.style.boxShadow = 'none';
                        }, 1500);
                    }
                }
            });
        }
    });
    
    // === 6. Обработка формы ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Данные формы:', data);
            
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
            button.style.background = '#28a745';
            button.disabled = true;
            
            contactForm.reset();
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
            
            // Здесь можно добавить отправку на сервер
            // fetch('/api/send', { method: 'POST', body: formData })
        });
    }
    
    // === 7. Плавный скролл для навигации ===
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // === 8. Параллакс эффект для изображений ===
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // === 9. Обработка touch-устройств ===
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        const cards = document.querySelectorAll('[data-card]');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
    
    // === 10. Обновление года в копирайте ===
    const currentYear = new Date().getFullYear();
    const footerDate = document.querySelector('.footer-links span');
    if (footerDate && footerDate.textContent.includes('2025')) {
        footerDate.textContent = footerDate.textContent.replace('2025', currentYear);
    }
    
    console.log('Сайт ДЖЕМ-Трейдинг загружен! Отслеживаем путешествие груза...');
});