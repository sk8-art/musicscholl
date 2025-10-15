// Защита от SQL-инъекций
function sanitizeSQL(input) {
    const sqlKeywords = [
        'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'UNION', 
        'OR', 'AND', 'WHERE', 'FROM', 'TABLE', 'DATABASE'
    ];
    
    let cleanInput = input;
    
    // Удаление специальных символов
    cleanInput = cleanInput.replace(/[;'"\\--]/g, '');
    
    // Проверка SQL-инъекций (базовая)
    const upperInput = cleanInput.toUpperCase();
    for (const keyword of sqlKeywords) {
        if (upperInput.includes(keyword)) {
            throw new Error(`Обнаружена попытка SQL-инъекции`);
        }
    }
    
    return cleanInput;
}

// Валидация логина
function validateUsername(username) {
    if (username.length < 3) {
        throw new Error('Логин должен содержать минимум 3 символа');
    }
    
    if (username.length > 20) {
        throw new Error('Логин не должен превышать 20 символов');
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error('Логин может содержать только латинские буквы, цифры и подчеркивания');
    }
    
    return sanitizeSQL(username);
}

// Валидация пароля
function validatePassword(password) {
    if (password.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов');
    }
    
    return sanitizeSQL(password);
}

// Обработчик отправки формы (код из первого пункта)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
    document.getElementById('successMessage').style.display = 'none';
    
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const cleanUsername = validateUsername(username);
        const cleanPassword = validatePassword(password);
        
        // Тестовые учетные данные (замените на реальные)
        if (cleanUsername === 'admin' && cleanPassword === 'admin123') {
            document.getElementById('successMessage').textContent = 'Успешный вход! Перенаправление...';
            document.getElementById('successMessage').style.display = 'block';
            
            setTimeout(function() {
                window.location.href = 'http://127.0.0.1:5500/index.html';
            }, 1500);
        } else {
            throw new Error('Неверный логин или пароль');
        }
        
    } catch (error) {
        document.getElementById('generalError').textContent = error.message;
        document.getElementById('generalError').style.display = 'block';
    }
});

