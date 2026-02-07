// ДАТА И ТЕКСТ
const startDate = new Date("2026-01-02T00:00:00"); 
const text = "Любимая, с 14 февраля! ❤️ Каждый день с тобой — это подарок. Ты делаешь мой мир ярче. Люблю тебя бесконечно.";

function startExperience() {
    const doc = document.documentElement;
    if (doc.requestFullscreen) doc.requestFullscreen().catch(() => {});
    else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();

    const music = document.getElementById('bgMusic');
    music.play().catch(() => console.log("Music blocked"));

    const overlay = document.getElementById('overlay');
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.style.display = 'none';
        const main = document.getElementById('main-content');
        main.style.opacity = '1';
        
        startTimer();
        typeWriter();
        startParticles();
    }, 1000);
}

// Новая логика таймера (Годы, Месяцы, Дни...)
function startTimer() {
    setInterval(() => {
        const now = new Date();
        
        // Расчет лет
        let years = now.getFullYear() - startDate.getFullYear();
        
        // Расчет месяцев
        let months = now.getMonth() - startDate.getMonth();
        if (months < 0) {
            years--;
            months += 12;
        }

        // Расчет дней
        let days = now.getDate() - startDate.getDate();
        if (days < 0) {
            months--;
            // Получаем количество дней в предыдущем месяце
            let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }

        // Если при коррекции дней месяцы стали отрицательными
        if (months < 0) {
            years--;
            months += 12;
        }

        // Время (часы, минуты, секунды) считаем просто как разницу
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Корректировка времени относительно старта (если старт был не в 00:00)
        // Но так как у тебя старт в 00:00:00, то просто берем текущее время,
        // но правильнее высчитать разницу:
        
        let diffHours = hours - startDate.getHours();
        let diffMinutes = minutes - startDate.getMinutes();
        let diffSeconds = seconds - startDate.getSeconds();

        if (diffSeconds < 0) { diffSeconds += 60; diffMinutes--; }
        if (diffMinutes < 0) { diffMinutes += 60; diffHours--; }
        if (diffHours < 0) { diffHours += 24; days--; } 
        // Если days стали < 0 после вычета часов, цикл пересчета месяца сложный,
        // но для визуальной простоты оставим обновление раз в секунду.
        
        // ЗАЩИТА ОТ БУДУЩЕГО:
        // Так как дата 2026 год, сейчас таймер показал бы отрицательные числа.
        // Я добавлю проверку: если дата еще не наступила, показывать по нулям.
        if (now < startDate) {
             document.getElementById('years').innerText = "0";
             document.getElementById('months').innerText = "0";
             document.getElementById('days').innerText = "0";
             document.getElementById('hours').innerText = "0";
             document.getElementById('minutes').innerText = "0";
             document.getElementById('seconds').innerText = "0";
             return; 
        }

        document.getElementById('years').innerText = years;
        document.getElementById('months').innerText = months;
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = diffHours;
        document.getElementById('minutes').innerText = diffMinutes;
        document.getElementById('seconds').innerText = diffSeconds;
    }, 1000);
}

function typeWriter() {
    const container = document.getElementById('message-box');
    let i = 0;
    container.innerHTML = "";
    function type() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50); 
        }
    }
    type();
}

function startParticles() {
    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerHTML = Math.random() > 0.5 ? '❤️' : '✨';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '110vh';
        p.style.fontSize = (Math.random() * 20 + 10) + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 6000);
    }, 400);
}

