// Slider Partner Detail 
var imagesThumb = new Swiper(".imagesThumb", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var imagesMain = new Swiper(".imagesMain", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {  //lien ket main va thumb
      swiper: imagesThumb,
    },
  });
// End Slider Partner Detail 