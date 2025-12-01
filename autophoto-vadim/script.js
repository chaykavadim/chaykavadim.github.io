// Данные для сайта фотографа автомобилей
const siteData = {
    photographerName: "Чайка Вадим",
    email: "chayka.vadim@list.ru",
    phone: "+7 (999) 777-77-77",
    city: "Москва",
    experience: "4 года",
    
    // Слайды для главного слайдера
    heroSlides: [
        {
            image: "images/hero/car1.jpg",
            alt: "Съемка спортивного автомобиля"
        },
        {
            image: "images/hero/car2.jpg",
            alt: "Классический автомобиль"
        },
        {
            image: "images/hero/car3.jpg",
            alt: "Тюнингованный автомобиль"
        },
        {
            image: "images/hero/car4.jpg",
            alt: "Динамичная съемка"
        },
        {
            image: "images/hero/car5.jpg",
            alt: "Коммерческая съемка"
        }
    ],
    
    // Галерея работ
    galleryItems: [
        { 
            image: "images/gallery/sports/sports1.jpg", 
            category: "sports",
            alt: "Спорткар Porsche 911"
        },
        { 
            image: "images/gallery/classic/classic1.jpg", 
            category: "classic",
            alt: "Классический Mercedes"
        },
        { 
            image: "images/gallery/tuning/tuning1.jpg", 
            category: "tuning",
            alt: "Тюнингованный Nissan"
        },
        { 
            image: "images/gallery/sports/sports2.jpg", 
            category: "sports",
            alt: "Спорткар Lamborghini"
        },
        { 
            image: "images/gallery/classic/classic2.jpg", 
            category: "classic",
            alt: "Классический Ford Mustang"
        },
        { 
            image: "images/gallery/tuning/tuning2.jpg", 
            category: "tuning",
            alt: "Тюнинг двигателя"
        },
        { 
            image: "images/gallery/commercial/commercial1.jpg", 
            category: "commercial",
            alt: "Коммерческая съемка"
        },
        { 
            image: "images/gallery/commercial/commercial2.jpg", 
            category: "commercial",
            alt: "Съемка для автосалона"
        }
    ],
    
    // Фото фотографа
    aboutPhoto: "images/about/vadim.jpg",
    
    // Социальные сети
    socialLinks: {
        instagram: "#",
        vk: "#",
        telegram: "#"
    }
};

// ИНИЦИАЛИЗАЦИЯ САЙТА ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', function() {
    // 1. Заполняем текстовые данные
    document.querySelectorAll('.logo').forEach(logo => {
        logo.textContent = `📸 ${siteData.photographerName}`;
    });
    
    document.title = `${siteData.photographerName} | Фотограф автомобилей`;
    
    // 2. Создаем слайдер
    initHeroSlider();
    
    // 3. Создаем галерею
    initGallery();
    
    // 4. Обработка формы
    initContactForm();
    
    // 5. Активное меню при прокрутке
    initScrollSpy();
    
    // 6. Фильтры галереи
    initGalleryFilters();
});

// ФУНКЦИЯ ДЛЯ СОЗДАНИЯ СЛАЙДЕРА
function initHeroSlider() {
    const swiperWrapper = document.querySelector('.hero-swiper .swiper-wrapper');
    
    // Очищаем контейнер
    swiperWrapper.innerHTML = '';
    
    // Добавляем слайды
    siteData.heroSlides.forEach(slide => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide';
        
        const img = document.createElement('img');
        img.src = slide.image;
        img.alt = slide.alt;
        
        // Обработчик ошибки
        img.onerror = function() {
            console.error(`Не удалось загрузить: ${slide.image}`);
            this.src = 'placeholder.jpg';
        };
        
        slideDiv.appendChild(img);
        swiperWrapper.appendChild(slideDiv);
    });
    
    // Инициализируем Swiper
    const swiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// ФУНКЦИЯ ДЛЯ СОЗДАНИЯ ГАЛЕРЕИ
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    siteData.galleryItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `gallery-item ${item.category}`;
        itemDiv.dataset.category = item.category;
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.alt;
        img.loading = 'lazy';
        
        // Обработчик ошибки
        img.onerror = function() {
            console.error(`Не удалось загрузить: ${item.image}`);
            this.src = 'placeholder.jpg';
        };
        
        itemDiv.appendChild(img);
        galleryGrid.appendChild(itemDiv);
        
        // Добавляем лайтбокс по клику
        itemDiv.addEventListener('click', function() {
            openLightbox(item.image, item.alt);
        });
    });
}

// ПРОСТОЙ ЛАЙТБОКС
function openLightbox(imageSrc, altText) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imageSrc;
    lightboxImg.alt = altText;
    lightbox.classList.add('active');
    
    // Закрытие по клику
    lightbox.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('close')) {
            lightbox.classList.remove('active');
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// ФИЛЬТРЫ ГАЛЕРЕИ
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Показываем/скрываем элементы галереи
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ФОРМА ОБРАТНОЙ СВЯЗИ
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            email: this.querySelector('input[type="email"]').value,
            car: this.querySelector('input[placeholder*="автомобиля"]').value,
            service: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };
        
        // Здесь можно добавить отправку на сервер
        // Для демо просто покажем сообщение
        alert(`Спасибо, ${formData.name}! Ваша заявка на съемку ${formData.car ? 'автомобиля ' + formData.car : ''} принята. Я свяжусь с вами в ближайшее время по телефону ${formData.phone}.`);
        form.reset();
    });
}

// АКТИВНОЕ МЕНЮ ПРИ ПРОКРУТКЕ
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Добавляем стиль для активной ссылки
const style = document.createElement('style');
style.textContent = `
    .nav a.active {
        color: #e74c3c !important;
        font-weight: bold;
    }
`;
document.head.appendChild(style);