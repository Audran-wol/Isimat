(function ($) {
  'use strict';

  // Preloader js    
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  // Sticky Menu
  $(window).scroll(function () {
    var height = $('.top-header').innerHeight();
    if ($('header').offset().top > 10) {
      $('.top-header').addClass('hide');
      $('.navigation').addClass('nav-bg');
      $('.navigation').css('margin-top','-'+height+'px');
    } else {
      $('.top-header').removeClass('hide');
      $('.navigation').removeClass('nav-bg');
      $('.navigation').css('margin-top','-'+0+'px');
    }
  });

  

  // Background-images
  $('[data-background]').each(function () {
    $(this).css({
      'background-image': 'url(' + $(this).data('background') + ')'
    });
  });

  //Hero Slider
  $('.hero-slider').slick({
    autoplay: true,
    autoplaySpeed: 7500,
    pauseOnFocus: false,
    pauseOnHover: false,
    infinite: true,
    arrows: true,
    fade: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
    dots: true
  });
  $('.hero-slider').slickAnimation();

  // venobox popup
  $(document).ready(function () {
    $('.venobox').venobox();
  });

  // filter
  $(document).ready(function () {
    var containerEl = document.querySelector('.filtr-container');
    var filterizd;
    if (containerEl) {
      filterizd = $('.filtr-container').filterizr({});
    }
    //Active changer
    $('.filter-controls li').on('click', function () {
      $('.filter-controls li').removeClass('active');
      $(this).addClass('active');
    });
  });

  //  Count Up
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });

  // Animation
  $(document).ready(function () {
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
        $(this).addClass('animate-in');
      });
    });
  });

  // Contact form - WhatsApp integration
  $(document).ready(function () {
    var $contactForm = $('#contactForm');
    if ($contactForm.length === 0) {
      return;
    }

    var rawPhone = ($contactForm.data('whatsapp-phone') || '').toString();
    var whatsappPhone = rawPhone.replace(/\D/g, '');

    if (!whatsappPhone) {
      return;
    }

    $contactForm.on('submit', function (event) {
      var $form = $(this);
      var formData = {
        name: $.trim($form.find('[name="name"]').val() || ''),
        email: $.trim($form.find('[name="mail"]').val() || ''),
        subject: $.trim($form.find('[name="subject"]').val() || ''),
        message: $.trim($form.find('[name="message"]').val() || '')
      };

      if (!formData.message) {
        event.preventDefault();
        alert('Please enter your message before sending.');
        return;
      }

      var messageLines = [];
      if (formData.name) {
        messageLines.push('Name: ' + formData.name);
      }
      if (formData.email) {
        messageLines.push('Email: ' + formData.email);
      }
      if (formData.subject) {
        messageLines.push('Subject: ' + formData.subject);
      }
      messageLines.push('Message: ' + formData.message);

      var whatsappMessage = encodeURIComponent(messageLines.join('\n'));
      var whatsappUrl = 'https://api.whatsapp.com/send?phone=' + whatsappPhone + '&text=' + whatsappMessage;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      var formAction = ($form.attr('action') || '').trim();
      if (formAction === '' || formAction === '#') {
        event.preventDefault();
      }
    });
  });


})(jQuery);