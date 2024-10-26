document.addEventListener("DOMContentLoaded", function () {
  let slider = document.getElementById("slider");
  let slides = document.querySelectorAll(".slide");
  let currentIndex = 0;
  let autoSlide;
  const intervalTime = 3000; // 3 seconds
  const paginationDots = document.querySelectorAll(".dot");

  function updateSlider(index) {
    slides.forEach((slide) => slide.classList.remove("fade-in")); // Remove fade class from all slides
    slides[index].classList.add("fade-in"); // Apply fade to current slide
    slider.style.transform = `translateX(-${index * 100}%)`;
    paginationDots.forEach((dot) => dot.classList.remove("active"));
    paginationDots[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(currentIndex);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, intervalTime);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  document.getElementById("next").addEventListener("click", nextSlide);
  document.getElementById("prev").addEventListener("click", prevSlide);
  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider(currentIndex);
    });
  });
  let styleElement = document.createElement("style");
  styleElement.innerHTML = `.fade-in { opacity: 0; animation: fade-in 1.2s forwards; }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`;
  document.head.appendChild(styleElement);

  slider.addEventListener("mouseover", stopAutoSlide);
  slider.addEventListener("mouseout", startAutoSlide);

  // Swipe functionality for touch screens
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) nextSlide();
    if (touchEndX > touchStartX) prevSlide();
  });

  // Start the automatic slide
  startAutoSlide();
});
