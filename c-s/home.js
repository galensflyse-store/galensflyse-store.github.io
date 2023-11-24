$(document).ready(function () {
  $(".img-carousel").slick({
    slidesToShow: 1,
    dots: false,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

/*
inspiration 
https://dribbble.com/shots/15761617-Fleet-Travel-Shopping-UI-Kit/attachments/7567383?mode=media
*/
