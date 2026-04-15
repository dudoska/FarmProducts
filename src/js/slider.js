const reviews = [
    {
        name: "Андрей Деллос",
        date: "2 апреля 2024",
        text: "Добрый день! Лучшая оптовая компания, которую я знаю. Товар строго отбирают по самому лучшему качеству. Заказы собираются моментально, без задержки. Вся документация предоставляется. Замечательный склад и его доступность для загрузки. Непременно рекомендую данную компанию.",
        avatar: "./src/image/feedback/avatar.webp"
    },
    {
        name: "Елена Смирнова",
        date: "15 марта 2025",
        text: "Отличный поставщик! Фрукты всегда свежие, упаковка надежная. Работаем с ними уже полгода, ни разу не подвели с доставкой. Отдельное спасибо за гибкую систему скидок для постоянных клиентов.",
        avatar: "./src/image/feedback/avatar2.webp"
    },
    {
        name: "Иван Петров",
        date: "28 февраля 2024",
        text: "Очень радует возможность отсрочки платежа — для малого бизнеса это критично важно. Качество овощей на высоте, брака практически не бывает. Рекомендую к сотрудничеству.",
        avatar: "./src/image/feedback/avatar3.webp"
    },
    {
        name: "Ольга Иванова",
        date: "10 февраля 2024",
        text: "Заказываем продукцию для нашей сети ресторанов. Повара в восторге от свежести зелени и сезонных овощей. Логистика работает как часы.",
        avatar: "./src/image/feedback/avatar4.webp"
    },
    {
        name: "Михаил Волков",
        date: "25 января 2024",
        text: "Адекватные цены и отличный сервис. Менеджер всегда на связи, оперативно решает любые вопросы. Спасибо за вашу работу!",
        avatar: "./src/image/feedback/avatar5.webp"
    },
    {
        name: "Анна Кузнецова",
        date: "12 января 2024",
        text: "Прекрасные фермерские продукты. Клиенты нашего магазина постоянно спрашивают именно ваши яблоки и груши. Будем расширять ассортимент закупок.",
        avatar: "./src/image/feedback/avatar6.webp"
    }
];

const btnLeft = document.querySelector('.feedback-left');
const btnRight = document.querySelector('.feedback-right');
const nameEl = document.querySelector('.feedback-name');
const dateEl = document.querySelector('.feedback-date');
const textEl = document.querySelector('.feedback-text');
const avatarEl = document.querySelector('.feedback-avatar');
const points = document.querySelectorAll('.feedback-point');

let currentIndex = 0;
const AUTO_PLAY_DELAY = 5000;

function updateSlider(index) {
    const review = reviews[index];

    nameEl.textContent = review.name;
    dateEl.textContent = review.date;
    textEl.textContent = review.text;

    avatarEl.style.backgroundImage = `url(${review.avatar})`;

    points.forEach(point => point.classList.remove('active'));
    points[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % reviews.length;
    updateSlider(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    updateSlider(currentIndex);
}

function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_DELAY);
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

startAutoPlay();

btnRight.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});

btnLeft.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

// 7. Обработчики клика по точкам (пагинация)
points.forEach((point, index) => {
    point.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
        resetAutoPlay();
    });
});