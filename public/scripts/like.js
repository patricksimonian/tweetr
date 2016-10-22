
function add() {
  //get color from desired style
}

function rem() {
  //get color from current style
  ///function
}
var likeButton = $(".fa-heart");

likeButton.on('click', function(event) {
  let isOff = true;
  event.stopPropagation();
  if(isOff) {
    let color = $('.warning').css('color');
    $(this).css('background-color','color' );
    isoff = false;
  } else {
    let color = $('body').css('color');
    $(this).css('color', color);
    isOff = true;
  }
})




