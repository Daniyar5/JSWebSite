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

document.addEventListener('click', event => {
    const button = event.target.closest('.btn_play');
    if (!button) return;

    const card = button.closest('.box');
    if (!card) return;

    card.classList.remove('play-click');
    void card.offsetWidth;
    card.classList.add('play-click');
});

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
