//  <!-- Owl Carousel START -->
jQuery(document).ready(function($) {
          var owl = $('.owl-carousel');
          owl.on('initialize.owl.carousel initialized.owl.carousel ' +
            'initialize.owl.carousel initialize.owl.carousel ' +
            'resize.owl.carousel resized.owl.carousel ' +
            'refresh.owl.carousel refreshed.owl.carousel ' +
            'update.owl.carousel updated.owl.carousel ' +
            'drag.owl.carousel dragged.owl.carousel ' +
            'translate.owl.carousel translated.owl.carousel ' +
            'to.owl.carousel changed.owl.carousel',
            function(e) {
              $('.' + e.type)
                .removeClass('secondary')
                .addClass('success');
              window.setTimeout(function() {
                $('.' + e.type)
                  .removeClass('success')
                  .addClass('secondary');
              }, 500);
            });
          owl.owlCarousel({
            loop: true,
            nav: true,
            lazyLoad: true,
            margin: 10,
            video: true,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 3
              },
              960: {
                items: 5,
              },
              1200: {
                items: 3
              }
            }
          });
        });
//  <!-- Owl Carousel START -->

//  <!-- Owl Carousel START -->
jQuery(document).ready(function($) {
          var owl = $('.custom-owl-carousel');
          owl.on('initialize.owl.carousel initialized.owl.carousel ' +
            'initialize.owl.carousel initialize.owl.carousel ' +
            'resize.owl.carousel resized.owl.carousel ' +
            'refresh.owl.carousel refreshed.owl.carousel ' +
            'update.owl.carousel updated.owl.carousel ' +
            'drag.owl.carousel dragged.owl.carousel ' +
            'translate.owl.carousel translated.owl.carousel ' +
            'to.owl.carousel changed.owl.carousel',
            function(e) {
              $('.' + e.type)
                .removeClass('secondary')
                .addClass('success');
              window.setTimeout(function() {
                $('.' + e.type)
                  .removeClass('success')
                  .addClass('secondary');
              }, 500);
            });
          owl.owlCarousel({
            loop: true,
            nav: true,
            lazyLoad: true,
            margin: 10,
            video: true,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 3
              },
              960: {
                items: 5,
              },
              1200: {
                items: 4
              }
            }
          });
        });
//  <!-- Owl Carousel START -->