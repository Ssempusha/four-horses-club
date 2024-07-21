document.addEventListener("DOMContentLoaded", function () {
  const participantsList = document.querySelector(".participants__list");
  const leftButton = document.getElementById("participantsLeftButton");
  const rightButton = document.getElementById("participantsRightButton");
  const currentSlide = document.querySelector(
    ".participants__scroll-counter-now"
  );
  const totalSlides = document.querySelector(
    ".participants__scroll-counter-all"
  );
  const items = document.querySelectorAll(".participants__list-item");

  const totalItems = items.length; // Общее количество элементов
  let itemsPerPage = 3; // Количество элементов на странице по умолчанию
  let currentIndex = 0; // Текущий индекс начальной позиции слайдера
  let autoSlideInterval; // Интервал автоматического слайда

  // Обновление текущего слайда
  function updateSlideCount() {
    currentSlide.textContent = currentIndex + itemsPerPage;
  }

  // Обновление состояния кнопок
  function updateButtons() {
    leftButton.disabled = currentIndex === 0;
    rightButton.disabled = currentIndex >= totalItems - itemsPerPage;
  }

  // Перемещение слайдов
  function slide() {
    const itemWidth = items[0].offsetWidth; // Ширина одного элемента
    const gap = parseInt(getComputedStyle(participantsList).gap); // Расстояние между элементами
    const offset = currentIndex * (itemWidth + gap); // Смещение для слайда
    participantsList.style.transform = `translateX(-${offset}px)`; // Применение смещения через transform
    updateSlideCount(); // Обновление отображаемого номера текущего слайда
    updateButtons(); // Обновление состояния кнопок
  }

  // Обновление количества элементов на странице в зависимости от ширины окна
  function updateItemsPerPage() {
    if (window.innerWidth <= 768) {
      itemsPerPage = 1;
    } else if (window.innerWidth <= 1070) {
      itemsPerPage = 2;
    } else {
      itemsPerPage = 3;
    }
    currentIndex = 0;
    currentSlide.textContent = itemsPerPage;
    totalSlides.textContent = totalItems;
    slide();
  }

  // Автослайд
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (currentIndex < totalItems - itemsPerPage) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      slide();
    }, 4000);
  }

  // Сброс автоматического слайда
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  rightButton.addEventListener("click", () => {
    if (currentIndex < totalItems - itemsPerPage) {
      currentIndex++; // Увеличение индекса, если не достигнут конец списка
      slide(); // Перемещение слайдов
      resetAutoSlide(); // Сброс автослайда
    }
  });

  leftButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      slide();
      resetAutoSlide();
    }
  });

  // Изменение размера экрана
  window.addEventListener("resize", () => {
    updateItemsPerPage();
    resetAutoSlide();
  });

  // Начальная инициализация
  updateItemsPerPage();
  slide();
  startAutoSlide();
});
