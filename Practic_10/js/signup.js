const patterns = {
    fullname: /^[А-ЯЁа-яёA-Za-z]+(?:[- ][А-ЯЁа-яёA-Za-z]+){1,2}$/,
    phone: /^(?:\+996|0)[\s-]?(?:\d[\s-]?){8,9}\d$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
};

const fields = {
    fullname: document.getElementById('fullname'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email')
};

const messages = {
    fullname: 'Введите ФИО: минимум два слова, только буквы и дефисы.',
    phone: 'Введите корректный номер Кыргызстана, например +996 555 123 456.',
    email: 'Введите почту в формате example@mail.com.'
};

function validateField(name) {
    const field = fields[name];
    const error = document.getElementById(name + '-error');
    const value = field.value.trim();
    const valid = patterns[name].test(value);

    field.classList.toggle('valid', valid);
    field.classList.toggle('invalid', !valid && value.length > 0);
    error.textContent = valid || value.length === 0 ? '' : messages[name];
    return valid;
}

Object.keys(fields).forEach(name => {
    fields[name].addEventListener('input', () => validateField(name));
    fields[name].addEventListener('blur', () => {
        if (fields[name].value.trim() !== '') validateField(name);
    });
});

document.getElementById('register-form').addEventListener('submit', event => {
    event.preventDefault();
    const allValid = Object.keys(fields).map(validateField).every(Boolean);
    const message = document.getElementById('form-message');

    if (allValid) {
        message.style.color = '#baffc9';
        message.textContent = 'Все поля заполнены правильно!';
    } else {
        message.style.color = '#ffd0d0';
        message.textContent = 'Проверьте поля, отмеченные красным.';
    }
});