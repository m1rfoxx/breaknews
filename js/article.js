/**
 * BreakNews - Функционал страницы статьи
 */

document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры из URL для определения текущей статьи
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    // В реальном проекте здесь был бы запрос к API за данными статьи
    console.log(`Загружена статья с ID: ${articleId}`);
    
    // Инициализация комментариев
    initComments();
    
    // Инициализация формы комментариев
    initCommentForm();
    
    // Инициализация кнопок "поделиться"
    initSharingButtons();
    
    // Инициализация кнопки "загрузить больше комментариев"
    initLoadMoreComments();
});

/**
 * Инициализация комментариев
 */
function initComments() {
    // Обработчики для кнопок "ответить"
    const replyButtons = document.querySelectorAll('.comment__reply-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const comment = this.closest('.comment');
            
            // Проверяем, есть ли уже форма ответа
            let replyForm = comment.querySelector('.reply-form');
            
            if (replyForm) {
                // Если форма уже есть, удаляем ее
                replyForm.remove();
            } else {
                // Создаем форму ответа
                replyForm = document.createElement('div');
                replyForm.className = 'reply-form';
                replyForm.innerHTML = `
                    <form class="comment-form comment-form--reply">
                        <div class="comment-form__group">
                            <textarea placeholder="Введите ваш ответ" rows="3" required></textarea>
                        </div>
                        <div class="comment-form__actions">
                            <button type="submit" class="btn btn--primary btn--sm">Отправить</button>
                            <button type="button" class="btn btn--outline btn--sm cancel-reply-btn">Отмена</button>
                        </div>
                    </form>
                `;
                
                // Вставляем форму после кнопок действий
                this.parentElement.after(replyForm);
                
                // Фокусируемся на textarea
                replyForm.querySelector('textarea').focus();
                
                // Обработчик отмены ответа
                replyForm.querySelector('.cancel-reply-btn').addEventListener('click', function() {
                    replyForm.remove();
                });
                
                // Обработчик отправки формы ответа
                replyForm.querySelector('form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const textarea = this.querySelector('textarea');
                    const replyText = textarea.value.trim();
                    
                    if (replyText) {
                        // В реальном проекте здесь был бы AJAX-запрос для сохранения ответа
                        showNotification('Ваш ответ успешно отправлен. После модерации он появится на сайте.', 'success');
                        replyForm.remove();
                    }
                });
            }
        });
    });
    
    // Обработчики для кнопок голосования
    const voteButtons = document.querySelectorAll('.comment__vote');
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isUpvote = this.classList.contains('comment__vote--up');
            const countSpan = this.querySelector('span');
            const currentCount = parseInt(countSpan.textContent, 10);
            
            // Проверяем, активна ли уже кнопка
            if (this.classList.contains('active')) {
                // Снимаем голос
                this.classList.remove('active');
                countSpan.textContent = isUpvote ? currentCount - 1 : currentCount - 1;
            } else {
                // Удаляем активный класс с противоположной кнопки
                const commentActions = this.closest('.comment__rating');
                const oppositeButton = isUpvote 
                    ? commentActions.querySelector('.comment__vote--down')
                    : commentActions.querySelector('.comment__vote--up');
                
                if (oppositeButton && oppositeButton.classList.contains('active')) {
                    oppositeButton.classList.remove('active');
                    const oppositeCountSpan = oppositeButton.querySelector('span');
                    const oppositeCount = parseInt(oppositeCountSpan.textContent, 10);
                    oppositeCountSpan.textContent = oppositeCount - 1;
                }
                
                // Добавляем голос
                this.classList.add('active');
                countSpan.textContent = currentCount + 1;
            }
        });
    });
}

/**
 * Инициализация формы комментариев
 */
function initCommentForm() {
    const commentForm = document.querySelector('.comments__form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверяем, заполнены ли поля
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const textArea = this.querySelector('textarea');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const comment = textArea.value.trim();
            
            if (name && email && comment) {
                // В реальном проекте здесь был бы AJAX-запрос для сохранения комментария
                
                // Очищаем форму
                nameInput.value = '';
                emailInput.value = '';
                textArea.value = '';
                
                // Показываем уведомление
                showNotification('Ваш комментарий успешно отправлен. После модерации он появится на сайте.', 'success');
            } else {
                // Показываем сообщение об ошибке
                showNotification('Пожалуйста, заполните все поля формы', 'error');
            }
        });
    }
}

/**
 * Инициализация кнопок "поделиться"
 */
function initSharingButtons() {
    const shareButtons = document.querySelectorAll('.article__share-link');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем данные для шеринга
            const title = document.querySelector('.article__title').textContent;
            const url = window.location.href;
            
            // Определяем социальную сеть по иконке
            const socialIcon = this.querySelector('i');
            let shareUrl = '';
            
            if (socialIcon.classList.contains('fa-vk')) {
                shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            } else if (socialIcon.classList.contains('fa-telegram')) {
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            } else if (socialIcon.classList.contains('fa-twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            } else if (socialIcon.classList.contains('fa-facebook-f')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            }
            
            // Открываем окно для шеринга
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Добавляем возможность копирования ссылки на статью
    if (navigator.clipboard) {
        const shareSection = document.querySelector('.article__share');
        if (shareSection) {
            const copyButton = document.createElement('button');
            copyButton.className = 'article__share-link article__share-link--copy';
            copyButton.setAttribute('aria-label', 'Копировать ссылку');
            copyButton.innerHTML = '<i class="fas fa-link"></i>';
            
            shareSection.appendChild(copyButton);
            
            copyButton.addEventListener('click', function() {
                // Копируем ссылку в буфер обмена
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        showNotification('Ссылка скопирована в буфер обмена', 'success');
                    })
                    .catch(err => {
                        console.error('Не удалось скопировать ссылку: ', err);
                        showNotification('Не удалось скопировать ссылку', 'error');
                    });
            });
        }
    }
}

/**
 * Инициализация кнопки "загрузить больше комментариев"
 */
function initLoadMoreComments() {
    const loadMoreBtn = document.querySelector('.comments__more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Имитация загрузки (в реальном проекте здесь был бы AJAX-запрос)
            this.textContent = 'Загрузка...';
            this.disabled = true;
            
            // Имитация задержки загрузки
            setTimeout(() => {
                // После загрузки
                this.textContent = 'Загрузить больше комментариев';
                this.disabled = false;
                
                // Имитация загрузки дополнительных комментариев
                const commentsList = document.querySelector('.comments__list');
                const commentTemplate = `
                    <div class="comment">
                        <div class="comment__avatar">
                            <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="Аватар">
                        </div>
                        <div class="comment__content">
                            <div class="comment__header">
                                <h4 class="comment__author">Иван Сергеев</h4>
                                <span class="comment__date">20 июля 2025, 12:10</span>
                            </div>
                            <div class="comment__text">
                                <p>Очень информативная статья. Хотелось бы больше таких материалов на вашем сайте.</p>
                            </div>
                            <div class="comment__actions">
                                <button class="comment__reply-btn">Ответить</button>
                                <div class="comment__rating">
                                    <button class="comment__vote comment__vote--up"><i class="fas fa-thumbs-up"></i> <span>7</span></button>
                                    <button class="comment__vote comment__vote--down"><i class="fas fa-thumbs-down"></i> <span>1</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Вставляем шаблон перед кнопкой "загрузить больше"
                const commentsMoreDiv = document.querySelector('.comments__more');
                commentsMoreDiv.insertAdjacentHTML('beforebegin', commentTemplate);
                
                // Обновляем обработчики для новых элементов
                initComments();
                
                // Обновляем счетчик комментариев
                const commentsCount = document.querySelector('.comments__count');
                if (commentsCount) {
                    commentsCount.textContent = parseInt(commentsCount.textContent, 10) + 1;
                }
                
                // Показываем уведомление
                showNotification('Загружены дополнительные комментарии', 'info');
            }, 1500);
        });
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