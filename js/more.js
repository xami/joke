$(function(){
    var p = 1;
    function s(){
        $('#menu-group').scrollPagination({
            'contentPage': 'li.html', // the url you are fetching the results
            'contentData': { 'p': p }, // these are the variables you can pass to the request, for example: children().size() to know which page you are
            'scrollTarget': $(window), // who gonna scroll? in this example, the full window
            'heightOffset': 20, // it gonna request when scroll is 10 pixels before the page ends
            'beforeLoad': function(){ // before load function, you can display a preloader div
                $('#menu-group').stopScrollPagination();
                $('#loading').fadeIn();
                p++;
            },
            'afterLoad': function(elementsLoaded){ // after loading content, you can use this function to animate your new elements
                $('#loading').fadeOut();
                var i = 0;
                $(elementsLoaded).fadeInWithDelay();
                if ($('#menu-group').children().size() > 100*3){ // if more than 100 results already loaded, then stop pagination (only for testing)
                    $('#nomoreresults').fadeIn();
                    $('#loading').hide();
//                    $('#menu-group').stopScrollPagination();
                }else{
                    s();
                }
            }
        });
    }
    s();

    // code for fade in element by element
    $.fn.fadeInWithDelay = function(){
        var delay = 0;
        return this.each(function(){
            $(this).delay(delay).animate({opacity:1}, 200);
            delay += 100;
        });
    };

});