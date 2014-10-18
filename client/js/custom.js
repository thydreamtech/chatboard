$(function () {
    $(document).on('mouseover', '.draggable',function(){
       var newElements = $('.draggable:not(.initialized)');
       newElements.addClass('.initialized');
       newElements.draggable();
    });

});