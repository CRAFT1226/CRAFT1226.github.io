$(document).ready(function() {
    setInterval(moveBalls, 50);
});

function moveBalls() {
    $('.circle').each(function() {
        var min = 0;
        var max = 1000;
        var x = Math.floor(Math.random() * (max - min + 1)) + min;
        var y = Math.floor(Math.random() * (max - min + 1)) + min;
        $(this).animate({
            left: x,
            top: y
        }, 15000);
    });
}