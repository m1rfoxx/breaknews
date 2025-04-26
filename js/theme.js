/**
 * BreakNews - Функционал переключения темы
 */

document.addEventListener('DOMContentLoaded', function() {
    // Элементы переключения темы
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Проверяем, сохранена ли тема в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Устанавливаем тему из localStorage или используем системные настройки
    if (savedTheme) {
        document.body.className = savedTheme;
    } else {
        // Проверяем системные настройки темы
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.className = 'dark-theme';
        } else {
            document.body.className = 'light-theme';
        }
    }
    
    // Обработчик клика на кнопку переключения темы
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            if (document.body.classList.contains('light-theme')) {
                document.body.className = 'dark-theme';
                localStorage.setItem('theme', 'dark-theme');
            } else {
                document.body.className = 'light-theme';
                localStorage.setItem('theme', 'light-theme');
            }
        });
    });
});