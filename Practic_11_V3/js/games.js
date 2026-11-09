// Получаем исходный список игр из JSON.
// Все изменения существуют только в памяти страницы и не сохраняются.
async function getGames() {
    const response = await fetch('games.json');

    if (!response.ok) {
        throw new Error('Не удалось загрузить games.json');
    }

    return await response.json();
}

function renderGames(games) {
    const container = document.querySelector('#games-list');
    container.innerHTML = '';

    if (games.length === 0) {
        container.innerHTML = '<p class="empty-message">Пока игр нет. Добавьте игру в разделе «Управление играми».</p>';
        return;
    }

    for (let i = 0; i < games.length; i += 4) {
        const row = document.createElement('div');
        row.className = 'counter row-visible';

        games.slice(i, i + 4).forEach(game => {
            const card = document.createElement('div');
            card.className = 'box';

            const title = document.createElement('h2');
            title.className = 'game_title';
            title.textContent = game.title;

            const img = document.createElement('img');
            img.className = 'game_img';
            img.src = game.image;
            img.alt = game.title;

            const link = document.createElement('a');
            link.href = game.page || 'html/game.html';

            const button = document.createElement('button');
            button.className = 'btn_play';
            button.textContent = 'Играть';

            link.appendChild(button);
            card.append(title, img, link);
            row.appendChild(card);
        });

        container.appendChild(row);
    }
}

getGames()
    .then(renderGames)
    .catch(error => {
        console.error('Ошибка загрузки игр:', error);
        document.querySelector('#games-list').innerHTML =
            '<p class="empty-message">Не удалось загрузить игры. Запусти сайт через Live Server.</p>';
    });
