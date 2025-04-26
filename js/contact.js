/**
 * BreakNews - Функционал страницы контактов
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация формы обратной связи
    initContactForm();
    
    // Инициализация FAQ
    initFaq();
});

/**
 * Инициализация формы обратной связи
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Валидация имени
            const nameInput = document.getElementById('name');
            const nameError = nameInput.nextElementSibling;
            
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Пожалуйста, введите ваше имя';
                isValid = false;
            } else {
                nameError.textContent = '';
            }
            
            // Валидация email
            const emailInput = document.getElementById('email');
            const emailError = emailInput.nextElementSibling;
            
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Пожалуйста, введите email';
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                emailError.textContent = 'Пожалуйста, введите корректный email';
                isValid = false;
            } else {
                emailError.textContent = '';
            }
            
            // Валидация темы
            const subjectInput = document.getElementById('subject');
            const subjectError = subjectInput.nextElementSibling;
            
            if (!subjectInput.value.trim()) {
                subjectError.textContent = 'Пожалуйста, введите тему сообщения';
                isValid = false;
            } else {
                subjectError.textContent = '';
            }
            
            // Валидация сообщения
            const messageInput = document.getElementById('message');
            const messageError = messageInput.nextElementSibling;
            
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Пожалуйста, введите сообщение';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Сообщение должно содержать не менее 10 символов';
                isValid = false;
            } else {
                messageError.textContent = '';
            }
            
            // Валидация согласия с политикой конфиденциальности
            const agreePrivacyCheckbox = document.getElementById('agree-privacy');
            const agreePrivacyError = agreePrivacyCheckbox.closest('.checkbox').nextElementSibling;
            
            if (!agreePrivacyCheckbox.checked) {
                agreePrivacyError.textContent = 'Необходимо принять политику конфиденциальности';
                isValid = false;
            } else {
                agreePrivacyError.textContent = '';
            }
            
            // Если форма валидна, отправляем данные
            if (isValid) {
                // В реальном проекте здесь был бы AJAX-запрос для отправки сообщения
                
                // Показываем уведомление
                showNotification('Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.', 'success');
                
                // Очищаем форму
                this.reset();
            }
        });
    }
}

/**
 * Инициализация FAQ
 */
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Проверяем, активен ли элемент
            const isActive = item.classList.contains('active');
            
            // Закрываем все элементы
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Если элемент не был активен, делаем его активным
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Валидация email
 * @param {string} email - Email для проверки
 * @returns {boolean} - Результат валидации
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/**
 * Показать уведомление
 * @param {string} message - Текст уведомления
 * @param {string} type - Тип уведомления (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Проверяем, есть ли уже контейнер для уведомлений
    let notificationsContainer = document.querySelector('.notifications-container');
    
    if (!notificationsContainer) {
        // Создаем контейнер, если его нет
        notificationsContainer = document.createElement('div');
        notificationsContainer.className = 'notifications-container';
        document.body.appendChild(notificationsContainer);
        
        // Добавляем стили для контейнера, если они не добавлены
        const style = document.createElement('style');
        style.textContent = `
            .notifications-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
            }
            
            .notification {
                background-color: white;
                border-radius: 4px;
                padding: 12px 16px;
                margin-bottom: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                transform: translateX(100%);
                opacity: 0;
                transition: transform 0.3s, opacity 0.3s;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .notification--active {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification--success {
                border-left: 4px solid var(--success-color);
            }
            
            .notification--error {
                border-left: 4px solid var(--error-color);
            }
            
            .notification--info {
                border-left: 4px solid var(--primary-color);
            }
            
            .notification__close {
                border: none;
                background: none;
                cursor: pointer;
                color: var(--text-tertiary);
                margin-left: 8px;
                font-size: 16px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification__close">&times;</button>
    `;
    
    // Добавляем в контейнер
    notificationsContainer.appendChild(notification);
    
    // Показываем уведомление (для анимации)
    setTimeout(() => {
        notification.classList.add('notification--active');
    }, 10);
    
    // Настраиваем закрытие уведомления
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

/**
 * Закрыть уведомление
 * @param {HTMLElement} notification - Элемент уведомления
 */
function closeNotification(notification) {
    notification.classList.remove('notification--active');
    
    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}