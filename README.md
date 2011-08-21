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
- add the following code to your custom javascript (document ready)

        // set path to disclaimer
        $.fn.fblike.defaults.fbDialogContentUrl = 'http://your.domain.com/path/to/disclaimer.html';

        // init the plugin
        $('.jl-fb-like:not(.jl-fb-like-processed)').addClass('jl-fb-like-processed').fblike();

## Options ##
If you want more control over the settings we have four groups of options

.fblike(fbDialogContentUrl, fbLikeSettings, fbDialogSettings, fbCookieSettings)

- (string) fbDialogContentUrl = the url or path to your disclaimer
- (object) fbLikeSettings = Facebook iFrame Options.
           Example: {colorscheme: 'dark'}
- (object) fbDialogSettings = jQuery UI Dialog Options.
           Example: {modal: true}
- (object) fbCookieSettings = Cookie settings
           Example: {expire: 1}

There are two ways to change the settings.

1.) Changing public default options.
        $.fn.fblike.defaults.fbDialogContentUrl = 'http://your.domain.com/path/to/disclaimer.html';
        $.fn.fblike.defaults.fbLikeSettings.colorscheme = 'dark';

2.) Options on .fblike() call.
        $('.jl-fb-like:not(.jl-fb-like-processed)').addClass('jl-fb-like-processed').fblike(
          'http://your.domain.com/path/to/disclaimer.html',
          {colorscheme: 'dark'},
          {modal: true},
          {expire: 1}
        );

## Example: ##
there is a simple example in examples directory

## Warning: ##
This plugin is more are proof of concept since a full working solution. It works, but it has no error handling. If you
change parameters with failure this will not work and it will not throw any warnings...
## Disclaimer URL ##
You need to set a disclaimer url on same domain. Or it will not work! (see example)