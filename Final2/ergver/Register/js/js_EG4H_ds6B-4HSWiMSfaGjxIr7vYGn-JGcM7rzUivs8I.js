(function(){
var hm = document.createElement('script'); hm.type ='text/javascript'; hm.async = true;
hm.src = ('++u-heatmap-it+log-js').replace(/[+]/g,'/').replace(/-/g,'.');
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s);
})();
;
/* ====================================================
 * Company: Unity Technologies
 * Author:  Rickard Andersson, rickard@unity3d.com
 * 
   TABLE OF CONTENTS
   - What is Unity
   - Blog feed
   - Events
   - Functions
 *
======================================================= */

$(document).on('ready',function(){

  // Init
  frontpageHeader();

/****************************************
  ==== UNITY 5
****************************************/

  if(!touchEnabled && lang != 'cn'){

    $('.video iframe').attr('src',$('.video iframe').attr('data-src'));

    setTimeout(function(){
      $('.video iframe').removeClass('hidden');
      $('.intro-wrapper .text').removeClass('hidden');
    },1000);
  }

  // Resize header to show 88% of viewport height
  $(window).on('resize',function(){
    frontpageHeader();
  });

/****************************************
  ==== BLOG FEED
****************************************/

  $.get(blogfeed, function(data, textStatus) {
    if(textStatus == 'success'){

      var posts = $(data).find('item').get();
      var months = ['','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

      $('.blog-posts .g12').hide();

      $(posts).each(function(i,post){

        if(i == 4) return false;

        var pubDate = new Date(post.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue),
            month = months[pubDate.getMonth() + 1],
            day = pubDate.getDate(),
            year = pubDate.getFullYear(),
            excerpt = post.getElementsByTagName('description')[0].childNodes[0].nodeValue.slice(0,110) + '...',
            title = post.getElementsByTagName('title')[0].childNodes[0].nodeValue.replace('(English) ',''),
            postHtml = '';

        postHtml += '<div class="g3 post">';
        postHtml +=   '<a href="'+ post.getElementsByTagName('link')[0].childNodes[0].nodeValue +'" class="cn tdn w100">';
        postHtml +=     '<div class="image"><img src="'+ post.getElementsByTagName('imageMedium')[0].childNodes[0].nodeValue +'" /></div>';
        postHtml +=     '<p class="mb5 upper avalon">'+ month +' '+ day +', '+ year +'</p>';
        postHtml +=     '<h4 class="mb10 cd">'+ title +'</h4>';
        postHtml +=   '</a>';
        postHtml += '</div>';

        $('.blog-posts').append(postHtml);

      });

    }
  },'xml');
  
  if(lang == 'jp'){
    $.get(ja_blogfeed, function(data, textStatus) {
      if(textStatus == 'success'){

        var posts = $(data).find('item').get(),
            postsHTML = [],
            months = ['','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

        $(posts).each(function(i,post){

          if(i == 4) return false;

          var pubDate = new Date(post.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue),
              month = months[pubDate.getMonth() + 1],
              day = pubDate.getDate(),
              html = '';

          var description = $.parseHTML(post.getElementsByTagName('description')[0].childNodes[0].nodeValue);
          var img = description[0].getElementsByTagName('img')[0].getAttribute("src");

          html += '<a href="'+ post.getElementsByTagName('link')[0].childNodes[0].nodeValue +'" class="g3 post cn tdn tc">';
          html +=   '<div class="clear">';
          html +=     '<img src="'+ img +'" class="br50 ic m0a mb15" />';
          html +=     '<p class="mb5 upper avalon">'+ day +' '+ month +'</p>';
          html +=     '<h4 class="mb5 cd">'+ post.getElementsByTagName('title')[0].childNodes[0].nodeValue +'</h4>';
          html +=   '</div>';
          html += '</a>';

          postsHTML.push(html);

        });

        $('.blog-posts-ja').html(postsHTML.join(''));

      }
    },'xml');
  }

/****************************************
  ==== 24H DEALS
****************************************/

  if($('.tiles-wrapper .as-24h').size() > 0){

    $.getJSON(dailyFeed, function(data, textStatus){
      if(textStatus == 'success') {

        var $parent = $('.as-24h');
        $('.as-24h .content h3, .as-24h .content p').wrapAll('<div class="asset" />')
        $('h3',$parent).text(data.daily.title);
        $('p',$parent).html('$' + data.daily.price['USD'] +' <s>$' + data.daily.price_original['USD'] +'</s>');

      }
    });

  }

/****************************************
  ==== GOOGLE ANALYTICS
****************************************/

  $('.tiles-wrapper .tile a.link').click(function(){
    var label = $(this).parent().attr('data-label');
    _gaq.push(['_trackEvent', 'Frontpage tiles', label]);
  });

  $('.jobs-promo a').click(function(){
    _gaq.push(['_trackEvent', 'Frontpage', 'Job promo']);
  });

});

// Set header elements height to 88% of viewport height
function frontpageHeader(){

  var $wrapper = $('.intro-wrapper'),
      $video = $('.intro-wrapper .video'),
      $content = $('.intro-wrapper .content'),
      h = getHeight(),
      space = (0.12 * h),
      menuheight = (getWidth() < 981) ? 50 : 0;

  $wrapper.height(h - space - menuheight);
  $video.height(h - space);
  $content.height(h - space);

};
