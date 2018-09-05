jQuery(document).ready(function ($) {
    $(window).on("load", function () {
        $('.loaded').fadeOut();
        $(".preloader").delay(500).fadeOut("slow");
    });
});