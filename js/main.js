/**
 * BreakNews - Основной JavaScript файл
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация ленивой загрузки изображений
    lazyLoadImages();
    
    // Инициализация кнопки "Загрузить еще"
    initLoadMoreButton();
    
    // Инициализация формы подписки
    initSubscribeForm();
});

/**
 * Ленивая загрузка изображений
 */
function lazyLoadImages() {
    // Проверяем поддержку нативной ленивой загрузки
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает ленивую загрузку
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Браузер не поддерживает ленивую загрузку
        // Здесь можно добавить полифилл или альтернативную реализацию
    }
}

/**
 * Инициализация кнопки "Загрузить еще"
 */
function initLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Имитация загрузки (в реальном проекте здесь был бы AJAX-запрос)
            loadMoreBtn.textContent = 'Загрузка...';
            loadMoreBtn.disabled = true;
            
            // Имитация задержки загрузки
            setTimeout(function() {
                // После загрузки
                loadMoreBtn.textContent = 'Загрузить ещё';
                loadMoreBtn.disabled = false;
                
                // Здесь должен быть код для добавления новых новостей
                // В данном примере просто показываем уведомление
                showNotification('Загружено 6 новых новостей', 'success');
            }, 1500);
        });
    }
}

/**
 * Инициализация формы подписки
 */
function initSubscribeForm() {
    const subscribeForm = document.querySelector('.subscribe__form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Имитация отправки формы (в реальном проекте здесь был бы AJAX-запрос)
                emailInput.value = '';
                showNotification('Вы успешно подписались на нашу рассылку!', 'success');
            } else {
                showNotification('Пожалуйста, введите корректный email', 'error');
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
 * @param {string} type - Тип уведомления (success, error)
 */
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span>${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
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