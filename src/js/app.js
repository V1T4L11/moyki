$(function(){
	$('#menuToggler').on('click', function(e){
		e.preventDefault();
		$('#mainNav li').slideToggle();
	});

	$('.footer__menu').on('click', '.menu__heading', function(){
		$(this).parent().find('.menu__item').slideToggle();
	});

	$('#heroSlider .hero-slider__slides').slick({
    autoplay: true,
    arrows: false,
    adaptiveHeight: true,
    mobileFirst: true
  });
  $('.arrow--left').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().find('.hero-slider__slides').slick('slickPrev');
	});

	$('.arrow--right').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().find('.hero-slider__slides').slick('slickNext');
	});

  var catalogSliderParams = {
		arrows: false,
    autoplay: true,
    adaptiveHeight: true,
    slidesToShow: 2
  }

  var slickLeft = $('#catalogSliderLeft .slider__body');
  var slickRight = $('#catalogSliderRight .slider__body');

	slickLeft.slick(catalogSliderParams);
	slickRight.slick(catalogSliderParams);

	$('.arrow__prev').on('click', function(e){
		e.preventDefault();
		$(this).parent().next().slick('slickPrev');
	});

	$('.arrow__next').on('click', function(e){
		e.preventDefault();
		$(this).parent().next().slick('slickNext');
	});

	var itemGallery = $('.gallery__images');
	if ( itemGallery.length ) {
		$(itemGallery).magnificPopup({
			delegate: 'a',
			type:'image',
			gallery: {
			  enabled: true,
			  navigateByImgClick: true,
			  tPrev: 'Предыдущая', // title for left button
			  tNext: 'Слудующая', // title for right button
			  tCounter: '<span class="mfp-counter">%curr% из %total%</span>' // markup of counter
			}
		});
	}

	var infoGallery = $('.info-page .gallery');
	if ( infoGallery.length ) {
		$(infoGallery).magnificPopup({
			delegate: 'a',
			type:'image',
			gallery: {
			  enabled: true,
			  navigateByImgClick: true,
			  tPrev: 'Предыдущая', // title for left button
			  tNext: 'Слудующая', // title for right button
			  tCounter: '<span class="mfp-counter">%curr% из %total%</span>' // markup of counter
			}
		});
	}
});
