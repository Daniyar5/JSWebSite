// Анимации для карточек, в том числе созданных динамически из JSON.

// События 1 и 2: наведение мыши и уход с карточки.
document.addEventListener('mouseover', event => {
    const card = event.target.closest('.box');
    if (card && !card.contains(event.relatedTarget)) {
        card.classList.add('card-hover');
    }
});

document.addEventListener('mouseout', event => {
    const card = event.target.closest('.box');
    if (card && !card.contains(event.relatedTarget)) {
        card.classList.remove('card-hover');
    }
});

// Событие 3: нажатие на кнопку «Играть».
document.addEventListener('click', event => {
    const button = event.target.closest('.btn_play');
    if (!button) return;

    const card = button.closest('.box');
    if (!card) return;

    card.classList.remove('play-click');
    void card.offsetWidth;
    card.classList.add('play-click');
});

// Событие 4: появление рядов при прокрутке.
// Наблюдатель запускается после того, как games.js создал карточки.
const rowsObserver = new MutationObserver(() => {
    document.querySelectorAll('.games-list .counter:not([data-observed])').forEach(row => {
        row.dataset.observed = 'true';
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('row-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            observer.observe(row);
        } else {
            row.classList.add('row-visible');
        }
    });
});

const gamesContainer = document.querySelector('.games-list');
if (gamesContainer) {
    rowsObserver.observe(gamesContainer, { childList: true });
}
