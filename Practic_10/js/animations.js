// Анимации, запускаемые событиями пользователя

// Событие 1: наведение мыши на карточку игры
document.querySelectorAll('.box').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('card-hover');
    });

    // Событие 2: уход мыши с карточки
    card.addEventListener('mouseleave', () => {
        card.classList.remove('card-hover');
    });
});

// Событие 3: нажатие на кнопку «Играть»
document.querySelectorAll('.btn_play').forEach(button => {
    button.addEventListener('click', event => {
        const card = event.currentTarget.closest('.box');
        if (!card) return;

        card.classList.remove('play-click');
        // Перезапускаем CSS-анимацию при каждом нажатии
        void card.offsetWidth;
        card.classList.add('play-click');
    });
});

// Событие 4: прокрутка страницы — плавное появление рядов с играми
const gameRows = document.querySelectorAll('.counter');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('row-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    gameRows.forEach(row => observer.observe(row));
} else {
    gameRows.forEach(row => row.classList.add('row-visible'));
}
