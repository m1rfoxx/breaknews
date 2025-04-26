/**
 * BreakNews - Функционал мобильного меню
 */

document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления мобильным меню
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
    const overlay = document.querySelector('.overlay');
    
    // Обработчик открытия мобильного меню
    burgerMenu.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
        burgerMenu.classList.add('active');
    });
    
    // Обработчик закрытия мобильного меню
    const closeMenu = function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Разрешаем прокрутку страницы
        burgerMenu.classList.remove('active');
    };
    
    mobileMenuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Закрываем меню при нажатии клавиши Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Закрываем меню при изменении размера окна (если меню открыто и ширина экрана больше 768px)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});