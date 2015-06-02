"use strict";

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

$(document).ready(function () {

    var $si = $('.search-icon');

    var look = function () {
        var val = $('#mega-search').val();
        $si.addClass('bounce');
        
        $('.glyph-icon-grid li')
            .css('display', 'none')
        $('.glyph-icon-grid li[data-keyword*="' + val + '"]')
            .css('display', 'block');
        
        setTimeout(function () {
            $si.removeClass('bounce');
        }, 1000);
    }; 
    
    var allKws = [];
    
    $('.glyph-icon-grid li').each(function () {
        allKws.push(this.getAttribute('data-keyword'));
    });

    $('#mega-search').typeahead({
        hint: true, 
        highlight: true, 
        minLength: 1
    }, {
        name: 'icons',
        source: function (q, cb) {
            var qr = q.toLowerCase().trim();
            return cb(allKws.filter(function (kw) {
                return kw.indexOf(qr) > -1;
            }).map(function (item) {
                return {value: item};
            }));
        }
    }).on('typeahead:selected', function () {
        look();
    }).on('keydown', function (ev) {
        
        if (this.value.length == 1) {
            $('.glyph-icon-grid li').css('display', 'block');
            return;
        }

        if (ev.keyCode == 13) {
            //
            if (this.value.length == 0) {
                return false;
            }
            
            $(this).typeahead('close');
            look();
            return false;
        }

        return true;
    });
});

