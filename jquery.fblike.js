/**
 * simple facebook like me wrapper plugin, so user must be confirm before he can see the right facebook button!
 * @Author: Dennis Brücke <db@joomlates.de>
 *
 * there are a lot improvements if someone has more interest about that talk to me
 * and this will be a full jquery plugin.
 *
 * License: GPL v2
 *
 * Dependicies:
 * This plugin need´s that following libraries are loaded:
 * jquery > 1.4
 * jquery.ui > 1.7
 * jquery.cookie
 *
 *
 * Using the script:
 * You need two HTML Elements on your Page.
 * 1. Add the Dialog text that you want to be displayed. The best position for that is directly before
 *    </body> and after your last Element in your theme...
 * Example:
 * <div id="jl-fb-like-dialog-confirm">Here your disclaimer text for facebook...</div>
 *
 *
 * 2. On every position on your page you want a Facebook Like button place a html element and attach the jquery plugin on it
 *
 * Example Element:
 * <div class="jl-fb-like"></div>
 *
 * Example Javascript file:
 * (function($) {
 *  // search all facebook like buttons...
 * $(document).ready(function(){
 *     $('.jl-fb-like:not(processed)').addClass('processed').fblike();
 *   });
 *
 * })(jQuery);
 * 
 */
(function ($) {

  // create new jquery plugin...
  $.fn.fblike = function (options) {

    var defaults = {
      fbButtonText: 'Gef&auml;llt mir...',
      fbLikeSettings: {
        href: window.location.href,
        layout: 'standard',
        show_faces: 'true',
        width: '450',
        action: 'like',
        colorscheme: 'light',
        attributes: 'height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;" allowTransparency="true"'
      },
      fbDialogSettings: {
        resizable: false,
        height: 540,
        width: 900,
        modal: true,
        autoOpen: false       
      }
    };

    var options = $.extend(defaults, options);
    return this.each(function () {

      var obj = this;
      var fbLaw = $.cookie('jquery.fblike');

      // check if user has already accepted the law
      if (fbLaw == 'user_accepted') {
        addFacebookLike();
      }
      // user has not accepted so add the pseudo button
      else {
        addPseudoButton();
      }
      
      // init the dialog
      var fbDialogBtns = {
        buttons: {
          "Ok": function () {
            $(this).dialog("close");
            setCookie();
          },
          "Abbrechen": function () {
            $(this).dialog("close");
          }
        }
      };
      
      var fbDialogSettings = $.extend(options.fbDialogSettings, fbDialogBtns);
      
      var fbLikeDialog = $('#jl-fb-like-dialog-confirm').dialog(options.fbDialogSettings);      

      /**
       * add the own pseudo button
       */
      function addPseudoButton() {
        var fblikebtn = '<div class="fblike-btn">' + options.fbButtonText + '</div>';

        $(obj)
          .html(fblikebtn)
          .bind('click', showFbLaw)  // add click handler to pseudo button
          .css('cursor', 'pointer'); // change cursor to hand
      };

      /**
       * add the right facebook like button as iframe
       */
      function addFacebookLike() {
        var fblike = '<iframe src="http://www.facebook.com/plugins/like.php?';
        fblike += 'href=' + options.fbLikeSettings.href + '&amp;';
        fblike += 'layout=' + options.fbLikeSettings.layout + '&amp;';
        fblike += 'show_faces=' + options.fbLikeSettings.show_faces + '&amp;';
        fblike += 'width=' + options.fbLikeSettings.width + '&amp;';
        fblike += 'action=' + options.fbLikeSettings.action + '&amp;';
        fblike += 'colorscheme=' + options.fbLikeSettings.colorscheme + '&amp;';
        fblike += options.fbLikeSettings.attributes + ' >';
        fblike += '</iframe>';

        $(obj).html(fblike);
      };

      function setCookie() {
        $.cookie('jquery.fblike', 'user_accepted', { expires: 365, path: window.location.pathname, domain: window.location.hostname });
        location.reload(true);
      };

      function showFbLaw() {
        $(fbLikeDialog).dialog('open');
      };

    }); // return this each... jquery...
  }; // plugin...
})(jQuery);