#jQuery Facebook Like Button plugin#
## What you need ##
this plugin has some dependencies you need to resolve them before you can use this plugin.
- jQuery > 1.4
- jQuery UI > 1.7
- jQuery Cookie (https://github.com/carhartl/jquery-cookie)

## How it works ##
The plugin search for elements with the css class "jl-fb-like".

If a user has already accepted your disclaimer it will replace the content of this element with the iFrame version of
facebook like button.

if a user has not already accepted your disclaimer this plugin creates a jquery.ui dialog and bind the element with a
click event.

## Usage: ##
- add the jquery.fblike.js or jquery.fblike.min.js to the head of your page (after jquery / jquery.ui & jquery.cookie)
- add the following code to your custom javascript or into head (after the script)

      <script type="text/javascript">
      ;(function($) {
      // search all facebook like buttons...
      $(document).ready(function(){

        // set path to disclaimer
        $.fn.fblike.defaults.fbDialogContentUrl = 'http://your.domain.com/path/to/disclaimer.html';

        // init the plugin
        $('.jl-fb-like:not(.jl-fb-like-processed)').addClass('jl-fb-like-processed').fblike();
      });
      })(jQuery);
      </script>