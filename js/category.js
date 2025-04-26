/**
 * BreakNews - Функционал страницы категории
 */

document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры из URL для определения текущей категории
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // Устанавливаем заголовок и хлебные крошки в зависимости от категории
    setCategoryInfo(category);
    
    // Инициализация фильтра и сортировки
    initFiltering();
    
    // Инициализация пагинации
    initPagination();
});

/**
 * Устанавливает информацию о категории на странице
 * @param {string} category - Идентификатор категории
 */
function setCategoryInfo(category) {
    const categoryTitleElement = document.getElementById('category-title');
    const categoryBreadcrumbElement = document.getElementById('category-breadcrumb');
    
    // Определяем название категории
    let categoryName = 'Все новости';
    
    switch (category) {
        case 'politics':
            categoryName = 'Политика';
            document.title = 'BreakNews - Политика';
            break;
        case 'tech':
            categoryName = 'Технологии';
            document.title = 'BreakNews - Технологии';
            break;
        case 'sport':
            categoryName = 'Спорт';
            document.title = 'BreakNews - Спорт';
            break;
        case 'economics':
            categoryName = 'Экономика';
            document.title = 'BreakNews - Экономика';
            break;
        case 'culture':
            categoryName = 'Культура';
            document.title = 'BreakNews - Культура';
            break;
        case 'health':
            categoryName = 'Здоровье';
            document.title = 'BreakNews - Здоровье';
            break;
        default:
            document.title = 'BreakNews - Категория новостей';
    }
    
    // Устанавливаем заголовок и хлебные крошки
    if (categoryTitleElement) {
        categoryTitleElement.textContent = categoryName;
    }
    
    if (categoryBreadcrumbElement) {
        categoryBreadcrumbElement.textContent = categoryName;
    }
    
    // Активируем соответствующий пункт в боковом меню
    highlightActiveCategory(category);
}

/**
 * Подсвечивает активную категорию в боковом меню
 * @param {string} category - Идентификатор категории
 */
function highlightActiveCategory(category) {
    // Сначала удаляем класс активности у всех пунктов
    const categoryItems = document.querySelectorAll('.categories-list__item');
    categoryItems.forEach(item => {
        item.classList.remove('categories-list__item--active');
    });
    
    // Находим пункт с соответствующей категорией и делаем его активным
    if (category) {
        const activeItem = document.querySelector(`.categories-list__item a[href*="category=${category}"]`);
        if (activeItem && activeItem.parentElement) {
            activeItem.parentElement.classList.add('categories-list__item--active');
        }
    }
}

/**
 * Инициализация фильтрации и сортировки
 */
function initFiltering() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // В реальном проекте здесь был бы запрос на сервер для получения отсортированных данных
            // В этом примере мы просто имитируем перезагрузку контента
            
            const sortValue = this.value;
            console.log(`Сортировка изменена на: ${sortValue}`);
            
            // Пример уведомления
            let sortLabel = 'сначала новые';
            switch (sortValue) {
                case 'date-asc':
                    sortLabel = 'сначала старые';
                    break;
                case 'popular':
                    sortLabel = 'по популярности';
                    break;
            }
            
            showSortingFeedback(sortLabel);
        });
    }
    
    // Инициализация формы поиска
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input');
            const searchQuery = searchInput.value.trim();
            
            if (searchQuery) {
                // В реальном проекте здесь был бы поиск по API
                console.log(`Поиск: ${searchQuery}`);
                showSearchFeedback(searchQuery);
            }
        });
    }
}

/**
 * Показать уведомление о сортировке
 * @param {string} sortLabel - Метка сортировки
 */
function showSortingFeedback(sortLabel) {
    // Здесь можно было бы показать индикатор загрузки
    // А после получения данных обновить контент
    
    // Пример обратной связи
    const newsGrid = document.querySelector('.news-grid--category');
    if (newsGrid) {
        newsGrid.style.opacity = '0.6';
        
        setTimeout(() => {
            newsGrid.style.opacity = '1';
            showNotification(`Новости отсортированы: ${sortLabel}`, 'info');
        }, 800);
    }
}

/**
 * Показать уведомление о поиске
 * @param {string} query - Поисковый запрос
 */
function showSearchFeedback(query) {
    // Здесь можно было бы показать индикатор загрузки
    // А после получения данных обновить контент
    
    // Пример обратной связи
    const newsGrid = document.querySelector('.news-grid--category');
    if (newsGrid) {
        newsGrid.style.opacity = '0.6';
        
        setTimeout(() => {
            newsGrid.style.opacity = '1';
            showNotification(`Результаты поиска для: "${query}"`, 'info');
        }, 800);
    }
}

/**
 * Инициализация пагинации
 */
function initPagination() {
    const paginationPages = document.querySelectorAll('.pagination__page');
    const prevArrow = document.querySelector('.pagination__arrow--prev');
    const nextArrow = document.querySelector('.pagination__arrow--next');
    
    // Обработчики для кнопок страниц
    paginationPages.forEach(page => {
        page.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех страниц
            paginationPages.forEach(p => p.classList.remove('pagination__page--active'));
            
            // Устанавливаем активный класс для выбранной страницы
            this.classList.add('pagination__page--active');
            
            // Обновляем состояние стрелок пагинации
            updatePaginationArrows();
            
            // Имитация загрузки страницы
            simulatePageLoad(this.textContent);
        });
    });
    
    // Обработчики для стрелок
    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            if (!this.disabled) {
                const activePage = document.querySelector('.pagination__page--active');
                const prevPage = activePage.previousElementSibling;
                if (prevPage && prevPage.classList.contains('pagination__page')) {
                    prevPage.click();
                }
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            if (!this.disabled) {
                const activePage = document.querySelector('.pagination__page--active');
                const nextPage = activePage.nextElementSibling;
                if (nextPage && nextPage.classList.contains('pagination__page')) {
                    nextPage.click();
                }
            }
        });
    }
    
    // Инициализация состояния стрелок
    updatePaginationArrows();
}

/**
 * Обновляет состояние стрелок пагинации
 */
function updatePaginationArrows() {
    const activePage = document.querySelector('.pagination__page--active');
    const prevArrow = document.querySelector('.pagination__arrow--prev');
    const nextArrow = document.querySelector('.pagination__arrow--next');
    
    if (activePage) {
        const isFirstPage = !activePage.previousElementSibling || 
                          !activePage.previousElementSibling.classList.contains('pagination__page');
        
        const isLastPage = !activePage.nextElementSibling || 
                         !activePage.nextElementSibling.classList.contains('pagination__page');
        
        if (prevArrow) {
            prevArrow.disabled = isFirstPage;
        }
        
        if (nextArrow) {
            nextArrow.disabled = isLastPage;
        }
    }
}

/**
 * Имитирует загрузку страницы пагинации
 * @param {string} pageNumber - Номер страницы
 */
function simulatePageLoad(pageNumber) {
    const newsGrid = document.querySelector('.news-grid--category');
    if (newsGrid) {
        // Имитация загрузки
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        newsGrid.style.opacity = '0.6';
        
        setTimeout(() => {
            newsGrid.style.opacity = '1';
            showNotification(`Загружена страница ${pageNumber}`, 'info');
            
            // В реальном проекте здесь бы обновлялся контент на странице
        }, 800);
    }
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