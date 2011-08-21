;(function($) {
  // search all facebook like buttons...
  $(document).ready(function(){
    $('.jl-fb-like:not(processed)').addClass('processed').fblike();
  });

})(jQuery);