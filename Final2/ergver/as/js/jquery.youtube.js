/*
 * Fetches and display JSON object from Asset Store
 * Copyright (c) 2006-2013 Rickard Andersson
 * Youtube call example: http://gdata.youtube.com/feeds/api/users/Unity3D/uploads/-/sports/playoffs?v=2&alt=json
 */

(function($){

  var methods = {
    init : function(options){

      var settings = {
        json:     '',
        template: '',
        limit:    '',
        category: '',
        forwardUrl: '',
        strip: '',
        btncolor: 'blue'
      };

      return this.each(function(){

        if(options){
          $.extend(settings, options);
        }

        var container = $(this);

        $.getJSON(settings.json, function(data, textStatus){
          if(textStatus == 'success'){

            // Template 1
            if(settings.template == '1'){
              $.each(data.items, function(key, v) {

                var title = (settings.strip == '') ? v.snippet.title : v.snippet.title.replace(settings.strip, '');
                
                var html = '';
                if(key % 4 == 0) html += '<div class="clear"></div>';
                html += '<div class="g3" id="vid-'+ v.snippet.resourceId['videoId'] +'">';
                html +=   '<div class="rel">';
                html +=     '<a href="https://www.youtube.com/embed/'+ v.snippet.resourceId['videoId'] +'?autoplay=1" class="fancy-video" title="'+ title +'">';
                html +=       '<div class="play small"></div>';
                html +=       '<img src="'+ v.snippet.thumbnails.medium['url'] +'" class="ic m0a mb10" />';
                html +=     '</a>';
                html +=   '</div>';
                html +=   '<p>'+ title +'</p>';
                html += '</div>';

                container.append(html);

              });
            }
            // Template 2
            else if(settings.template == '2'){
              $.each(data.items, function(key, v) {

                var title = (settings.strip == '') ? v.snippet.title : v.snippet.title.replace(settings.strip, '');
                
                var html = '';
                html += '<div class="g6 box p0110">';
                html +=   '<div class="rel">';
                html +=     '<a href="'+ settings.forwardUrl + '#' + key +'">';
                html +=       '<div class="play purple small"></div>';
                html +=       '<img src="'+ v.snippet.thumbnails.medium['url'] +'" class="m0a mb5" />';
                html +=     '</a>';
                html +=   '</div>';
                html +=   '<p class="ellipsis mb20">'+ title +'</p>';
                html += '</div>';

                container.append(html);
              });
            }
            // Template 3
            else if(settings.template == '3'){
              $.each(data.items, function(key, v) {

                var title = (settings.strip == '') ? v.snippet.title : v.snippet.title.replace(settings.strip, '');
                
                var html = '';
                html += '<div class="g4 tc">';
                html +=   '<div class="yt-video-cover rel">';
                html +=     '<a href="https://www.youtube.com/embed/'+ v.snippet.resourceId['videoId'] +'?autoplay=1" class="fancy-video tdn cw" title="'+ title +'">';
                html +=       '<img src="'+ v.snippet.thumbnails.medium['url'] +'" class="poster" />';
                html +=       '<img src="'+ blankImageSrc +'" alt="" class="blank bg-dg" />';
                html +=       '<div class="cover">';
                html +=         '<div class="play '+ settings.btncolor +' small"></div>';
                html +=       '</div>';
                html +=     '</a>';
                html +=   '</div>';
                html += '</div>';

                container.append(html);
                $('div.blank',container).remove();
              });
            }

            // Auto play
            if(location.href.indexOf('#') > -1){
              var url = $('#vid-' + location.href.split('#')[1] + ' .fancy-video').attr('href');
              if(url != undefined){
                if(!touchEnabled && masterW < 441 || touchEnabled && masterW > 440 || !touchEnabled){
                  $.fancybox.open(
                    [{href: url }],
                    { width: 900, height: 507, fixed: true, padding: 0, type: 'iframe' }
                  );
                }
                else {
                  location.href = url;
                }
              }
            }

          }
        });

      });
    }
  };

  $.fn.youtubeVideos = function(method){
    return methods.init.apply(this, arguments);
  };

})(jQuery);

