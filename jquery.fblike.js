/**
 * @Author: Dennis Bruecke <kontakt(at)team-wd.de>
 *
 * simple facebook like me wrapper plugin, so user must be confirm before he can see the right facebook button!
 *
 * there are a lot improvements possible but currently this is only a proof of concept.
 * if someone has more interest about that talk to me and this will be a full jquery plugin.
 *
 * License: GPL v2 - http://www.gnu.org/licenses/gpl.html
 *
 * Dependencies:
 * This plugin need´s that following libraries are loaded:
 * jquery > 1.4
 * jquery.ui > 1.7
 * jquery.cookie
 *
 */
(function ($) {

    // create new jquery plugin...
    $.fn.fblike = function (fbDialogContentUrl, fbLikeSettings, fbDialogSettings, fbCookieSettings) {

        var options = {};

        options.fbDialogContentUrl = $.extend({}, $.fn.fblike.defaults.fbDialogContentUrl, fbDialogContentUrl);
        options.fbLikeSettings = $.extend({}, $.fn.fblike.defaults.fbLikeSettings, fbLikeSettings);
        options.fbDialogSettings = $.extend({}, $.fn.fblike.defaults.fbDialogSettings, fbDialogSettings);
        options.fbCookieSettings = $.extend({}, $.fn.fblike.defaults.fbCookieSettings, fbCookieSettings);


        console.dir(options);

        return this.each(function () {

            var obj = this;
            var fbLaw = $.cookie('jquery.fblike');
            var jlDialogContainer = $('#jl-fb-like-dialog-container');

            // check if user has already accepted the law
            if (fbLaw == 'user_accepted') {
                addFacebookLike();
            }
            // user has not accepted so add the pseudo button
            else {
                initDialog();
                addPseudoButton();
            }

            function initDialog() {
                // only proceed if we dont have any container
                if(jlDialogContainer.length > 0) {
                  return;
                }
                
                // init the dialog buttons
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

                // add buttons to settings...
                var fbDialogSettings = $.extend(options.fbDialogSettings, fbDialogBtns);

                // create new dialog content
                jlDialogContainer = $('<div id="jl-fb-like-dialog-container" style="display:none"></div>').appendTo('body');
                // get content for dialog container via ajax
                jlDialogContainer.load(
                    options.fbDialogContentUrl, {}, function(responseText, textStatus, XMLHttpRequest) {
                        // bind jquery.ui dialog to container @TODO: error processing...
                        jlDialogContainer.dialog(fbDialogSettings);
                    }
                );
            }

            /**
             * add the own pseudo button
             */
            function addPseudoButton() {
                $(obj)
                    .bind('click', showFbLaw)// add click handler to pseudo button
                    .css('cursor', 'pointer'); // change cursor to hand
            }

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
            }

            function setCookie() {
                $.cookie('jquery.fblike', 'user_accepted', options.fbCookieSettings);
                location.reload(true);
            }

            // trigger the dialog...  @TODO: ensure that dialog exists...
            function showFbLaw() {
                jlDialogContainer.dialog('open');
            }
        }); // return this each... jquery...
    }; // plugin...

    $.fn.fblike.defaults = {
        fbLikeSettings: {
            href: window.location.href,
            layout: 'standard',
            show_faces: 'true',
            width: '450',
            action: 'like',
            colorscheme: 'light',
            // aditional html attributes for the like btn see @facebook developer
            attributes: 'height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;" allowTransparency="true"'
        },
        // jquery.ui dialog default settings....
        fbDialogSettings: {
            resizable: false,
            height: 540,
            width: 900,
            modal: true,
            autoOpen: false
        },
        // default settings for cookie
        fbCookieSettings: {
            // cookie will be expire after 90 days...
            expires : 90,
            // use complete path for cookie
            path: '/',
            // current domain...
            domain: window.location.hostname
        },
        fbDialogContentUrl: ''
    };
})(jQuery);