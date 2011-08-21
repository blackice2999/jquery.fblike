;(function($) {
  // search all facebook like buttons...
  $(document).ready(function(){

    // set path to disclaimer
    $.fn.fblike.defaults.fbDialogContentUrl = 'http://yourdomain.com/disclaimer.html';

    // init the plugin
    $('.jl-fb-like:not(.jl-fb-like-processed)').addClass('jl-fb-like-processed').fblike();
  });

})(jQuery);