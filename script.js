document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Логика загрузки фото профиля ---
    const avatarCircle = document.querySelector('.avatar-circle');
    const uploadText = document.querySelector('.upload-text');
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    // Клик по аватарке или тексту вызывает выбор файла
    const triggerUpload = () => {
        fileInput.click();
    };

    if (avatarCircle && uploadText) {
        avatarCircle.addEventListener('click', triggerUpload);
        uploadText.addEventListener('click', triggerUpload);
    }

    // Обработка выбранного файла
    fileInput.addEventListener('change', function(e) {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Меняем иконку на загруженное фото
                if (avatarCircle && uploadText) {
                    avatarCircle.innerHTML = `<img src="${event.target.result}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
                    uploadText.textContent = 'Изменить фото';
                }
            }
            reader.readAsDataURL(file);
        }
    });

    // --- 2. Логика формы ---
    const form = document.querySelector('.form-grid');
    const submitBtn = document.querySelector('.submit-btn');

    if (form && submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Собираем данные
        const inputs = form.querySelectorAll('input:not([type="checkbox"]), select');
        let formData = {};
        let isValid = true;

        inputs.forEach(input => {
            const placeholder = input.placeholder || input.previousElementSibling?.innerText || 'Поле';
            const value = input.value.trim();
            
            // Простая валидация: проверяем, заполнены ли обязательные поля
            // В данном примере проверяем только Фамилию, Имя, Телефон и Email
            if ((placeholder === 'Фамилия' || placeholder === 'Имя' || placeholder === 'Телефон' || placeholder === 'E-mail') && value === '') {
                isValid = false;
                input.style.border = '2px solid red';
                setTimeout(() => { input.style.border = 'none'; }, 2000);
            } else {
                input.style.border = 'none';
                formData[placeholder] = value;
            }
        });

        // Добавляем чекбокс
        const contractCheckbox = document.getElementById('contract');
        formData['Договорная'] = contractCheckbox.checked ? 'Да' : 'Нет';

        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля (Фамилия, Имя, Телефон, E-mail).');
            return;
        }

        // --- 3. Результат (симуляция отправки) ---
        console.log('Данные резюме:', formData);
        
        // Визуальный фидбек
        submitBtn.textContent = 'Отправка...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('✅ Резюме успешно сформировано! Данные отправлены.');
            submitBtn.textContent = 'Сформировать';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            // Можно очистить форму здесь, если нужно
            // form.reset();
        }, 1000);
    });
    }

    // --- 4. Доп. фишки: Выбор кнопок фильтрации (визуально) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Здесь можно добавить логику фильтрации
            console.log(`Выбран фильтр: ${this.textContent}`);
        });
    });

});
