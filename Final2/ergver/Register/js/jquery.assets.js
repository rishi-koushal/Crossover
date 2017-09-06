
/*
 * Fetches and display JSON object from Asset Store
 * Copyright (c) 2006-2013 Rickard Andersson
 */

(function($){

  var methods = {
    init : function(options){

      var settings = {
        src:        'hottest',
        template:   '1',
        limit:      '3',
        publisher:  '',
        category:   ''
      };

      return this.each(function(){

        if(options){
          $.extend(settings, options);
        }

        // Construct path
        if(settings.template != '4'){
          path = $('body.assetstore').length > 0 ? path + '/resources/assets_sale.php' : path + '/resources/assets.php?src='+ settings.src +'&publisher='+ settings.publisher +'&category='+ settings.category + '&limit=' + settings.limit;
        }
        else if(settings.template == '4'){
          path = path + '/resources/temp.json';
        }

        $.getJSON(path, function(data, textStatus) {
          if(textStatus == 'success'){

            var assets = (data.hottest != undefined) ? data.hottest : data.results;
            var assetsContent = [];
            var typeOfSale = 'normal';

            if(data.flashsale != undefined){
              if(data.flashsale.isFlashsale == true) typeOfSale = 'flashsale';
            }
            if(data.madness != undefined){
              if(data.madness.isMadness == true) typeOfSale = 'madness';
            }

            // Template 1
            if(settings.template == '1'){
              $.each(assets, function(key, asset) {
                var html = '';
                html += '<li><a href="' + asset.short_url + '" target="_blank">' + asset.title + '</a></li>';
                assetsContent.push(html);
              });
            }

            // Template 2 (Asset Store page)
            else if(settings.template == '2'){
              $.each(assets, function(key, asset) {
                var title = (asset.title.length > 28) ? asset.title.slice(0,25) + '...' : asset.title;
                var html = '';
                html += '<div class="asset"><a href="'+ asset.short_url +'">';
                html += '<div class="icon"><img src="'+ asset.keyimage.icon75 +'" alt="'+ asset.title +'" /></div>';
                html += '<div class="info">';
                html += '<p class="b mb0 cn" title="'+ asset.title +'">'+ title +'</p>';
                ratingWidth = (parseInt(asset.rating.average) / 5) * 100;
                html += '<div class="rating"><div class="stars" style="width:'+ ratingWidth +'%;"></div></div>';
                html += '<p class="mb0">';

                if(asset.price_original == undefined){
                  if(asset.price) html += '<b class="cd">'+ asset.price['USD_TEXT'] +'</b>';
                  else html += '<b class="cd">Free</b>';
                }
                else {
                  if(asset.price) html += '<s class="cr">'+asset.price_original['USD_TEXT']+'</s>'+ ' <b class="cd">' + asset.price['USD_TEXT']+'</b>';
                  else html += '<b class="cd">Free</b>';
                }

                html += '</p>';
                html += '</div>';
                html += '<div class="clear"></div>';
                html += '</a></div>';

                if(key == 50) return false;

                assetsContent.push(html);
              });

              // Display campaign image and adjust container height
              if(typeOfSale != 'normal'){
                $('.'+ typeOfSale +'-banner').removeClass('hide');
                $('#assets').css('height','460px');
              }
              
              // Flashsale countdown
              if(typeOfSale == 'flashsale'){

                // Populate hours/minutes/seconds
                for(var i = 0; i < 24; i++){
                  var n = (i < 10) ? '0'+ i : i;
                  $('.hrs .wrapper').append('<div>'+ n +'</div>');
                }
                $('.hrs .wrapper').prepend('<div>23</div>');
                $('.hrs .wrapper').append('<div>00</div><div>01</div>');


                for(var i = 0; i < 60; i++){
                  var n = (i < 10) ? '0'+ i : i;
                  $('.min .wrapper').append('<div>'+ n +'</div>');
                }
                $('.min .wrapper').prepend('<div>59</div>');
                $('.min .wrapper').append('<div>00</div><div>01</div>');

                for(var i = 0; i < 60; i++){
                  var n = (i < 10) ? '0'+ i : i;
                  $('.sec .wrapper').append('<div>'+ n +'</div>');
                }
                $('.sec .wrapper').prepend('<div>59</div>');
                $('.sec .wrapper').append('<div>00</div><div>01</div>');

                // Get dates
                var t;
                var sDate = new Date();

                var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                var numMonth = 0;

                for(var i = 0; i < months.length; i++){
                  if(months[i] == data.flashsale.endMonth)
                    numMonth = i;
                }

                var eDate = new Date(Date.UTC(data.flashsale.endYear, numMonth, data.flashsale.endDay, data.flashsale.endHour));

                //Find time left, returns hours, minutes, seconds
                function timeleft(start, end) {
                  var h = Math.floor((start-end)/(1000*60*60));
                  var m = Math.floor(((start-end)/(1000*60)) - (h * 60));
                  var s = Math.floor(((start-end)/(1000)) - ((h * 60) * 60) - (m * 60));
                  return [h, m, s];
                }

                // Add leading zero
                function addZero(value){
                  return value.toString().length > 1 ? value : '0' + value;
                }

                // Countdown
                function updateCounter(init){
                  
                  var tl = timeleft(eDate, sDate),
                      h = tl[0],
                      m = tl[1],
                      s = tl[2];

                  var h_px = -h * 36 - 36 + 'px',
                      m_px = -m * 36 - 36 + 'px',
                      s_px = -s * 36 - 36 + 'px';

                  if(init){
                    $('.hrs .wrapper').css('top', h_px);
                    $('.min .wrapper').css('top', m_px);
                    $('.sec .wrapper').css('top', s_px);
                  } else {
                    if(h != 0){
                      $('.hrs .wrapper').animate({'top' : h_px}, 300, function(){
                        if($('.hrs .wrapper').css('top') == '-36px') $('.hrs .wrapper').css('top', '-900px');
                      });
                    }
                    if(h != 0 && m != 0){
                    $('.min .wrapper').animate({'top' : m_px}, 300, function(){
                      if($('.min .wrapper').css('top') == '-36px') $('.min .wrapper').css('top', '-2196px');
                    });
                    }
                  
                    $('.sec .wrapper').animate({'top' : s_px}, 300, function(){
                      if($('.sec .wrapper').css('top') == '-36px') $('.sec .wrapper').css('top', '-2196px');  
                    });
                  }

                  sDate.setSeconds(sDate.getSeconds() + 1);
                  t = setTimeout(updateCounter, 1000);

                  // If campaign is over
                  if(h <= 0 && m <= 0 && s <= 0){
                    clearTimeout(t);
                    $('.flashsale-lbl').addClass('hide');
                    $('.flashsale-ended-lbl').removeClass('hide');
                  } 

                }

                $('.flashsale-lbl').removeClass('hide');
                updateCounter(true);

              }
              else if(typeOfSale == 'normal'){
                $('.normal-lbl').removeClass('hide');
              }
            }

            // Template 3 (Gallery Demo Projects page)
            else if(settings.template == '3'){
              $.each(assets, function(key, asset) {

                var description = asset.description;
                description = description.replace(/<br>/g,'').replace(/<ol>/g,'').replace(/<li>/g,'');
                description = (description.length > 120) ? description.slice(0,87) + '...' : description;

                var html = '';
                html += '<div class="g6 bb">';
                html += '<div class="right asset-icon mr10"><a href="' + asset.short_url + '" target="_blank"><img src="' + asset.keyimage.icon75 + '" width="" height="" /></a></div>';
                html += '<h3 class="mb0">' + asset.title + '</h3>';
                html += '<p class="cl">'+ by +' Unity Technologies</p>';
                html += '<p>'+ description +' <a href="' + asset.short_url + '" class="more" target="_blank">'+ more +'</a></p>';
                html += '</div>';
                assetsContent.push(html);

              });
            }

            // Template 4 (Editor panels)
            else if(settings.template == '4'){

              $.each(assets, function(key, asset) {

                var html = '';
                html += '<a href="' + asset.short_url + '" target="_blank"><img src="' + asset.keyimage.icon75 + '" /></a>';
                assetsContent.push(html);

              });

              // Flashsale countdown
              if(typeOfSale == 'flashsale'){

                // Populate hours/minutes/seconds
                for(var i = 0; i < 24; i++){
                  var n = (i < 10) ? '0'+ i : i;
                  $('.hrs .wrapper').append('<div>'+ n +'</div>');
                }
                $('.hrs .wrapper').prepend('<div>23</div>');
                $('.hrs .wrapper').append('<div>00</div><div>01</div>');

                for(var i = 0; i < 60; i++){
                  var n = (i < 10) ? '0'+ i : i;
                  $('.min .wrapper').append('<div>'+ n +'</div>');
                }
                $('.min .wrapper').prepend('<div>59</div>');
                $('.min .wrapper').append('<div>00</div><div>01</div>');

                for(var i = 0; i < 60; i++){
                  var n = (i < 10) ? '0'+ i : i;
                  $('.sec .wrapper').append('<div>'+ n +'</div>');
                }
                $('.sec .wrapper').prepend('<div>59</div>');
                $('.sec .wrapper').append('<div>00</div><div>01</div>');

                // Get dates
                var t;
                var sDate = new Date();

                var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                var numMonth = data.flashsale.endMonth;

                /*for(var i = 0; i < months.length; i++){
                  if(months[i] == data.flashsale.endMonth)
                    numMonth = i;
                }*/
                

                var eDate = new Date(Date.UTC(data.flashsale.endYear, numMonth, data.flashsale.endDay, data.flashsale.endHour));

                //Find time left, returns hours, minutes, seconds
                function timeleft(start, end) {
                  var h = Math.floor((start-end)/(1000*60*60));
                  var m = Math.floor(((start-end)/(1000*60)) - (h * 60));
                  var s = Math.floor(((start-end)/(1000)) - ((h * 60) * 60) - (m * 60));
                  return [h, m, s];
                }

                // Add leading zero
                function addZero(value){
                  return value.toString().length > 1 ? value : '0' + value;
                }

                // Countdown
                function updateCounter(init){
                  
                  var tl = timeleft(eDate, sDate),
                      h = tl[0],
                      m = tl[1],
                      s = tl[2];

                  var h_px = -h * 36 - 36 + 'px',
                      m_px = -m * 36 - 36 + 'px',
                      s_px = -s * 36 - 36 + 'px';

                  if(init){
                    $('.hrs .wrapper').css('top', h_px);
                    $('.min .wrapper').css('top', m_px);
                    $('.sec .wrapper').css('top', s_px);
                  } else {
                    if(h != 0){
                      $('.hrs .wrapper').css({'top' : h_px});
                      if($('.hrs .wrapper').css('top') == '-36px') $('.hrs .wrapper').css('top', '-900px');
                    }
                    if(h != 0 && m != 0){
                      $('.min .wrapper').css({'top' : m_px});
                      if($('.min .wrapper').css('top') == '-36px') $('.min .wrapper').css('top', '-2196px');
                    }
                    $('.sec .wrapper').css({'top' : s_px});
                    if($('.sec .wrapper').css('top') == '-36px') $('.sec .wrapper').css('top', '-2196px');
                  }

                  sDate.setSeconds(sDate.getSeconds() + 1);
                  t = setTimeout(updateCounter, 1000);

                  // If campaign is over
                  if(h <= 0 && m <= 0 && s <= 0){
                    clearTimeout(t);
                    //$('.flashsale-lbl').addClass('hide');
                    //$('.flashsale-ended-lbl').removeClass('hide');
                  } 

                }

                $('.flashsale-lbl').removeClass('hide');
                updateCounter(true);

              }


            }

            $('<div/>', {html: assetsContent.join('') }).appendTo('#assets');
            $('#assets').removeClass('loading');

          }

        });

      });

    }
  };

  $.fn.displayAssets = function(method){
    return methods.init.apply(this, arguments);
  };

})(jQuery);


