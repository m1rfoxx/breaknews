/**
 * BreakNews - Функционал страницы авторизации/регистрации
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация табов
    initAuthTabs();
    
    // Инициализация переключателей видимости пароля
    initPasswordToggles();
    
    // Инициализация валидации формы входа
    initLoginFormValidation();
    
    // Инициализация валидации формы регистрации
    initRegisterFormValidation();
});

/**
 * Инициализация табов
 */
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth__tab');
    const forms = document.querySelectorAll('.auth__form-wrapper');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Получаем ID формы, которую нужно показать
            const tabId = this.getAttribute('data-tab');
            const targetForm = document.getElementById(`${tabId}-form`);
            
            // Убираем активные классы у всех табов и форм
            tabs.forEach(t => t.classList.remove('auth__tab--active'));
            forms.forEach(f => f.classList.remove('auth__form-wrapper--active'));
            
            // Устанавливаем активный класс для выбранного таба и формы
            this.classList.add('auth__tab--active');
            targetForm.classList.add('auth__form-wrapper--active');
        });
    });
}

/**
 * Инициализация переключателей видимости пароля
 */
function initPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordField = this.closest('.password-field').querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

/**
 * Инициализация валидации формы входа
 */
function initLoginFormValidation() {
    const loginForm = document.querySelector('#login-form form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Валидация email
            const emailInput = document.getElementById('login-email');
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
            
            // Валидация пароля
            const passwordInput = document.getElementById('login-password');
            const passwordError = passwordInput.closest('.password-field').nextElementSibling;
            
            if (!passwordInput.value.trim()) {
                passwordError.textContent = 'Пожалуйста, введите пароль';
                isValid = false;
            } else {
                passwordError.textContent = '';
            }
            
            // Если форма валидна, отправляем данные
            if (isValid) {
                // В реальном проекте здесь был бы AJAX-запрос для авторизации
                
                // После успешной авторизации перенаправляем на главную страницу
                // window.location.href = 'index.html';
                
                // Для имитации успешной авторизации
                showNotification('Вы успешно вошли в систему', 'success');
                
                // Очищаем форму
                this.reset();
            }
        });
    }
}

/**
 * Инициализация валидации формы регистрации
 */
function initRegisterFormValidation() {
    const registerForm = document.querySelector('#register-form form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Валидация имени
            const nameInput = document.getElementById('register-name');
            const nameError = nameInput.nextElementSibling;
            
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Пожалуйста, введите ваше имя';
                isValid = false;
            } else {
                nameError.textContent = '';
            }
            
            // Валидация email
            const emailInput = document.getElementById('register-email');
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
            
            // Валидация пароля
            const passwordInput = document.getElementById('register-password');
            const passwordError = passwordInput.closest('.password-field').nextElementSibling;
            
            if (!passwordInput.value.trim()) {
                passwordError.textContent = 'Пожалуйста, введите пароль';
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = 'Пароль должен содержать не менее 6 символов';
                isValid = false;
            } else {
                passwordError.textContent = '';
            }
            
            // Валидация подтверждения пароля
            const confirmPasswordInput = document.getElementById('register-password-confirm');
            const confirmPasswordError = confirmPasswordInput.closest('.password-field').nextElementSibling;
            
            if (!confirmPasswordInput.value.trim()) {
                confirmPasswordError.textContent = 'Пожалуйста, подтвердите пароль';
                isValid = false;
            } else if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordError.textContent = 'Пароли не совпадают';
                isValid = false;
            } else {
                confirmPasswordError.textContent = '';
            }
            
            // Валидация согласия с условиями
            const agreeTermsCheckbox = document.getElementById('agree-terms');
            const agreeTermsError = agreeTermsCheckbox.closest('.checkbox').nextElementSibling;
            
            if (!agreeTermsCheckbox.checked) {
                agreeTermsError.textContent = 'Необходимо принять условия использования';
                isValid = false;
            } else {
                agreeTermsError.textContent = '';
            }
            
            // Если форма валидна, отправляем данные
            if (isValid) {
                // В реальном проекте здесь был бы AJAX-запрос для регистрации
                
                // После успешной регистрации показываем уведомление и перенаправляем на страницу входа
                showNotification('Вы успешно зарегистрировались', 'success');
                
                // Очищаем форму
                this.reset();
                
                // Переключаемся на таб входа
                document.querySelector('[data-tab="login"]').click();
            }
        });
    }
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