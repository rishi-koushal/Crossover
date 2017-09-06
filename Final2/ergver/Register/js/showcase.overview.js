$(document).on('ready',function(){

  $('.showreel-tabs a').on('click',function(e){
    
    $('.showreel .inline-video').removeAttr('style');
    $('.showreel .inline-video iframe').attr('src','').removeAttr('style');
    $('.showreel .inline-video .thumb').css('opacity',1);

  });

});


