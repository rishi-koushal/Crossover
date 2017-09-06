/*
 * Background Slider
 * Copyright Â© Rickard Andersson
 * http://unity3d.com
 */

(function($) {

  var methods = {
    init : function(options){

      var settings = {
        path:                '',
        backgrounds:         [],
        mobileBackgrounds:   [],
        captions:            [],
        autoStart:           true,
        renderControls:      false,
        delay:               6000,
        effect:              'fxSoftScale',
        transitionDuration:  750
        
      };

      return this.each(function(){

        if(options){
          $.extend(settings, options);
        }

        var $hero = $(this),
            path = settings.path,
            imagesArr = [],
            images = (getWidth() < 768 && settings.mobileBackgrounds.length > 0) ? settings.mobileBackgrounds : settings.backgrounds,
            contentHtml = '',
            blured = false,
            current = -1,
            $items = '',
            itemsCount = settings.backgrounds.length,
            isAnimating = false,
            device = (getWidth() < 768) ? 'mobile' : 'desktop',
            t;

        // Append and add necessary elements/classes
        $hero.append('<div class="background-slider"></div>');
        
        var $slider = $('.background-slider');
        $slider.append('<div class="loading"><div></div><div></div><div></div></div>').append('<ul></ul>');
        
        // Add transistion effect
        $slider.addClass(settings.effect);

        // Add prev/next arrows
        if(settings.renderControls && itemsCount > 1){

          $slider.prepend('<div class="prev"></div>');
          $slider.prepend('<div class="next"></div>');
          
          // Controls related events
          $('.next').on('click',function(){
            navigate('next',true);
          });
          $('.prev').on('click',function(){
            navigate('prev',true);
          });

          $(document).on('keydown',function(e){
            if(e.keyCode == 37 && !$('input').is(':focus')){ $('.prev').trigger('click'); }
            if(e.keyCode == 39 && !$('input').is(':focus')){ $('.next').trigger('click'); }
          });

        }

        // Swap image source
        $(window).on('resize',function(){

          device = (getWidth() < 768) ? 'mobile' : 'desktop';

          if(device == 'mobile'){
            $.each($('li',$slider),function(i,slide){
              var src = $(this).attr('data-mb');
              $('img',this).attr('src',src);
            });
          }
          else {
            $.each($('li',$slider),function(i,slide){
              var src = $(this).attr('data-b');
              $('img',this).attr('src',src);
            });
          }

        });

        function navigate(dir,stop){
      
          if(isAnimating) return false;
      
          isAnimating = true;
      
          var currentItem = $items.eq(current);
      
          if( dir === 'next' ) {
            current = current < itemsCount ? current + 1 : 0;
          }
          else if( dir === 'prev' ) {
            current = current > 0 ? current - 1 : itemsCount;
          }
      
          var nextItem = $items.eq(current);

          currentItem.addClass((dir === 'next') ? 'navOutNext' : 'navOutPrev');
          nextItem.addClass((dir === 'next') ? 'navInNext' : 'navInPrev');
          
          setTimeout(function(){
            currentItem.removeClass('current');
            currentItem.removeClass((dir === 'next') ? 'navOutNext' : 'navOutPrev');
            nextItem.addClass('current');
            nextItem.removeClass((dir === 'next') ? 'navInNext' : 'navInPrev');
            isAnimating = false;
          },1500);

          if(stop || itemsCount == 0){
            clearTimeout(t);
          }

        }

        function init(){
          update('next',false);
        }

        // Stop/Start slideshow When leaving/enter window
        $(window).on('blur', function(){ blured = true; clearTimeout(t); });
        $(window).on('focus',function(){ clearTimeout(t); if(blured && settings.autoStart){ t = setTimeout(function(){ init() }, settings.delay); } });

        function update(dir,stop){
          navigate(dir);
          if(!stop && itemsCount > 1){
            t = setTimeout(function(){ init() }, settings.delay);
          }
        }

        // Create html
        $.each(images, function(i,s){ 
          var src = path + s;
          contentHtml += '<li data-mb="'+ settings.mobileBackgrounds[i] +'" data-b="'+ settings.backgrounds[i] +'">';
          contentHtml +=   '<img src="'+ src +'" />';
          if(settings.captions[i]){
            contentHtml +=   '<div class="caption">' + settings.captions[i] + '</div>';
          }
          contentHtml += '</li>';
          imagesArr.push(src);
        });

        // Pre-Load Images and init slider
        $.preload(imagesArr, {
          loaded_all: function(loaded, total) {
            $('.loading',$slider).fadeOut(duration/2, function(){
              $('ul',$slider).append(contentHtml);
              $items = $('li',$slider);
              itemsCount = $items.length - 1;
              if(settings.autoStart){
                init();
              }
            });
          }
        });

      });
    }
  };

  $.fn.backgroundSlider = function(method){
    return methods.init.apply(this, arguments);
  };

})(jQuery);

