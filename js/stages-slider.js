document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector(".stages__list");
  const listItems = document.querySelectorAll(".stages__list-item");
  const dots = document.querySelectorAll(".stages__scroll-dot");
  const leftButton = document.querySelector(".scroll-left");
  const rightButton = document.querySelector(".scroll-right");
  let currentIndex = 0;

  // Вычисление ширины слайда
  function getItemWidth() {
    return listItems[0].offsetWidth + 82; // Ширина + отступ
  }

  let itemWidth = getItemWidth();

  // Обновление слайдера
  function updateSlider() {
    let offset = 0;

    if (window.innerWidth <= 768) {
      // Смещение с учетом ширины элемента и отступа
      offset = -currentIndex * itemWidth;
    }

    list.style.transform = `translateX(${offset}px)`;

    // Обновление активного состояния точек
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Дизейбл левой кнопки первый слайд
    leftButton.disabled = currentIndex === 0;

    // Дизейбл правой кнопки последний слайд
    rightButton.disabled = currentIndex === listItems.length - 3;
  }

  leftButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  rightButton.addEventListener("click", function () {
    if (currentIndex < listItems.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  // Обработчик точек
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentIndex = index;
      updateSlider();
    });
  });

  // Изменение размера экрана
  window.addEventListener("resize", function () {
    itemWidth = getItemWidth(); // Обновление ширины слайда
    updateSlider(); // Смещение слайда
  });

  // Начальная инициализация
  updateSlider();
});
