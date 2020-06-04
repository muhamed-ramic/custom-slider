//This is a custom script for managing testimonial slider on click and mouse up/down or touch down/up

window.addEventListener("DOMContentLoaded", function () {
  var sliderItems = document.querySelectorAll('.slider-item');
  var sliderWrapper = document.querySelector('.main__story');
  var previousSlideBtn = document.querySelector('.prev');
  var nextSlideBtn = document.querySelector('.next');
  var getActiveSlide = () => {
    return Array.from(sliderItems).filter(function (slide) {
      return slide.classList.contains('active');
    });
  };

  var removePreviousOrNextPagArrow = () => {
    var previousSelected = document.querySelector('.highlight');
    if (previousSelected) {
      previousSelected.classList.remove('highlight');
    }
  };

  var touchedRightEdge = false;
  var touchedLeftEdge = false;

  var preventDefault = (e) => {
    e.preventDefault();
  }
  /*
  * Helper functions
  *
  *
  */
  function handleSlideActive(element, className) {
    element.classList.remove("active");
    element.classList.add(className);
  }

  function handleSlide(current, toShow ,isPrevious = false) {
    removePreviousOrNextPagArrow();
    if (isPrevious) {
      previousSlideBtn.classList.add('highlight');
    } else {
      nextSlideBtn.classList.add('highlight');
    }
    if (toShow.classList.contains('slider-item')) {
      handleSlideActive(current, "previous-slide");
      toShow.classList.add('active');
      toShow.classList.remove('item-hidden');
    }
  }
  var sliderContainerHalfDimension = window.innerWidth > 768 ? 600: 300;
  function handleClickOrMouseStart(e) {
    if (e.clientX > sliderContainerHalfDimension) {
      touchedRightEdge = true;
    } else {
      touchedLeftEdge = true;
    }
  }
  function handleClickUpOrTouchEnd(e) {
    var activeSlide = getActiveSlide().pop();

    if (touchedRightEdge && e.clientX < sliderContainerHalfDimension) {
      handleSlide(activeSlide, activeSlide.previousElementSibling);
      touchedRightEdge = false;
    } else if (touchedLeftEdge && e.clientX > sliderContainerHalfDimension) {
      handleSlide(activeSlide, activeSlide.nextElementSibling);
      touchedLeftEdge = false;
    }
  }

  /*
  * EVENTS
  *
  */
  //Mousedown large screen, touchstart mobile slider.
  sliderWrapper.addEventListener('mousedown', function (e) {
    handleClickOrMouseStart(e);
  });

  sliderWrapper.addEventListener('touchstart', function (e) {
    handleClickOrMouseStart(e);
  });

  sliderWrapper.addEventListener('mouseup', function (e) {
    handleClickUpOrTouchEnd(e);
  });

  sliderWrapper.addEventListener('touchend', function (e) {
    handleClickUpOrTouchEnd(e);
  });

  previousSlideBtn.addEventListener('click', function (event) {
    preventDefault(event);
    var activeSlide = getActiveSlide().pop();
    handleSlide(activeSlide, activeSlide.previousElementSibling, true);
  });
  nextSlideBtn.addEventListener('click', function (event) {
    preventDefault(event);
    var activeSlide = getActiveSlide().pop();
    handleSlide(activeSlide, activeSlide.nextElementSibling);
  });
});