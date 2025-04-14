const slider = document.querySelector('.slider');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        const slideCount = document.querySelectorAll('.slide').length;
        
        // Автопрокрутка
        setInterval(nextSlide, 3000);
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Обновляем активную точку
            document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Клики по точкам
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });