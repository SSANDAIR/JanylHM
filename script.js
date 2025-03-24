document.addEventListener("DOMContentLoaded", function () {
    // Плавный скролл к разделам
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        });
    });

    // Анимация появления секций при скролле
    const sections = document.querySelectorAll(".section");
    const options = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));

    // Функция добавления отзывов
    document.querySelector(".review-form button").addEventListener("click", submitReview);

    function submitReview() {
        let input = document.getElementById("review-text");
        let reviewText = input.value.trim();
        if (reviewText === "") return;

        let reviewsList = document.querySelector(".reviews-list");
        let newReview = document.createElement("p");
        newReview.textContent = reviewText;
        reviewsList.appendChild(newReview);

        // Сохранение в LocalStorage
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(reviewText);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        input.value = "";
    }

    // Загрузка отзывов из LocalStorage при обновлении страницы
    function loadReviews() {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        let reviewsList = document.querySelector(".reviews-list");
        reviews.forEach(review => {
            let newReview = document.createElement("p");
            newReview.textContent = review;
            reviewsList.appendChild(newReview);
        });
    }

    loadReviews();
});

// Плавное появление разделов при прокрутке
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Запускаем сразу, если раздел уже в зоне видимости
});

