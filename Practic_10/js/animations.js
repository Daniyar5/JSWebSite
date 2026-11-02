document.querySelectorAll('.box').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('card-hover');
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('card-hover');
    });
});

document.querySelectorAll('.btn_play').forEach(button => {
    button.addEventListener('click', event => {
        const card = event.currentTarget.closest('.box');
        if (!card) return;

        card.classList.remove('play-click');
        void card.offsetWidth;
        card.classList.add('play-click');
    });
});

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
