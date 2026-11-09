// CRUD без сохранения: после обновления страницы список снова загружается из games.json.
let games = [];
let editingId = null;

const form = document.querySelector('#game-form');
const nameInput = document.querySelector('#game-name');
const imageInput = document.querySelector('#game-image');
const pageInput = document.querySelector('#game-page');
const list = document.querySelector('#admin-games');
const count = document.querySelector('#games-count');
const message = document.querySelector('#message');

async function loadGames() {
    // admin.html находится в папке html, поэтому JSON лежит на уровень выше.
    const jsonPath = new URL('../games.json', window.location.href);
    const response = await fetch(jsonPath);

    if (!response.ok) {
        throw new Error(`Не удалось загрузить games.json: HTTP ${response.status}`);
    }

    games = await response.json();

    if (!Array.isArray(games)) {
        throw new Error('В games.json должен находиться массив игр.');
    }

    renderGames();
}

function renderGames() {
    list.innerHTML = '';
    count.textContent = `Всего игр: ${games.length}`;

    if (games.length === 0) {
        list.textContent = 'Список игр пуст.';
        return;
    }

    games.forEach(game => {
        const item = document.createElement('div');
        item.className = 'admin-game';

        const image = document.createElement('img');
        // Пути из games.json заданы относительно корня проекта.
        image.src = new URL('../' + game.image, window.location.href).href;
        image.alt = game.title;
        image.onerror = () => {
            image.alt = 'Изображение не найдено';
            image.style.display = 'none';
        };

        const info = document.createElement('div');
        info.className = 'admin-game-info';

        const title = document.createElement('h3');
        title.textContent = game.title;

        const path = document.createElement('p');
        path.textContent = `Изображение: ${game.image}`;

        info.append(title, path);

        const actions = document.createElement('div');
        actions.className = 'admin-game-actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Изменить';
        editButton.addEventListener('click', () => startEdit(game.id));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteGame(game.id));

        actions.append(editButton, deleteButton);
        item.append(image, info, actions);
        list.appendChild(item);
    });
}

// CREATE и UPDATE: изменения затрагивают только массив в памяти.
form.addEventListener('submit', event => {
    event.preventDefault();

    const title = nameInput.value.trim();
    const image = imageInput.value.trim();
    const page = pageInput.value.trim() || 'html/game.html';

    if (!title || !image) {
        message.textContent = 'Заполните название и путь к изображению.';
        return;
    }

    if (editingId === null) {
        const newId = games.length
            ? Math.max(...games.map(game => Number(game.id))) + 1
            : 1;

        games.push({ id: newId, title, image, page });
        message.textContent = 'Игра добавлена! (временно, до обновления страницы)';
    } else {
        const game = games.find(item => item.id === editingId);
        if (!game) return;

        game.title = title;
        game.image = image;
        game.page = page;
        message.textContent = 'Изменения применены! (временно, до обновления страницы)';
    }

    renderGames();
    resetForm();
});

function startEdit(id) {
    const game = games.find(item => item.id === id);
    if (!game) return;

    editingId = id;
    nameInput.value = game.title;
    imageInput.value = game.image;
    pageInput.value = game.page || '';
    document.querySelector('#form-title').textContent = 'Изменить игру';
    document.querySelector('#save-button').textContent = 'Сохранить';
    document.querySelector('#cancel-edit').hidden = false;
    nameInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// DELETE: удаляем игру только из массива в памяти.
function deleteGame(id) {
    const game = games.find(item => item.id === id);
    if (!game) return;

    if (!confirm(`Удалить игру «${game.title}»?`)) return;

    games = games.filter(item => item.id !== id);
    renderGames();

    if (editingId === id) resetForm();
    message.textContent = 'Игра удалена! (временно, до обновления страницы)';
}

function resetForm() {
    form.reset();
    editingId = null;
    document.querySelector('#form-title').textContent = 'Добавить игру';
    document.querySelector('#save-button').textContent = 'Добавить';
    document.querySelector('#cancel-edit').hidden = true;
}

document.querySelector('#cancel-edit').addEventListener('click', resetForm);

loadGames().catch(error => {
    console.error(error);
    count.textContent = 'Не удалось загрузить список игр.';
    message.textContent = error.message + ' Проверь, что Live Server запущен из корневой папки проекта.';
});
