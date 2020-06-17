import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
   const slider = document.querySelector(container),
         sliderWrapper = slider.querySelector(wrapper),
         sliderInner = sliderWrapper.querySelector(field),
         slides = sliderWrapper.querySelectorAll(slide),
         current = slider.querySelector(currentCounter),
         total = slider.querySelector(totalCounter),
         prev = slider.querySelector(prevArrow),
         next = slider.querySelector(nextArrow),
         width = window.getComputedStyle(sliderWrapper).width;
   let slidesIndex = 1,
       offset = 0;

   total.textContent = getZero(slides.length);
   updateCurrentSlide();
   
   function updateCurrentSlide () {
      current.textContent = getZero(slidesIndex);
   }

   function slideInnerTransform () {
      sliderInner.style.transform = `translateX(-${offset}px)`;
   }

   sliderWrapper.style.overflow = 'hidden';
   sliderInner.style.cssText = `
      width: ${100 * slides.length}%;
      display: flex;
      transition: 0.5s all;
   `;
   slides.forEach(slide => slide.style.width = width);
   slider.style.position = 'relative';

   const dots = document.createElement('ul'),
         dotsArr = [];
   dots.classList.add('carousel-indicators');
   slider.append(dots);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      dots.append(dot);
      dotsArr.push(dot);

      if (i == 0) {
         dot.style.opacity = '1';
      }
   }

   function showDotsActive () {
      dotsArr.forEach(dot => dot.style.opacity = '.5');
      dotsArr[slidesIndex - 1].style.opacity = '1';
   }

   function deleteNotBigits (str) {
      return +str.replace(/\D/g, '');
   }

   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = deleteNotBigits(width) * (slides.length -1);
         slidesIndex = slides.length;
      } else {
         offset -= deleteNotBigits(width);
         slidesIndex--;
      }

      updateCurrentSlide();
      slideInnerTransform();
      showDotsActive();
   });

   

   next.addEventListener('click', () => {
      if (offset == deleteNotBigits(width) * (slides.length -1)) {
         offset = 0;
         slidesIndex = 1;
      } else {
         offset += deleteNotBigits(width);
         slidesIndex++;
      }

      updateCurrentSlide();
      slideInnerTransform();
      showDotsActive();
   });

   dotsArr.forEach(dot => dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slidesIndex = slideTo;
      offset = deleteNotBigits(width) * (slideTo -1);
      slideInnerTransform();
      updateCurrentSlide();
      showDotsActive();
   })); 
}

export default slider;