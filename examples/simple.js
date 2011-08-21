;(function($) {
  // search all facebook like buttons...
  $(document).ready(function(){

    // set path to disclaimer
    $.fn.fblike.defaults.fbDialogContentUrl = 'http://t.l/fb-like/jquery-fblike/examples/disclaimer.html';

    // init the plugin
    $('.jl-fb-like:not(.jl-fb-like-processed)').addClass('jl-fb-like-processed').fblike(
        'http://t.l/fb-like/jquery-fblike/examples/disclaimer.html',
        {colorscheme: 'dark'}
    );
  });

})(jQuery);