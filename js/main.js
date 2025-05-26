// Функции для работы со страницами
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMobileMenu();
    initAccordion();
    initServiceTabs();
    initBookingForm();
    initContactForm();
});

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    if (!menuToggle) return;
    
    // Создаем оверлей для мобильного меню
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);
    
    // Создаем мобильное меню
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Клонируем навигацию из хедера
    const nav = document.querySelector('.nav');
    
    if (nav) {
        const navClone = nav.cloneNode(true);
        navClone.className = 'mobile-menu__nav';
        
        const navListClone = navClone.querySelector('.nav__list');
        navListClone.className = 'mobile-menu__list';
        
        const navItems = navListClone.querySelectorAll('.nav__item');
        navItems.forEach(item => {
            item.className = 'mobile-menu__item';
            const link = item.querySelector('.nav__link');
            link.className = 'mobile-menu__link' + (link.classList.contains('active') ? ' active' : '');
        });
        
        mobileMenu.appendChild(navClone);
    }
    
    // Добавляем телефон
    const phone = document.querySelector('.header__phone');
    
    if (phone) {
        const phoneClone = phone.cloneNode(true);
        phoneClone.className = 'mobile-menu__phone';
        mobileMenu.appendChild(phoneClone);
    }
    
    // Добавляем социальные сети
    const socialDiv = document.createElement('div');
    socialDiv.className = 'mobile-menu__social';
    
    const socialIcons = [
        { icon: 'fab fa-vk', url: '#' },
        { icon: 'fab fa-instagram', url: '#' },
        { icon: 'fab fa-telegram', url: '#' }
    ];
    
    socialIcons.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        
        const icon = document.createElement('i');
        icon.className = social.icon;
        
        link.appendChild(icon);
        socialDiv.appendChild(link);
    });
    
    mobileMenu.appendChild(socialDiv);
    
    // Добавляем кнопку закрытия
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu__close';
    closeBtn.setAttribute('aria-label', 'Закрыть меню');
    mobileMenu.appendChild(closeBtn);
    
    // Добавляем мобильное меню в body
    body.appendChild(mobileMenu);
    
    // Обработчики событий
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.add('active');
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    // Закрытие при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Аккордеон для FAQ
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    if (!accordionItems.length) return;
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        
        header.addEventListener('click', function() {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                return;
            }
            
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            item.classList.add('active');
        });
    });
}

// Фильтрация услуг по категориям
function initServiceTabs() {
    const tabs = document.querySelectorAll('.service-tab');
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (!tabs.length || !serviceItems.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            serviceItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Форма бронирования
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    const newBookingBtn = document.getElementById('newBookingBtn');
    
    if (!bookingForm || !bookingSuccess) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(bookingForm)) {
            return;
        }
        
        bookingSuccess.classList.add('active');
        bookingForm.reset();
    });
    
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', function() {
            bookingSuccess.classList.remove('active');
        });
    }
}

// Контактная форма
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(contactForm)) {
            return;
        }
        
        contactForm.reset();
        alert('Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
    });
}

// Валидация формы
function validateForm(form) {
    let isValid = true;
    
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.classList.remove('error');
        
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        }
        
        if (field.type === 'tel' && field.value.trim()) {
            const phonePattern = /^\+375\s?\(?(25|29|33|44)\)?\s?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
            if (!phonePattern.test(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        }
        
        if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}
const form = document.getElementById("booking-form");
  const statusMessage = document.getElementById("form-status");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusMessage.textContent = "Спасибо! Ваша заявка принята.";
      statusMessage.style.color = "green";
      form.reset();
    } else {
      const result = await response.json();
      if (result.errors) {
        statusMessage.textContent = result.errors.map(error => error.message).join(", ");
      } else {
        statusMessage.textContent = "Произошла ошибка при отправке формы.";
      }
      statusMessage.style.color = "red";
    }
  }

  form.addEventListener("submit", handleSubmit);
